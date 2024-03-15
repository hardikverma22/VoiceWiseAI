import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        email: v.string(),
    })
        .index("by_clerk_id", ["userId"]),

    audioNotes: defineTable({
        storageId: v.string(),
        audioFileUrl: v.string(),
        userId: v.string(),
        title: v.optional(v.string()),
        transcript: v.optional(v.string()),
        summary: v.optional(v.string()),
        generatingTranscript: v.boolean(),
        generatingTitle: v.boolean(),
        generatingActionItems: v.boolean(),
    })
        .index('by_userId', ['userId']),

    actionItems: defineTable({
        audioNoteId: v.id('audioNotes'),
        userId: v.string(),
        task: v.string(),
        done: v.boolean()
    })
        .index('by_noteId', ['audioNoteId', 'done'])
        .index('by_userId', ['userId'])

});