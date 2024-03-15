import {Button} from "@/components/ui/button";
import {MicIcon, Square} from "lucide-react";

const RecordingControls = ({
  startRecording,
  isRecording,
  audioURL,
}: {
  startRecording: () => void;
  isRecording: boolean;
  audioURL: string | undefined;
}) => {
  if (audioURL) return null;
  return (
    <Button
      onClick={startRecording}
      className="bg-offWhite rounded-full h-20 w-20 shadow-xl 
          hover:bg-offWhite/50 hover:scale-105
          duration-150 ease-in-out transition-all 
          hover:border-b-2 hover:border-slate-400
          z-10
          before:content-none before:h-20 before:w-20 before:bg-red-500 before:z-100"
    >
      {isRecording ? (
        <Square className="text-slate-500 h-7 w-7 bg-slate-500 animate-pulse" />
      ) : (
        <MicIcon className="text-slate-500 h-7 w-7" />
      )}
    </Button>
  );
};

export default RecordingControls;
