"use client"

import { useState, useRef, useMemo } from "react"
import { useSpinWheel, useRewards } from "@/hooks/use-api"
import type { SpinResult, WheelSegment } from "@/types"

interface SpinWheelProps {
  reviewId: string
  onSpinComplete: (result: SpinResult) => void
}

export default function SpinWheel({ reviewId, onSpinComplete }: SpinWheelProps) {
  const [hasSpun, setHasSpun] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheelMutation = useSpinWheel()
  const { data: rewardsData, isLoading: rewardsLoading, error: rewardsError } = useRewards()

  const wheelSegments: WheelSegment[] = useMemo(() => {
    if (!rewardsData?.data?.rewards) {
      return []
    }

    const rewards = rewardsData.data.rewards
    const colors = ["#48a256", "#cdda55", "#f97316", "#e11d48", "#8b5cf6", "#06b6d4"]

    return rewards.map((reward, index) => {
      const angle = (360 / rewards.length) * index
      const label = !reward.isTryAgain
        ? "Try\nagain"
        : reward.rewardName.includes("%")
          ? reward.rewardName.replace(" Discount", "\nDiscount")
          : reward.rewardName

      return {
        label,
        color: colors[index % colors.length],
        angle,
        reward,
      }
    })
  }, [rewardsData])

  const handleSpin = async () => {
    if (spinWheelMutation.isPending || hasSpun || wheelSegments.length === 0) return

    try {
      const result = await spinWheelMutation.mutateAsync(reviewId)

      if (result.success && result.data) {
        // Find the matching segment based on the API result
        const matchingSegmentIndex = wheelSegments.findIndex((segment) => segment.reward._id === result.data.prize.id)

        // Fallback to random if no match found
        const targetIndex =
          matchingSegmentIndex >= 0 ? matchingSegmentIndex : Math.floor(Math.random() * wheelSegments.length)

        const baseRotation = 1800 // 5 full rotations
        const segmentAngle = 360 / wheelSegments.length
        const finalAngle = 360 - (wheelSegments[targetIndex].angle + segmentAngle / 2)
        const totalRotation = baseRotation + finalAngle

        // Apply rotation
        if (wheelRef.current) {
          wheelRef.current.style.setProperty("--final-rotation", `${totalRotation}deg`)
          wheelRef.current.classList.add("spin-animation")
        }

        // Complete spin after animation
        setTimeout(() => {
          setHasSpun(true)

          setTimeout(() => {
            onSpinComplete(result.data)
          }, 1000)
        }, 3000)
      }
    } catch (error) {
      console.error("Error spinning wheel:", error)
      alert("Failed to spin wheel. Please try again.")
    }
  }

  if (rewardsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wheel segments...</p>
        </div>
      </div>
    )
  }

  if (rewardsError || wheelSegments.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load wheel segments</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#ea580c]"
          >
            Retry
          </button>
        </div>
      </div>
    )
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
                    const segmentAngle = 360 / wheelSegments.length
                    const startAngle = index * segmentAngle * (Math.PI / 180)
                    const endAngle = (index + 1) * segmentAngle * (Math.PI / 180)
                    const largeArcFlag = segmentAngle > 180 ? 1 : 0

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
                      <g key={segment.reward._id}>
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
                        <text
                          x={200 + 80 * Math.cos(startAngle + (endAngle - startAngle) / 2)}
                          y={200 + 80 * Math.sin(startAngle + (endAngle - startAngle) / 2)}
                          fontSize="20"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${(startAngle + (endAngle - startAngle) / 2) * (180 / Math.PI) + 90} ${200 + 80 * Math.cos(startAngle + (endAngle - startAngle) / 2)} ${200 + 80 * Math.sin(startAngle + (endAngle - startAngle) / 2)})`}
                        >
                          {!segment.reward.isTryAgain ? "😔" : "🎁"}
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
            disabled={spinWheelMutation.isPending || hasSpun || wheelSegments.length === 0}
            className={`w-full max-w-md mx-auto font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 ${
              spinWheelMutation.isPending || hasSpun || wheelSegments.length === 0
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-[#f97316] hover:bg-[#ea580c] text-white hover:scale-105"
            }`}
          >
            {spinWheelMutation.isPending ? "Spinning..." : hasSpun ? "Spin Complete!" : "Tap to Spin"}
          </button>

          {spinWheelMutation.isPending && (
            <p className="text-gray-600 mt-4 animate-pulse">Good luck! Your prize is being determined...</p>
          )}

          {spinWheelMutation.error && (
            <p className="text-red-600 mt-4 bg-red-50 p-3 rounded-lg">Error: {spinWheelMutation.error.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
