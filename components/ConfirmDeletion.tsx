import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";

import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {MouseEvent, useState} from "react";
import {Trash} from "lucide-react";

const ConfirmDeletionAlertDialog = ({noteId}: {noteId: Id<"audioNotes">}) => {
  const deleteNote = useMutation(api.audio.removeNote);
  const [open, setOpen] = useState(false);

  const handleDeleteNote = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteNote({id: noteId});
  };

  const handleConfirmation = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          onClick={handleConfirmation}
          variant="link"
          className="text-right hover:scale-105 duration-300 transition-all hover:text-red-500"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this recording, summary,
            transcript and its action items.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDeleteNote}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeletionAlertDialog;
