import OpenAI from 'openai';
import {
    action,
    internalAction,
    internalMutation,
    internalQuery,
} from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { internal } from './_generated/api';
import { z } from 'zod';
// import { actionWithUser } from './utils';
import Instructor from '@instructor-ai/instructor';

const togetherApiKey = process.env.TOGETHER_API_KEY ?? 'undefined';

// Together client for LLM extraction
const togetherai = new OpenAI({
    apiKey: togetherApiKey,
    baseURL: 'https://api.together.xyz/v1',
});

// Instructor for returning structured JSON
const client = Instructor({
    client: togetherai,
    mode: 'JSON_SCHEMA',
});

const NoteSchema = z.object({
    title: z
        .string()
        .describe('Short descriptive title of what the voice message is about'),
    summary: z
        .string()
        .describe(
            'A short summary in the first person point of view of the person recording the voice message',
        )
        .max(500),
    actionItems: z
        .array(z.string())
        .describe(
            'A list of action items from the voice note, short and to the point. Make sure all action item lists are fully resolved if they are nested',
        ),
});

export const chat = internalAction({
    args: {
        id: v.id('audioNotes'),
        transcript: v.string(),
    },
    handler: async (ctx, args) => {
        const { transcript } = args;

        try {
            const extract = await client.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content:
                            'The following is a transcript of a voice message. Extract a title, summary, and action items from it and answer in JSON in this format: {title: string, summary: string, actionItems: [string, string, ...]}',
                    },
                    { role: 'user', content: transcript },
                ],
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                response_model: { schema: NoteSchema, name: 'SummarizeNotes' },
                max_tokens: 1000,
                temperature: 0.6,
                max_retries: 3,
            });
            const { title, summary, actionItems } = extract;

            console.log({ title, summary, actionItems });
            await ctx.runMutation(internal.together.saveSummary, {
                id: args.id,
                summary,
                actionItems,
                title,
            });
        } catch (e) {
            console.error('Error extracting from voice message', e);
            await ctx.runMutation(internal.together.saveSummary, {
                id: args.id,
                summary: 'Summary failed to generate',
                actionItems: [],
                title: 'Something went wrong!',
            });
        }
    },
});

export const saveSummary = internalMutation({
    args: {
        id: v.id('audioNotes'),
        summary: v.string(),
        title: v.string(),
        actionItems: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, summary, actionItems, title } = args;
        await ctx.db.patch(id, {
            summary: summary,
            title: title,
            generatingTitle: false,
        });

        let note = await ctx.db.get(id);

        if (!note) {
            console.error(`Couldn't find note ${id}`);
            return;
        }
        for (let actionItem of actionItems) {
            await ctx.db.insert('actionItems', {
                task: actionItem,
                audioNoteId: id,
                userId: note.userId,
                done: false
            });
        }

        await ctx.db.patch(id, {
            generatingActionItems: false,
        });
    },
});

export type SearchResult = {
    id: string;
    score: number;
};

export const similarNotes = action({
    args: {
        searchQuery: v.string(),
    },
    handler: async (ctx, args): Promise<SearchResult[]> => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new ConvexError("Not Auenticated while search similar notes");
        }

        console.log(args.searchQuery);
        const getEmbedding = await togetherai.embeddings.create({
            input: [args.searchQuery.replace('/n', ' ')],
            model: 'togethercomputer/m2-bert-80M-32k-retrieval',

        });
        const embedding = getEmbedding.data[0].embedding;

        // 2. Then search for similar notes
        const results = await ctx.vectorSearch('audioNotes', 'by_embedding', {
            vector: embedding,
            limit: 16,
            filter: (q) => q.eq('userId', identity.subject), // Only search my notes.
        });

        return results.map((r) => ({
            id: r._id,
            score: r._score,
        }));
    },
});

export const embed = internalAction({
    args: {
        id: v.id('audioNotes'),
        transcript: v.string(),
    },
    handler: async (ctx, args) => {
        const getEmbedding = await togetherai.embeddings.create({
            input: [args.transcript.replace('/n', ' ')],
            model: 'togethercomputer/m2-bert-80M-32k-retrieval',
        });
        const embedding = getEmbedding.data[0].embedding;

        await ctx.runMutation(internal.together.saveEmbedding, {
            id: args.id,
            embedding,
        });
    },
});

export const saveEmbedding = internalMutation({
    args: {
        id: v.id('audioNotes'),
        embedding: v.array(v.float64()),
    },
    handler: async (ctx, args) => {
        const { id, embedding } = args;
        await ctx.db.patch(id, {
            embedding: embedding,
        });
    },
});