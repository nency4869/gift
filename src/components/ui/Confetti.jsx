import React, { useState, useEffect } from 'react';

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 + Math.random() * 20,
      rotation: Math.random() * 360,
      color: ['#FF6B9D', '#FDCB6E', '#74B9FF', '#55EFC4', '#FFA07A'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-pink-100 via-purple-50 to-blue-50 overflow-hidden">
      {/* Pháo hoa giấy */}
      {confetti.map(c => (
        <div
          key={c.id}
          className="absolute w-3 h-3 rounded-sm animate-fall"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            animationDelay: `${c.delay}s`,
            animationDuration: '4s'
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ConfettiAnimation;