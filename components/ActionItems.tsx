"use client";
import {Checkbox} from "@/components/ui/checkbox";
import {api} from "@/convex/_generated/api";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {cn, getDisplayDate} from "@/lib/utils";
import {useMutation} from "convex/react";
import {MouseEvent} from "react";
import {toast} from "sonner";
import {ScrollArea} from "@/components/ui/scroll-area";
import Link from "next/link";

const ActionItems = ({
  actionItems,
}: {
  actionItems: (Doc<"actionItems"> & {title?: string | undefined})[];
}) => {
  const updatActionItemStatus = useMutation(api.audio.updatActionItemStatus);

  const handleClickActionItem = async (
    id: Id<"actionItems">,
    done: boolean,
    e?: MouseEvent<HTMLLIElement>
  ) => {
    console.log({object: "Clicked Action Items :" + id});
    if (e) {
      e?.stopPropagation();
      e.preventDefault();
    }
    await updatActionItemStatus({
      id,
      done: !done,
    });

    toast(`Action Item has been marked ${done ? "undone" : "done"}`);
  };

  return (
    <ScrollArea className="pb-10 h-[500px] w-full rounded-md ">
      <ul className="flex flex-col gap-3">
        {actionItems.map((item) => (
          <li
            className="p-5 shadow-md bg-slate-100
                     cursor-pointer hover:bg-slate-300
                    flex flex-col justify-start items-start gap-2"
            key={item._id}
            onClick={(e) => handleClickActionItem(item._id, item.done, e)}
          >
            <div className="flex gap-2 justify-start items-center">
              <Checkbox
                id={item._id}
                checked={item.done}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={() => handleClickActionItem(item._id, item.done)}
              />

              <label
                htmlFor={item._id}
                className={cn({"line-through": item.done}, "text-lg mt-0 pt-0")}
              >
                {item.task}
              </label>
            </div>
            {item.title ? (
              <div className="pl-6 flex gap-1 justify-between items-center w-full">
                <div className="flex gap-2" onKeyDown={(e) => e.stopPropagation()}>
                  <span>Belongs to:</span>
                  <Link
                    href={`/recording/${item.audioNoteId}`}
                    className="text-blue-600 hover:underline underline-offset-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.title}
                  </Link>
                </div>
                <RenderDate creationTime={item._creationTime} />
              </div>
            ) : (
              <RenderDate creationTime={item._creationTime} />
            )}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

const RenderDate = ({creationTime}: {creationTime: number}) => {
  return <span className="text-sm text-gray-500 pl-6">{getDisplayDate(creationTime)}</span>;
};

export default ActionItems;
