"use node";

import { action, internalAction, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import Replicate from 'replicate';
import { api, internal } from './_generated/api';
import { Id } from './_generated/dataModel';

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});

interface whisperOutput {
    detected_language: string;
    segments: any;
    transcription: string;
    translation: string | null;
}

export const chat = action({
    args: {
        fileUrl: v.string(),
        id: v.id('audioNotes'),
    },
    handler: async (ctx, args) => {
        const replicateOutput = (await replicate.run(
            'openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2',
            {
                input: {
                    audio: args.fileUrl,
                    model: 'large-v3',
                    translate: false,
                    temperature: 0,
                    transcription: 'plain text',
                    suppress_tokens: '-1',
                    logprob_threshold: -1,
                    no_speech_threshold: 0.6,
                    condition_on_previous_text: true,
                    compression_ratio_threshold: 2.4,
                    temperature_increment_on_fallback: 0.2,
                },
            },
        )) as whisperOutput;

        const transcript = replicateOutput.transcription || 'error';

        console.log(transcript);
        await ctx.runMutation(internal.audio.saveTranscript, {
            id: args.id,
            transcript,
        });

        await ctx.scheduler.runAfter(0, internal.together.embed, {
            id: args.id,
            transcript: transcript,
        });
    },
});