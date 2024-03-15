import Visualizer from "@/components/Visualizer";
// import {Slider} from "@/components/ui/slider";
import {cn, generateRainbowColors} from "@/lib/utils";

type CircleProps = {
  isRecording: boolean;
  isPlaying: boolean;
  // maxSliderValue: number;
  // currentSlidervalue: number;
};

const NO_OF_BARS = 15;

const Circle = ({
  isRecording,
  isPlaying,
}: //  maxSliderValue, currentSlidervalue
CircleProps) => {
  // console.log({maxSliderValue, currentSlidervalue});
  const rainbowColors = generateRainbowColors(NO_OF_BARS);
  return (
    <div className="w-80 h-80 aspect-square rounded-full mt-8">
      <div className="w-full h-full bg-slate-50 p-5 rounded-full overflow-hidden relative">
        <div
          className={cn("absolute -inset-0 border-2 rounded-full", {
            "border-t-pink-500 animate-spin": isRecording,
          })}
        />
        <div className="relative bg-slate-100 h-full w-full rounded-full overflow-hidden">
          <Visualizer
            isPlaying={isRecording || isPlaying}
            bars={NO_OF_BARS}
            rainbowColors={rainbowColors}
          />
          {/* <div className="absolute w-full h-full z-100 flex justify-center items-center">
            <Slider defaultValue={[0]} value={[currentSlidervalue]} max={maxSliderValue} step={1} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Circle;
