import { ConvexError, v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { Doc, Id } from './_generated/dataModel';
import { internal } from "./_generated/api";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const createAudioNote = mutation({
    args: { storageId: v.id('_storage'), },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log(identity?.subject);
        if (!identity) {
            return null;
        }
        const { subject } = identity;
        const url = await ctx.storage.getUrl(args.storageId);
        console.log(url);
        if (url && subject) {
            const noteId = await ctx.db.insert("audioNotes", {
                userId: subject as Doc<"users">["_id"],
                generatingTranscript: true,
                generatingActionItems: true,
                generatingTitle: true,
                storageId: args.storageId,
                audioFileUrl: url
            })

            ctx.scheduler.runAfter(0, internal.whisper.chat, {
                fileUrl: url,
                id: noteId,
            });

            return noteId;
        }

        return null;
    }
});

export const saveTranscript = internalMutation({
    args: {
        id: v.id('audioNotes'),
        transcript: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, transcript } = args;

        await ctx.db.patch(id, {
            transcript: transcript,
            generatingTranscript: false,
        });

        await ctx.scheduler.runAfter(0, internal.together.chat, {
            id: args.id,
            transcript,
        });

        // await ctx.scheduler.runAfter(0, internal.together.embed, {
        //     id: args.id,
        //     transcript: transcript,
        // });
    },
});

export const getNotes = query({
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        const { subject: userId } = identity;
        const notes = await ctx.db
            .query('audioNotes')
            .withIndex('by_userId', (q) => q.eq('userId', userId))
            .collect();

        console.log(notes);

        const results = Promise.all(
            notes.map(async (note) => {
                const count = (
                    await ctx.db
                        .query('actionItems')
                        .withIndex('by_noteId', (q) => q.eq('audioNoteId', note._id))
                        .collect()
                ).length;
                return {
                    count,
                    ...note,
                };
            }),
        );

        return results;
    },
});

export const getNote = query({
    args: {
        id: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        const { subject: userId } = identity;
        const noteId = args.id as Id<"audioNotes">;

        const note = await ctx.db.get(noteId);
        if (note?.userId !== userId) {
            throw new ConvexError('Not your note.');
        }

        const actionItems = await ctx.db
            .query('actionItems')
            .withIndex('by_noteId', (q) => q.eq('audioNoteId', note._id))
            .collect();

        return { note, actionItems };
    },
});

export const removeNote = mutation({
    args: {
        id: v.id('audioNotes'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        const { subject: userId } = identity;
        const existing = await ctx.db.get(args.id);
        if (existing) {
            if (existing.userId !== userId) {
                throw new ConvexError('Not your note');
            }
            await ctx.db.delete(args.id);
        }
    },
});


export const updatActionItemStatus = mutation({
    args: {
        id: v.id('actionItems'),
        done: v.boolean()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            return null;
        }
        const { subject: userId } = identity;

        const existing = await ctx.db.get(args.id);
        if (existing) {
            if (existing.userId !== userId) {
                throw new ConvexError('Not your action Item');
            }

            await ctx.db.patch(args.id, {
                done: args.done
            });
        }
    },
});

