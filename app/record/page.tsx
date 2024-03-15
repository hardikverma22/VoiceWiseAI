"use client";
import {convertSecondsToHHMMSS, formatTime} from "@/lib/utils";
import useAudio from "@/hooks/useAudio";
import Circle from "@/components/Circle";
import PlayControls from "@/components/PlayControls";
import RecordingControls from "@/components/RecordingControls";

export default function page() {
  const {
    hasPermission,
    startRecording,
    audioURL,
    playOrPuase,
    isPlaying,
    triggerProcessAudio,
    elapsedSeconds,
    isRecording,
    currentTime,
    // maxSliderValue,
    // currentSliderValue,
  } = useAudio();

  if (!hasPermission)
    return <div className="w-full h-full flex justify-center items-center">No Permission</div>;

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="w-96 h-[36rem] rounded-t-full rounded-b-full bg-offWhite 
                      border-4 border-slate-50 shadow-xl flex items-center flex-col gap-10"
      >
        <Circle
          isPlaying={isPlaying}
          isRecording={isRecording}
          // currentSlidervalue={currentSliderValue}
          // maxSliderValue={maxSliderValue}
        />
        <div>
          <p className="text-3xl tracking-wider text-customSlate">
            {audioURL ? convertSecondsToHHMMSS(currentTime) : formatTime(elapsedSeconds)}
          </p>
        </div>

        <PlayControls
          isPlaying={isPlaying}
          triggerProcessAudio={triggerProcessAudio}
          playOrPuase={playOrPuase}
          audioURL={audioURL}
        />

        <RecordingControls
          audioURL={audioURL}
          isRecording={isRecording}
          startRecording={startRecording}
        />
      </div>
    </div>
  );
}
