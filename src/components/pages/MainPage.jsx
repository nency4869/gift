import React, { useEffect, useState } from "react";
import MusicDisc from "../ui/MusicDisc";
import ConfettiAnimation from "../ui/Confetti";
import BalloonScene from "../ui/BallonScene";
import { motion, AnimatePresence } from "framer-motion";

const MainPage = () => {
  const [showHint, setShowHint] = useState(true);

  // Tự động ẩn sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Nền gradient kẹo bông 💗💙 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
        }}
      />

      {/* Confetti bay */}
      <ConfettiAnimation />

      {/* Đĩa nhạc xoay */}
      <MusicDisc />

      {/* Bong bóng */}
      <BalloonScene />

      {/* Dòng chữ hướng dẫn (hiện 3s đầu) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute top-8 w-full text-center z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-pink-700 drop-shadow-sm animate-bounce">
              💬 Hãy chọc vào bong bóng nhé 🎈
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;
