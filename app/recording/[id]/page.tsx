"use client";

import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Loader} from "@/components/Loader";
import ActionItems from "@/components/ActionItems";
import {Skeleton} from "@/components/ui/skeleton";

export default function RecordingDetails({params}: {params: {id: string}}) {
  const data = useQuery(api.audio.getNote, {id: params.id});

  return (
    <div className="flex flex-col pt-12 h-full">
      <div className="flex justify-between items-center">
        {data && (
          <>
            <h1 className="font-bold text-lg">{data?.note.title}</h1>
            <span>
              {new Date(data.note._creationTime).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </>
        )}
      </div>
      <div className="flex gap-5 mt-5 h-full">
        <div className="w-full">
          <Tabs defaultValue="summary" className="w-[400px] h-full">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript" className="ml-2 pt-5">
              {data && data.note?.transcript ? (
                <p>{data?.note.transcript}</p>
              ) : (
                <div className="flex flex-col gap-1 justify-start items-center h-full">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full flex gap-2 justify-center items-center">
                    <Loader /> Loading Transcript
                  </Skeleton>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              )}
            </TabsContent>
            <TabsContent value="summary" className="ml-2">
              <div className="pt-5">
                {data && data.note?.summary ? (
                  <p>{data?.note.summary}</p>
                ) : (
                  <div className="flex flex-col gap-1 justify-start items-center h-full">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full flex gap-2 justify-center items-center">
                      <Loader /> Loading Summary
                    </Skeleton>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full h-full">
          {data ? (
            <ActionItems actionItems={data.actionItems} />
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center h-full shadow-lg">
              <Skeleton className="h-10 w-full flex-1" />
              <Skeleton className="h-10 w-full flex-1" />
              <Skeleton className="h-10 w-full flex-1 flex gap-2 justify-center items-center">
                <Loader /> Loading Action Items
              </Skeleton>
              <Skeleton className="h-10 w-full flex-1" />
              <Skeleton className="h-10 w-full flex-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
