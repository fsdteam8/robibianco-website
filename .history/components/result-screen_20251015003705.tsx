// FILE: ResultScreen.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import type { SpinResult } from "@/types";

interface ResultScreenProps {
  result: SpinResult;
  onBackToHome: () => void;
}

export default function ResultScreen({
  result,
  onBackToHome,
}: ResultScreenProps) {
  // FIX: Corrected logic - if isTryAgain is TRUE, it's NOT a winner
  const isWinner = !result.prize.isTryAgain;

  useEffect(() => {
    const timer = setTimeout(() => {
      onBackToHome();
    }, 100000); // After 10 minutes, perform auto-redirect

    return () => clearTimeout(timer);
  }, [onBackToHome]);

  if (!isWinner) {
    return <TryAgainScreen onTryAgain={onBackToHome} />;
  }

  return <WinnerScreen result={result} onBackToHome={onBackToHome} />;
}

interface WinnerScreenProps {
  result: SpinResult;
  onBackToHome: () => void;
}

// Confetti Component
function Confetti() {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const confettiContainer = confettiRef.current;
    if (!confettiContainer) return;

    const colors = [
      "#f97316",
      "#ff6b6b",
      "#ffd700",
      "#ff1493",
      "#00ffff",
      "#ff4500",
      "#ffffff",
      "#ffff00",
      "#ff69b4",
      "#00ff00",
    ];
    const confettiCount = 100;

    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
      const confettiPiece = document.createElement("div");
      confettiPiece.className = "confetti-piece";
      confettiPiece.style.cssText = `
        position: absolute;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        animation-duration: ${Math.random() * 3 + 2}s;
        animation-delay: ${Math.random() * 2}s;
        animation-name: confetti-fall;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        transform: rotate(${Math.random() * 360}deg);
      `;
      confettiContainer.appendChild(confettiPiece);
    }

    // Cleanup function
    return () => {
      if (confettiContainer) {
        confettiContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-50"
      />
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

function WinnerScreen({ result, onBackToHome }: WinnerScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return;

      try {
        const qrData = `
          🎉 CONGRATULATIONS! 🎉

          Prize: ${result.prize.rewardName}
          Description: ${result.prize.description}

          ${
            result.prize.couponCode
              ? `Coupon Code: ${result.prize.couponCode}`
              : ""
          }
          ${
            result.prize.couponCode
              ? `Prize Code: ${result.prize.couponCode}`
              : `Prize Code: PRIZE-${Date.now()}`
          }

          Valid Until: ${new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toLocaleDateString()}

          To redeem:
          1. Show this QR code at checkout
          2. Or use the codes above online
          3. Visit: https://robibianco-website.vercel.app/

          Thank you for spinning with us!
        `.trim();

        await QRCode.toCanvas(canvasRef.current, qrData, {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });

        const dataUrl = await QRCode.toDataURL(qrData, {
          width: 400,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        setQrDataUrl(dataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [result]);

  const downloadQRCode = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = `prize-qr-code-${result.prize.rewardName
      .replace(/\s+/g, "-")
      .toLowerCase()}.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#48a256] relative overflow-hidden">
      {/* Confetti Effect */}
      <Confetti />

      <div className="absolute bottom-0 right-0 w-full h-48 sm:h-64 lg:h-80">
        <svg
          viewBox="0 0 1200 300"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="bottomCurveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#cdda55" />
              <stop offset="50%" stopColor="#bbec6c" />
              <stop offset="100%" stopColor="#cdda55" />
            </linearGradient>
          </defs>
          <path
            d="M0,300 C400,100 800,100 1200,300 L1200,300 L0,300 Z"
            fill="url(#bottomCurveGradient)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16 text-center text-white">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 animate-bounce">
            🎉
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-balance font-heading">
          Congratulations!
        </h1>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 text-[#f97316] text-balance px-4 font-body [-webkit-text-stroke:1px_black]">
          You Win: {result.prize.rewardName}
        </h2>

        <div className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto bg-[#cdda55] text-black rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16 shadow-2xl">
          {/* QR Code */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto mb-4 sm:mb-6 bg-white rounded-lg flex items-center justify-center p-2 sm:p-4">
            <canvas ref={canvasRef} className="max-w-full max-h-full" />
          </div>

          <div className="space-y-2 sm:space-y-3 font-body">
            <p className="font-bold text-sm sm:text-lg lg:text-xl">
              Prize Code: {result.prize.couponCode || `PRIZE-${Date.now()}`}
            </p>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed">
              {result.prize.description}
            </p>
            {result.prize.couponCode && (
              <p className="font-semibold text-xs sm:text-sm lg:text-base bg-white rounded-lg py-1 sm:py-2 px-2 sm:px-3">
                Coupon: {result.prize.couponCode}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">
              Scan QR code to redeem your prize
            </p>
          </div>

          <button
            onClick={downloadQRCode}
            disabled={!qrDataUrl}
            className="w-full mt-4 bg-[#48a256] hover:bg-[#3d8a47] disabled:bg-gray-400 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            📱 Download QR Code
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xs sm:max-w-md lg:max-w-lg mx-auto font-body">
          <button
            onClick={onBackToHome}
            className="flex-1 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Leave 
          </button>
        </div>

        <p className="text-sm sm:text-base text-black mt-6 sm:mt-8 font-body">
          Automatically returning to home in 1 Minute...
        </p>
      </div>
    </div>
  );
}

interface TryAgainScreenProps {
  onTryAgain: () => void;
}

function TryAgainScreen({ onTryAgain }: TryAgainScreenProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="bg-[#48a256] text-white text-center py-6 sm:py-8 lg:py-12 relative">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4 font-heading">
          Spin & Win
        </h1>
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 lg:h-16">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="tryAgainCurveGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#cdda55" />
                <stop offset="50%" stopColor="#bbec6c" />
                <stop offset="100%" stopColor="#cdda55" />
              </linearGradient>
            </defs>
            <path
              d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
              fill="url(#tryAgainCurveGradient)"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:py-12 lg:py-16 text-center font-body">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-6 sm:mb-8 lg:mb-12 animate-pulse">
            😔
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-balance">
            Try Again!
          </h2>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 lg:mb-16 leading-relaxed text-pretty">
            Better luck next time! Thank you for your review. Come back again
            for another chance to win amazing prizes!
          </p>

          <button
            onClick={onTryAgain}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Try Again
          </button>

          <p className="text-sm sm:text-base text-gray-500 mt-6 sm:mt-8">
            Automatically returning to home in 30 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
