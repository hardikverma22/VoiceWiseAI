import Loader from "@/components/Loader";
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
import {BotIcon} from "lucide-react";
import {Dispatch, SetStateAction} from "react";

type ProcessingAlertDialogProps = {
  showAlertDialog: boolean;
  setShowAlertDialog: Dispatch<SetStateAction<boolean>>;
  uploading: boolean;
};

const ProcessingAlertDialog = ({
  showAlertDialog,
  setShowAlertDialog,
  uploading,
}: ProcessingAlertDialogProps) => {
  return (
    <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2">
            {uploading ? <Loader /> : <BotIcon className="animate-bounce" />}
            {uploading ? "Uplaoding Audio" : "Processing"}!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base font-semibold ml-8 tracking-wide">
            {uploading
              ? `Your audio is being uploaded, this may take 1-2 minutes.`
              : `Your audio is now being processed to generate a comprehensive transcription and
            actionable insights.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProcessingAlertDialog;
