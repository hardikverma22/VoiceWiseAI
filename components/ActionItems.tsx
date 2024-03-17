import {Checkbox} from "@/components/ui/checkbox";
import {api} from "@/convex/_generated/api";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {cn, getDisplayDate} from "@/lib/utils";
import {useMutation} from "convex/react";
import {MouseEvent} from "react";
import {toast} from "sonner";
import {ScrollArea} from "@/components/ui/scroll-area";

const ActionItems = ({actionItems}: {actionItems: Doc<"actionItems">[]}) => {
  const updatActionItemStatus = useMutation(api.audio.updatActionItemStatus);

  const handleClickActionItem = async (
    id: Id<"actionItems">,
    done: boolean,
    e?: MouseEvent<HTMLLIElement>
  ) => {
    if (e) e?.stopPropagation();
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
                checked={item.done}
                onClick={(e) => e.stopPropagation()}
                onCheckedChange={(state) => handleClickActionItem(item._id, item.done)}
              />

              <span className={cn({"line-through": item.done}, "text-lg")}>{item.task}</span>
            </div>
            <span className="text-sm text-gray-500 pl-6">{getDisplayDate(item._creationTime)}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default ActionItems;
