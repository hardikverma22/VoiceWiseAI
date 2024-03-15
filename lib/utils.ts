import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const convertSecondsToHHMMSS = (secs: number) => {
  const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
  const mins = (secs % 3600) / 60;
  return [mins, secs % 60].map(format).join(':');
};

export const generateRainbowColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    colors.push(`hsl(${hue}, 40%, 80%)`);
  }
  return colors;
};