"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { FaPlay, FaPause } from "react-icons/fa";

interface AudioWavePlayerProps {
  src: string;
}

export default function AudioWavePlayer({ src }: AudioWavePlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    waveSurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#d1d5db",
      progressColor: "#f97316", 
      cursorColor: "#f97316",
      barWidth: 2,
      barRadius: 2,
      height: 60, 
      normalize: true,
    });

    waveSurferRef.current.load(src);

    waveSurferRef.current.on("ready", () => {
      setDuration(waveSurferRef.current!.getDuration());
    });

    waveSurferRef.current.on("audioprocess", () => {
      setCurrentTime(waveSurferRef.current!.getCurrentTime());
    });

    waveSurferRef.current.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, [src]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const ws = waveSurferRef.current;
      if (!ws) return;

      const current = ws.getCurrentTime();
      const duration = ws.getDuration();

      if (e.key === "ArrowLeft") {
        const newTime = Math.max(current - 5, 0);
        ws.seekTo(newTime / duration);
      } else if (e.key === "ArrowRight") {
        const newTime = Math.min(current + 5, duration);
        ws.seekTo(newTime / duration);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const togglePlay = () => {
    if (!waveSurferRef.current) return;
    waveSurferRef.current.playPause();
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3 w-full max-w-[600px] mx-auto">
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all shadow"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="flex-1 flex flex-col">
          <div ref={containerRef} className="cursor-pointer"></div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
