import React, { useState, useRef } from "react";
import FlowerImg from "../../assets/flower.png";

const FlowerForm = ({ onFlowerClick }) => {
  const [particles, setParticles] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef(null);

  const handleFlowerClick = (e) => {
    if (isClicked) return;
    setIsClicked(true);
    if (onFlowerClick) onFlowerClick(); // 👈 báo cho IntroPage biết

    const containerRect = containerRef.current.getBoundingClientRect();
    const imgRect = e.target.getBoundingClientRect();
    const centerX = imgRect.left + imgRect.width / 2 - containerRect.left;
    const centerY = imgRect.top + imgRect.height / 2 - containerRect.top;
    const distance = Math.min(containerRect.width * 0.4, 150);

    const newParticles = Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 360) / 12;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * distance;
      const y = Math.sin(rad) * distance;
      return { id: Date.now() + i, x, y, startX: centerX, startY: centerY };
    });

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1200);
  };

  return (
    <div
      ref={containerRef}
      className="select-none flex flex-col justify-center items-center min-h-[20rem] sm:h-96 pt-6 pb-6 sm:pt-10 sm:pb-10 px-4 w-[90vw] max-w-[20rem] sm:max-w-sm gap-6 sm:gap-8 relative overflow-hidden"
    >
      <h2
        className="animated-text text-center px-2 text-lg sm:text-2xl"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {isClicked ? "Bạn xinh đẹp như bông hoa" : "Hãy bấm vào bông hoa"}
      </h2>

      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: p.startX,
            top: p.startY,
            fontSize: "1.5rem",
            animation: "burst 1.2s cubic-bezier(0.2, 0, 0.2, 1) forwards",
            "--x": `${p.x}px`,
            "--y": `${p.y}px`,
            zIndex: 30,
            textShadow: "0 0 8px rgba(255,215,0,0.9)",
          }}
        >
          🌸
        </span>
      ))}

      <div className="flower-glow-container relative">
        <img
          src={FlowerImg}
          alt="Flower"
          onClick={handleFlowerClick}
          style={{ animation: "spin 10s linear infinite" }}
          className="w-36 sm:w-48 md:w-56 h-auto cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-300 relative z-20"
        />
      </div>

      <style>{`
        @keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
        @keyframes burst {
          0% { transform: translate(-50%, -50%) translate(0,0) scale(0); opacity:1; }
          100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(1); opacity:0; }
        }
        .flower-glow-container { animation: rotating-glow 3s linear infinite; border-radius: 50%; }
        @keyframes rotating-glow {
          0%,100% { filter: drop-shadow(0 0 20px rgba(255,255,255,0.9)); }
          50% { filter: drop-shadow(0 0 30px rgba(255,255,255,1)); }
        }
        .animated-text {
          background: linear-gradient(270deg,#ff6ec4,#7873f5,#5ee7df,#b490ca,#ffa8a8,#ff6ec4);
          background-size:1000% 1000%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation: rainbowText 15s linear infinite;
        }
        @keyframes rainbowText {
          0% {background-position:0% 50%;}
          50% {background-position:100% 50%;}
          100% {background-position:0% 50%;}
        }
      `}</style>
    </div>
  );
};

export default FlowerForm;
