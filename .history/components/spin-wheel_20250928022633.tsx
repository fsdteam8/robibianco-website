"use client"

import { useState, useRef } from "react"
import type { SpinResult, SpinWheelResponse } from "@/types"

interface SpinWheelProps {
  reviewId: string
  onSpinComplete: (result: SpinResult) => void
}

const wheelSegments = [
  { label: "10%\nDiscount", color: "#48a256", angle: 0, prize: "10% Discount", discount: 10 },
  { label: "Try\nagain", color: "#cdda55", angle: 45, prize: "Try Again", discount: 0 },
  { label: "Try\nagain", color: "#48a256", angle: 90, prize: "Try Again", discount: 0 },
  { label: "10%\nDiscount", color: "#cdda55", angle: 135, prize: "10% Discount", discount: 10 },
  { label: "5%\nDiscount", color: "#f97316", angle: 180, prize: "5% Discount", discount: 5 },
  { label: "10%\nDiscount", color: "#48a256", angle: 225, prize: "10% Discount", discount: 10 },
  { label: "Try\nagain", color: "#cdda55", angle: 270, prize: "Try Again", discount: 0 },
  { label: "5%\nDiscount", color: "#f97316", angle: 315, prize: "5% Discount", discount: 5 },
]

export default function SpinWheel({ reviewId, onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const 

  const handleSpin = async () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)

    try {
      const response = await fetch(`http://localhost:5001/api/v1/spin-win/spin-wheel/${reviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: SpinWheelResponse = await response.json()

      if (result.success && result.data) {
        // Calculate rotation based on API result
        const randomIndex = Math.floor(Math.random() * wheelSegments.length)
        const baseRotation = 1800 // 5 full rotations
        const segmentAngle = 360 / wheelSegments.length
        const finalAngle = 360 - (wheelSegments[randomIndex].angle + segmentAngle / 2)
        const totalRotation = baseRotation + finalAngle

        // Apply rotation
        if (wheelRef.current) {
          wheelRef.current.style.setProperty("--final-rotation", `${totalRotation}deg`)
          wheelRef.current.classList.add("spin-animation")
        }

        // Complete spin after animation
        setTimeout(() => {
          setIsSpinning(false)
          setHasSpun(true)

          setTimeout(() => {
            onSpinComplete(result.data)
          }, 1000)
        }, 3000)
      } else {
        throw new Error(result.message || "Failed to spin wheel")
      }
    } catch (error) {
      console.error("Error spinning wheel:", error)
      setIsSpinning(false)
      alert("Failed to spin wheel. Please try again.")
    }
  }

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
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed">
            Tap the wheel to spin and reveal your prize. Every spin gives you a chance to win exciting rewards!
          </p>

          {/* Wheel Container */}
          <div className="relative inline-block mb-12">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800"></div>
            </div>

            {/* Wheel */}
            <div className="relative">
              <div
                ref={wheelRef}
                className="w-80 h-80 md:w-96 md:h-96 rounded-full relative overflow-hidden border-4 border-gray-800 cursor-pointer transition-transform"
                onClick={handleSpin}
              >
                <svg width="100%" height="100%" viewBox="0 0 400 400" className="transform -rotate-90">
                  {wheelSegments.map((segment, index) => {
                    const startAngle = index * 45 * (Math.PI / 180)
                    const endAngle = (index + 1) * 45 * (Math.PI / 180)
                    const largeArcFlag = 45 > 180 ? 1 : 0

                    const x1 = 200 + 180 * Math.cos(startAngle)
                    const y1 = 200 + 180 * Math.sin(startAngle)
                    const x2 = 200 + 180 * Math.cos(endAngle)
                    const y2 = 200 + 180 * Math.sin(endAngle)

                    const pathData = [
                      `M 200 200`,
                      `L ${x1} ${y1}`,
                      `A 180 180 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      "Z",
                    ].join(" ")

                    return (
                      <g key={index}>
                        <path d={pathData} fill={segment.color} stroke="#fff" strokeWidth="2" />
                        <text
                          x={200 + 120 * Math.cos(startAngle + (endAngle - startAngle) / 2)}
                          y={200 + 120 * Math.sin(startAngle + (endAngle - startAngle) / 2)}
                          fill="white"
                          fontSize="14"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${(startAngle + (endAngle - startAngle) / 2) * (180 / Math.PI) + 90} ${200 + 120 * Math.cos(startAngle + (endAngle - startAngle) / 2)} ${200 + 120 * Math.sin(startAngle + (endAngle - startAngle) / 2)})`}
                        >
                          {segment.label.split("\n").map((line, lineIndex) => (
                            <tspan
                              key={lineIndex}
                              x={200 + 120 * Math.cos(startAngle + (endAngle - startAngle) / 2)}
                              dy={lineIndex === 0 ? 0 : "1.2em"}
                            >
                              {line}
                            </tspan>
                          ))}
                        </text>
                        {/* Emoji icons */}
                        <text
                          x={200 + 80 * Math.cos(startAngle + (endAngle - startAngle) / 2)}
                          y={200 + 80 * Math.sin(startAngle + (endAngle - startAngle) / 2)}
                          fontSize="20"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${(startAngle + (endAngle - startAngle) / 2) * (180 / Math.PI) + 90} ${200 + 80 * Math.cos(startAngle + (endAngle - startAngle) / 2)} ${200 + 80 * Math.sin(startAngle + (endAngle - startAngle) / 2)})`}
                        >
                          {segment.prize.includes("Discount") ? "🎁" : "😊"}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">Spin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || hasSpun}
            className={`w-full max-w-md mx-auto font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 ${
              isSpinning || hasSpun
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-[#f97316] hover:bg-[#ea580c] text-white hover:scale-105"
            }`}
          >
            {isSpinning ? "Spinning..." : hasSpun ? "Spin Complete!" : "Tap to Spin"}
          </button>

          {isSpinning && (
            <p className="text-gray-600 mt-4 animate-pulse">Good luck! Your prize is being determined...</p>
          )}
        </div>
      </div>
    </div>
  )
}
