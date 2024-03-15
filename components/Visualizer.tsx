"use client";
import {useState, useEffect} from "react";

const Visualizer = ({
  isPlaying,
  bars,
  rainbowColors,
}: {
  isPlaying: boolean;
  bars: number;
  rainbowColors: string[];
}) => {
  const [barHeights, setBarHeights] = useState([...new Array(bars)].map(() => Math.random() * 200));

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        const newBarHeights = barHeights.map(() => Math.random() * 200);
        setBarHeights(newBarHeights);
      }, 200);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-center h-60 absolute bottom-0 left-1">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="w-4 mr-1 transition-all duration-300"
          style={{
            height: `${height}px`,
            background: `linear-gradient(to top, transparent, ${rainbowColors[index]} 50%)`,
            // animation: isPlaying ? `bounce${index} 1s infinite alternate` : "none",
          }}
        ></div>
      ))}
    </div>
  );
};

export default Visualizer;
