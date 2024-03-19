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
    <section className="flex flex-col pt-6 h-full ">
      <div
        className="flex flex-col md:flex-row md:justify-between 
                    md:items-center border-b-2 px-2 py-1 rounded-lg shadow-sm border-b-gray-300"
      >
        {data && (
          <>
            <h1
              title={data.note.generatingTitle ? "Generating title..." : data.note.title}
              className="font-bold text-xl
                         tracking-wide
                        line-clamp-1
                        max-w-[70%]
                        "
            >
              {data.note.generatingTitle ? "Generating title..." : data.note.title}
            </h1>
            <span>{getDisplayDate(data.note._creationTime)}</span>
          </>
        )}
      </div>
      <div
        className="flex flex-col md:flex-row gap-20 mt-5 
                    md:h-full"
      >
        <div className="w-full">
          <Tabs defaultValue="transcript" className="w-full md:h-full">
            <TabsList>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <TabsContent value="transcript" className="ml-2 pt-5  h-fit">
              {data && data.note?.transcript && !data.note.generatingTranscript ? (
                <Paragraph text={data.note.transcript} />
              ) : (
                <SkeletonLoader loadingText="Loading Transcript" />
              )}
            </TabsContent>
            <TabsContent value="summary" className="ml-2 h-fit">
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
    </section>
  );
}

const Paragraph = ({text}: {text: string}) => {
  return (
    <ScrollArea className="pb-10 min-h-[100px] md:h-[500px] w-full rounded-md ">
      <p
        className="text-lg font-[300] leading-[114.3%] tracking-[-0.6px] 
  lg:text-xl"
      >
        {text}
      </p>
    </ScrollArea>
  );
};
