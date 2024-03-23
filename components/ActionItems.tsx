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
import {DatePicker} from "@/components/DatePicker";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";

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

  if (actionItems && actionItems.length == 0)
    return <div>No Action Items exist for the selecetd filter.</div>;

  return (
    <ScrollArea className="pb-10 h-[500px] w-full rounded-md ">
      <ul className="flex flex-col gap-3">
        {actionItems.map((item) => (
          <li
            className="p-5 shadow-md bg-slate-100
                     cursor-pointer hover:bg-slate-300
                    flex flex-col gap-2"
            key={item._id}
            onClick={(e) => handleClickActionItem(item._id, item.done, e)}
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-start items-center ">
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
              {item.title && (
                <div className="pl-6 flex gap-1 justify-between items-center w-full">
                  <div
                    className="flex gap-2 text-gray-500 text-sm"
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <span>Belongs to:</span>
                    <Link
                      href={`/recording/${item.audioNoteId}`}
                      className="text-blue-600 hover:underline underline-offset-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              )}
              {/* <RenderDate creationTime={item._creationTime} /> */}
            </div>
            <div className="flex gap-5 justify-start items-center pl-6 ">
              <div className="flex justify-center items-center gap-1">
                <CalendarIcon className="h-5 w-5" />
                <span className="text-gray-600 text-sm">Created On: </span>
                <span>{format(new Date(item._creationTime), "PPP")}</span>
              </div>
              <div className="flex justify-center items-center gap-1">
                <CalendarIcon className="h-5 w-5" />
                <span className="text-gray-600 text-sm">Due Date: </span>
                <DatePicker
                  dueDate={item.dueDate}
                  id={item._id}
                  task={item.task}
                  creationDate={new Date(item._creationTime)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

const RenderDate = ({creationTime}: {creationTime: number}) => {
  return (
    <span className="text-sm  px-4 py-2 bg-stone-200 rounded-sm shadow-sm flex gap-2 justify-center items-center">
      <CalendarIcon className="h-4 w-4" />
      {format(new Date(creationTime), "PPP")}
    </span>
  );
};

export default ActionItems;
