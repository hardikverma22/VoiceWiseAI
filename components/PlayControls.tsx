import { TooltipContainer } from "@/components/TooltipContainer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PauseIcon, PlayIcon } from "lucide-react";

type PlayControlsProps = {
  isPlaying: boolean;
  playOrPuase: () => void;
  triggerProcessAudio: () => Promise<void>;
  audioURL: string | undefined;
};

const PlayControls = ({
  isPlaying,
  playOrPuase,
  triggerProcessAudio,
  audioURL,
}: PlayControlsProps) => {
  if (!audioURL) return null;
  return (
    <div className="flex gap-1">
      <div className="relative">
        <TooltipContainer tooltipText={isPlaying ? "Pause" : "Play"}>
          <Button
            onClick={playOrPuase}
            className="bg-offWhite text-gray-500 rounded-full h-14 w-14 shadow-xl z-50
                  hover:bg-offWhite/50 hover:scale-105 duration-75 transition-all 
                  hover:border-2 hover:shadow-xl"
          >
            {isPlaying ? (
              <PauseIcon className="text-slate-500 h-7 w-7" />
            ) : (
              <PlayIcon className="text-slate-500 h-7 w-7" />
            )}
          </Button>
        </TooltipContainer>

        <div
          className={cn(
            "absolute -inset-0 border-2 -z-10 border-t-pink-100 border-blue-200  rounded-full"
          )}
        />
      </div>
      <div className="relative">
        <TooltipContainer
          // tooltipText="Process Audio"
          tooltipText="Service under maintenance"
        >
          <Button
            // onClick={triggerProcessAudio}
            onClick={() => {}}
            className="bg-offWhite text-gray-500 rounded-full h-14 w-14 shadow-xl z-50
                  hover:bg-offWhite/50 hover:scale-105 duration-75 transition-all 
                  hover:border-2 hover:shadow-xl"
          >
            Go
          </Button>
        </TooltipContainer>
        <div
          className={cn(
            "absolute -inset-0 border-2 -z-10 border-t-pink-100 border-blue-200  rounded-full"
          )}
        />
      </div>
    </div>
  );
};

export default PlayControls;
