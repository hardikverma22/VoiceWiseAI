import {Checkbox} from "@/components/ui/checkbox";
import {api} from "@/convex/_generated/api";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {cn} from "@/lib/utils";
import {useMutation} from "convex/react";
import {MouseEvent} from "react";
import {toast} from "sonner";

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
    <ul className="flex flex-col gap-3">
      {actionItems.map((item) => (
        <li
          className="p-5 shadow-md bg-slate-200
                     cursor-pointer hover:bg-slate-300
                    flex justify-start items-center gap-1"
          key={item._id}
          onClick={(e) => handleClickActionItem(item._id, item.done, e)}
        >
          <Checkbox
            checked={item.done}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={(state) => handleClickActionItem(item._id, item.done)}
          />

          <span className={cn({"line-through": item.done})}>{item.task}</span>
        </li>
      ))}
    </ul>
  );
};

export default ActionItems;
