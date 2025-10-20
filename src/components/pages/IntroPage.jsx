import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlowerForm from "../ui/FlowerForm";

const IntroPage = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);

  const handleFlowerClick = () => {
    setShowMessage(true);
    setTimeout(() => navigate("/main"), 3000);
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.48), transparent 67%),
            radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.41), transparent 67%),
            radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.44), transparent 63%),
            radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.36), transparent 66%),
            linear-gradient(45deg, #f7eaff 0%, #fde2ea 100%)
          `,
        }}
      />

      <div className="relative z-10">
        {showMessage ? (
          <h1
            className="text-center text-3xl sm:text-5xl font-extrabold animated-text px-4 fade-in"
            style={{
              fontFamily: "'Pacifico', cursive",
            }}
          >
            Hãy chọc vào bong bóng nha
          </h1>
        ) : (
          <FlowerForm onFlowerClick={handleFlowerClick} />
        )}
      </div>

      <style>{`
        .animated-text {
          background: linear-gradient(270deg,#ff6ec4,#7873f5,#5ee7df,#b490ca,#ffa8a8,#ff6ec4);
          background-size:1000% 1000%;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation: rainbowText 10s linear infinite;
        }
        @keyframes rainbowText {
          0% {background-position:0% 50%;}
          50% {background-position:100% 50%;}
          100% {background-position:0% 50%;}
        }
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default IntroPage;
