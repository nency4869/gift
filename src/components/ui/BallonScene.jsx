import React, { useMemo, useState } from "react";
import { balloonImages, balloonsData } from "../../utils/data";
import LetterForm from "./LetterForm";

const BalloonScene = () => {
  const [activeBalloon, setActiveBalloon] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Kích thước lớn hơn, responsive tốt
  const BALLOON_SIZE = "clamp(80px, 10vw, 140px)";

  // Tạo vị trí bong bóng, khoảng cách xa hơn
  const positions = useMemo(() => {
    const layers = [
      [0],
      [-1.2, 1.2],
      [-2.4, 0, 2.4],
      [-1.6, 0, 1.6],
      [-0.8, 0.8]
    ];
    const ps = [];
    let idx = 0;
    const baseTop = 20; // cao hơn
    const gapY = 14;    // khoảng cách dọc lớn hơn
    const gapX = 12;    // khoảng cách ngang lớn hơn

    for (let row = 0; row < layers.length && idx < balloonImages.length; row++) {
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
      setIsVisible(false);
      setTimeout(() => setActiveBalloon(null), 400);
    } else {
      setActiveBalloon(src);
      setTimeout(() => setIsVisible(true), 50);
    }
  };

  return (
    <div className="select-none fixed inset-0 pointer-events-none z-30 overflow-visible">
      {/* Các bong bóng */}
      {balloonImages.map((src, index) => {
        const pos = positions[index] || { left: "50%", top: "50%" };
        return (
          <img
            key={index}
            src={src}
            alt={`balloon-${index}`}
            className={`absolute animate-float transition-transform duration-500 cursor-pointer pointer-events-auto
              ${activeBalloon === src ? "opacity-0 scale-0" : "opacity-100 scale-100"}
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
