"use client";

import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";
import {SkeletonActionItems} from "@/components/Loader";
import ActionItems from "@/components/ActionItems";
import {StatusFilter} from "@/components/StatusFilter";
import {ChangeEvent, useEffect, useState} from "react";
import RecordNew from "@/components/RecordNew";
import {Input} from "@/components/ui/input";

export type Status = "done" | "pending" | "unset" | "all";

export default function RecordingDetails() {
  const actionItems = useQuery(api.audio.getActionItems, {});
  const [status, setStatus] = useState<Status>("unset");
  const [filteredActionItems, setFilteredActionItems] = useState<typeof actionItems>(actionItems);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setFilteredActionItems(actionItems);
  }, [actionItems]);

  const handleFilterActionItems = (status: Status) => {
    setStatus(status);
    if (!actionItems) return;

    let newItems = getFilteredActionItems(status, actionItems);

    if (searchQuery.length > 0)
      newItems = newItems.filter((i) => i.task.toLowerCase().includes(searchQuery.toLowerCase()));

    setFilteredActionItems(newItems);
  };

  const getFilteredActionItems = (status: Status, items: typeof actionItems) => {
    if (status === "all" || status === "unset") return items!;
    return status === "done" ? items!.filter((a) => a.done) : items!.filter((a) => !a.done);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    if (!actionItems) return;

    if (searchValue.length === 0) {
      setFilteredActionItems(getFilteredActionItems(status, actionItems));
      return;
    }

    const newItems = actionItems.filter((i) =>
      i.task.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredActionItems(getFilteredActionItems(status, newItems));
  };

  if (actionItems && actionItems.length === 0) return <RecordNew />;

  return (
    <section className="flex flex-col pt-12 min-h-[calc(100dvh-72px)] mt-[72px]">
      {!actionItems && <SkeletonActionItems />}
      {actionItems && actionItems.length > 0 && (
        <>
          <div className="flex justify-between items-center pb-5">
            <h2 className="text-xl font-semibold text-gray-700 ">Action Items</h2>
            <div className="flex gap-3 justify-between items-center">
              <Input
                type="text"
                className="shadow-sm"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search Action Items..."
              />
              <StatusFilter status={status} handleFilterActionItems={handleFilterActionItems} />
            </div>
          </div>
          <ActionItems actionItems={filteredActionItems ?? []} />
        </>
      )}
    </section>
  );
}
