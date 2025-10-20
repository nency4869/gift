import React, { useMemo, useState } from "react";
import { balloonImages, balloonsData } from "../../utils/data";
import LetterForm from "./LetterForm";

const BalloonScene = () => {
  const [activeBalloon, setActiveBalloon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const BALLOON_SIZE = "clamp(60px, 8vw, 100px)";

  // vị trí chụm lại gọn và responsive
  const positions = useMemo(() => {
    const layers = [[0], [-0.8, 0.8], [-1.6, 0, 1.6], [-0.8, 0.8], [0]];
    const ps = [];
    let idx = 0;
    const baseTop = 35;
    const gapY = 9;
    const gapX = 5;

    for (
      let row = 0;
      row < layers.length && idx < balloonImages.length;
      row++
    ) {
      const y = baseTop + row * gapY;
      for (let offset of layers[row]) {
        if (idx >= balloonImages.length) break;
        const x = 50 + offset * gapX;
        ps.push({
          left: `${x}%`,
          top: `${y}%`,
        });
        idx++;
      }
    }
    return ps;
  }, []);

  const handleBalloonClick = (src) => {
    if (activeBalloon === src) {
      // ẩn thư
      setIsVisible(false);
      setTimeout(() => setActiveBalloon(null), 400); // chờ hiệu ứng xong mới ẩn
    } else {
      setActiveBalloon(src);
      setTimeout(() => setIsVisible(true), 50); // delay nhỏ để animation mượt
    }
  };

  return (
  <div className="fixed inset-0 pointer-events-none z-30 overflow-visible">
    {/* Các bong bóng */}
    {balloonImages.map((src, index) => {
      const pos = positions[index] || { left: "50%", top: "50%" };
      return (
        <img
          key={index}
          src={src}
          alt={`balloon-${index}`}
          className={`absolute animate-float transition-transform duration-500 cursor-pointer pointer-events-auto
            ${
              activeBalloon === src
                ? "opacity-0 scale-0"
                : "opacity-100 scale-100"
            }
            hover:scale-105`}
          style={{
            left: pos.left,
            top: pos.top,
            width: BALLOON_SIZE,
            transform: "translate(-50%, -50%)",
            zIndex: 30,
          }}
          onClick={() => handleBalloonClick(src)}
          draggable={false}
        />
      );
    })}

    {/* Form thư */}
    {activeBalloon && (
      <div
        className={`fixed inset-0 flex items-center justify-center transition-all duration-500 ease-out z-[999]
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <LetterForm
          data={balloonsData[activeBalloon]}
          onClose={() => handleBalloonClick(activeBalloon)}
        />
      </div>
    )}
  </div>
);

};

export default BalloonScene;
