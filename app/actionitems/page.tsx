"use client";

import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {SkeletonActionItems} from "@/components/Loader";
import ActionItems from "@/components/ActionItems";
import {StatusFilter} from "@/components/StatusFilter";
import {useEffect, useState} from "react";
import RecordNew from "@/components/RecordNew";

export type Status = "Done" | "Pending" | "Unset" | "All";

export default function RecordingDetails() {
  const actionItems = useQuery(api.audio.getActionItems, {});
  const [status, setStatus] = useState<Status>("Unset");
  const [filteredActionItems, setFilteredActionItems] = useState<typeof actionItems>(actionItems);

  useEffect(() => {
    setFilteredActionItems(actionItems);
  }, [actionItems]);

  const handleFilterActionItems = (status: Status) => {
    setStatus(status);
    if (!actionItems) return;

    if (status === "All") {
      setFilteredActionItems(actionItems);
      return;
    }

    const newItems =
      status === "Done" ? actionItems.filter((a) => a.done) : actionItems.filter((a) => !a.done);

    setFilteredActionItems(newItems);
  };

  if (actionItems && actionItems.length === 0) return <RecordNew />;

  return (
    <section className="flex flex-col pt-12 min-h-[calc(100dvh-72px)] mt-[72px]">
      {!actionItems && <SkeletonActionItems />}
      {actionItems && actionItems.length > 0 && (
        <>
          <div className="flex justify-between items-center pb-5">
            <h2 className="text-xl font-semibold text-gray-700 ">Action Items</h2>
            <StatusFilter status={status} handleFilterActionItems={handleFilterActionItems} />
          </div>
          <ActionItems actionItems={filteredActionItems ?? []} />
        </>
      )}
    </section>
  );
}
