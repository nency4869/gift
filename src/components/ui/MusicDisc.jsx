import React, { useState, useRef, useEffect } from "react";
import { Music2, Play } from "lucide-react";

const MusicDisc = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.5;
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <div
      className="fixed bottom-6 left-6 w-14 h-14 flex items-center justify-center
                 rounded-full bg-gradient-to-br from-indigo-500 to-blue-700
                 text-white shadow-lg cursor-pointer overflow-visible"
      onClick={togglePlay}
    >
      <div
        className={`absolute inset-0 rounded-full ${
          isPlaying ? "flower-glow" : ""
        }`}
      ></div>

      <div className={`${isPlaying ? "spinning" : ""}`}>
        {isPlaying ? <Music2 size={26} /> : <Play size={26} />}
      </div>

      <audio ref={audioRef} src="/music/lofi.mp3" preload="auto" />

      <style>
        {`
        @keyframes rotating-glow {
          0%, 50%, 100% {
            box-shadow: 0 0 10px rgba(255,255,255,0.6),
                        0 0 20px rgba(255,255,255,0.5);
          }
          25%, 75% {
            box-shadow: 0 0 10px rgba(255,255,255,0.6),
                        0 0 25px rgba(255,255,255,0.7);
          }
        }

        .flower-glow {
          animation: rotating-glow 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 4s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default MusicDisc;
