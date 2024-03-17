"use server"

import { getAuthToken } from "@/app/auth";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAction, fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function processAudio(storageId: string) {
    if (!storageId) return;

    const token = await getAuthToken();
    const noteId = await fetchMutation(api.audio.createAudioNote, {
        storageId: storageId as Id<"_storage">,
    }, { token });

    if (!noteId)
        throw Error("Note could not be generated");

    // fetchAction(api.whisper.chat, {
    //     id, 
    // })

    // ctx.scheduler.runAfter(0, internal.whisper.chat, {
    //     fileUrl: url,
    //     id: noteId,
    // });

    redirect(`/recording/${noteId}`);
}