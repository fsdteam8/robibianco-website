"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"
import type { SpinResult } from "@/types"

interface ResultScreenProps {
  result: SpinResult
  onBackToHome: () => void
}

export default function ResultScreen({ result, onBackToHome }: ResultScreenProps) {
  const isWinner = result.prize.isTryAgain

  if (!isWinner) {
    return <TryAgainScreen onTryAgain={onBackToHome} />
  }

  return <WinnerScreen result={result} onBackToHome={onBackToHome} />
}

interface WinnerScreenProps {
  result: SpinResult
  onBackToHome: () => void
}

function WinnerScreen({ result, onBackToHome }: WinnerScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return

      try {
        const qrData = {
          rewardName: result.prize.rewardName,
          description: result.prize.description,
          couponCode: result.prize.couponCode || "SPIN2WIN",
          prizeCode: result.prize.prizeCode || `PRIZE-${Date.now()}`,
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          website: "https://yourstore.com/redeem",
        }

        const qrString = JSON.stringify(qrData)

        await QRCode.toCanvas(canvasRef.current, qrString, {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        })
      } catch (error) {
        console.error("Error generating QR code:", error)
      }
    }

    generateQRCode()
  }, [result])

  return (
    <div className="min-h-screen bg-[#48a256] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-full h-48 sm:h-64 lg:h-80">
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bottomCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cdda55" />
              <stop offset="50%" stopColor="#bbec6c" />
              <stop offset="100%" stopColor="#cdda55" />
            </linearGradient>
          </defs>
          <path d="M0,300 C400,100 800,100 1200,300 L1200,300 L0,300 Z" fill="url(#bottomCurveGradient)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-8 sm:py-12 lg:py-16 text-center text-white">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-4 animate-bounce">🎉</div>
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-balance">
          Congratulations!
        </h1>

        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 lg:mb-16 text-[#f97316] text-balance px-4">
          You Win: {result.prize.rewardName}
        </h2>

        <div className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto bg-[#cdda55] text-black rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 lg:mb-16 shadow-2xl">
          {/* QR Code */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto mb-4 sm:mb-6 bg-white rounded-lg flex items-center justify-center p-2 sm:p-4">
            <canvas ref={canvasRef} className="max-w-full max-h-full" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <p className="font-bold text-sm sm:text-lg lg:text-xl">
              Prize Code: {result.prize.prizeCode || `PRIZE-${Date.now()}`}
            </p>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed">{result.prize.description}</p>
            {result.prize.couponCode && (
              <p className="font-semibold text-xs sm:text-sm lg:text-base bg-white rounded-lg py-1 sm:py-2 px-2 sm:px-3">
                Coupon: {result.prize.couponCode}
              </p>
            )}
            <p className="text-xs sm:text-sm text-gray-700 mt-2 sm:mt-3">Scan QR code to redeem your prize</p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}

interface TryAgainScreenProps {
  onTryAgain: () => void
}

function TryAgainScreen({ onTryAgain }: TryAgainScreenProps) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="bg-[#48a256] text-white text-center py-6 sm:py-8 lg:py-12 relative">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4">Spin & Win</h1>
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 lg:h-16">
          <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tryAgainCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#cdda55" />
                <stop offset="50%" stopColor="#bbec6c" />
                <stop offset="100%" stopColor="#cdda55" />
              </linearGradient>
            </defs>
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="url(#tryAgainCurveGradient)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:py-12 lg:py-16 text-center">
        <div className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
          <div className="text-4xl sm:text-6xl lg:text-8xl mb-6 sm:mb-8 lg:mb-12 animate-pulse">😔</div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-balance">
            Try Again!
          </h2>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 lg:mb-16 leading-relaxed text-pretty">
            Better luck next time! Thank you for your review. Come back again for another chance to win amazing prizes!
          </p>

          <button
            onClick={onTryAgain}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-xl text-base sm:text-lg lg:text-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
