"use server"

import { getAuthToken } from "@/app/auth";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function processAudio(storageId: string) {
    if (!storageId) return;

    const token = await getAuthToken();
    const noteId = await fetchMutation(api.audio.createAudioNote, {
        storageId: storageId as Id<"_storage">,
    }, { token });

    if (!noteId)
        throw Error("Note could not be generated");

    redirect(`/recording/${noteId}`);
}