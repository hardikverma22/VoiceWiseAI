"use client";

import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {SkeletonActionItems, SkeletonLoader} from "@/components/Loader";
import ActionItems from "@/components/ActionItems";
import {ScrollArea} from "@/components/ui/scroll-area";
import {getDisplayDate} from "@/lib/utils";

export default function RecordingDetails({params}: {params: {id: string}}) {
  const data = useQuery(api.audio.getNote, {id: params.id});

  return (
    <div className="flex flex-col pt-12 h-full">
      <div className="flex justify-between items-center">
        {data && (
          <>
            <h1 className="font-bold text-lg">
              {data.note.generatingTitle ? "Generating title..." : data.note.title}
            </h1>
            <span>{getDisplayDate(data.note._creationTime)}</span>
          </>
        )}
      </div>
      <div className="flex gap-20 mt-5 h-full ">
        <div className="w-full">
          <Tabs defaultValue="summary" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript" className="ml-2 pt-5 ">
              {data && data.note?.transcript && !data.note.generatingTranscript ? (
                <Paragraph text={data.note.transcript} />
              ) : (
                <SkeletonLoader loadingText="Loading Transcript" />
              )}
            </TabsContent>
            <TabsContent value="summary" className="ml-2">
              <div className="pt-5">
                {data && data.note?.summary ? (
                  <Paragraph text={data.note.summary} />
                ) : (
                  <SkeletonLoader loadingText="Loading Summary" />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full h-full">
          <h2 className="text-xl font-semibold text-gray-700 pb-8">Action Items</h2>
          {data && !data.note.generatingActionItems && data.actionItems.length > 0 ? (
            <ActionItems actionItems={data.actionItems} />
          ) : (
            <SkeletonActionItems />
          )}
        </div>
      </div>
    </div>
  );
}

const Paragraph = ({text}: {text: string}) => {
  return (
    <ScrollArea className="pb-10 h-[500px] w-full rounded-md ">
      <p
        className="text-lg font-[300] leading-[114.3%] tracking-[-0.6px] 
  lg:text-xl"
      >
        {text}
      </p>
    </ScrollArea>
  );
};
