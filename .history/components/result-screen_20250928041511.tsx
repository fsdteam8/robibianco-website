"use client"

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

  return (
    <div className="min-h-screen bg-[#48a256] relative overflow-hidden">
      {/* Curved design elements */}
      <div className="absolute bottom-0 right-0 w-full h-64">
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,300 C400,100 800,100 1200,300 L1200,300 L0,300 Z" fill="#cdda55" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-16 text-center text-white">
        {/* Celebration Icon */}
        <div className="mb-8">
          <div className="text-6xl mb-4">🎉</div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Congratulations!</h1>

        <h2 className="text-3xl md:text-5xl font-old mb-12 text-[#f97316] [-webkit-text-stroke:1px_black]">You Win: {result.prize.rewardName}</h2>

        {/* Prize Code Card */}
        <div className="max-w-md mx-auto bg-[#cdda55] text-black rounded-2xl p-8 mb-12">
          {/* QR Code Placeholder */}
          <div className="w-48 h-48 mx-auto mb-6 bg-black rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1 p-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-white" : "bg-black"}`} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-lg">Prize Code: {result.prize.prizeCode}</p>
            <p className="text-sm">{result.prize.description}</p>
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="w-full max-w-md mx-auto bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
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
      {/* Green curved header */}
      <div className="bg-[#48a256] text-white text-center py-8 relative">
        <h1 className="text-4xl md:text-5xl font-bold">Spin & Win</h1>
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="#cdda55" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          {/* Sad emoji */}
          <div className="text-6xl mb-8">😔</div>

          <h2 className="text-3xl font-bold text-gray-800 mb-6">Try Again!</h2>

          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Better luck next time! Thank you for your review. Come back again for another chance to win amazing prizes!
          </p>

          <button
            onClick={onTryAgain}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
