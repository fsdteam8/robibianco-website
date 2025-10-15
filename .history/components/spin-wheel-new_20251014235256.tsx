"use client";

import type React from "react";
import { useRef, useState, useMemo } from "react";
import type { SpinResult } from "@/types";

interface WheelSegment {
  label: string;
  color: string;
  angle: number;
  reward: {
    _id: string;
    rewardName: string;
    isTryAgain: boolean;
  };
}

interface SpinWheelProps {
  onSpinComplete: (result: SpinResult) => void;
}

export default function SpinWheel({ onSpinComplete }: SpinWheelProps) {
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Mock rewards data
  const mockRewards = [
    {
      _id: "1",
      rewardName: "10% Discount",
      isTryAgain: true,
      description: "Get 10% off your next order",
      couponCode: "SPIN10",
      prizeCode: "D10",
    },
    {
      _id: "2",
      rewardName: "20% Discount",
      isTryAgain: true,
      description: "Get 20% off your next order",
      couponCode: "SPIN20",
      prizeCode: "D20",
    },
    {
      _id: "3",
      rewardName: "30% Discount",
      isTryAgain: true,
      description: "Get 30% off your next order",
      couponCode: "SPIN30",
      prizeCode: "D30",
    },
    {
      _id: "4",
      rewardName: "Try again",
      isTryAgain: false,
      description: "Better luck next time",
      couponCode: "",
      prizeCode: "TRYA",
    },
    {
      _id: "5",
      rewardName: "40% Discount",
      isTryAgain: true,
      description: "Get 40% off your next order",
      couponCode: "SPIN40",
      prizeCode: "D40",
    },
    {
      _id: "6",
      rewardName: "Try again",
      isTryAgain: false,
      description: "Better luck next time",
      couponCode: "",
      prizeCode: "TRYB",
    },
    {
      _id: "7",
      rewardName: "50% Discount",
      isTryAgain: true,
      description: "Get 50% off your next order",
      couponCode: "SPIN50",
      prizeCode: "D50",
    },
    {
      _id: "8",
      rewardName: "Try again",
      isTryAgain: false,
      description: "Better luck next time",
      couponCode: "",
      prizeCode: "TRYC",
    },
  ];

  const wheelSegments: WheelSegment[] = useMemo(() => {
    const segmentAngle = 360 / mockRewards.length;
    const baseColors = [
      "#48a256",
      "#cdda55",
      "#f97316",
      "#dc2626",
      "#7c3aed",
      "#0ea5e9",
      "#ec4899",
      "#84cc16",
    ];

    return mockRewards.map((reward, index) => {
      const angle = segmentAngle * index;
      const label = !reward.isTryAgain
        ? "Try\nagain"
        : reward.rewardName.includes("%")
        ? reward.rewardName.replace(" Discount", "\nDiscount")
        : reward.rewardName.length > 12
        ? reward.rewardName.substring(0, 12) + "..."
        : reward.rewardName;

      return {
        label,
        color: baseColors[index % baseColors.length],
        angle,
        reward,
      };
    });
  }, []);

  const handleSpin = async () => {
    if (hasSpun || wheelSegments.length === 0) return;

    try {
      // Randomly select a winning segment
      const targetIndex = Math.floor(Math.random() * wheelSegments.length);
      const baseRotation = 1800; // 5 full rotations for effect
      const segmentAngle = 360 / wheelSegments.length;
      const finalAngle =
        360 - (wheelSegments[targetIndex].angle + segmentAngle / 2);
      const totalRotation = baseRotation + finalAngle;

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${totalRotation}deg)`;
        setHasSpun(true);
      }

      // Wait for the wheel to finish spinning
      setTimeout(() => {
        const winningSegment = wheelSegments[targetIndex];
        onSpinComplete({
          prize: {
            id: winningSegment.reward._id,
            rewardName: winningSegment.reward.rewardName,
            isTryAgain: winningSegment.reward.isTryAgain,
          },
        });
      }, 3000);
    } catch (error) {
      console.error("Error spinning wheel:", error);
      alert("Failed to spin wheel. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="bg-[#48a256] text-white text-center py-8 sm:py-10 lg:py-12 relative">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 mb-2 font-heading">
          Spin & Win
        </h1>
        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 lg:h-20">
          <svg
            viewBox="0 0 1200 120"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
              fill="#cdda55"
            />
          </svg>
        </div>
      </div>

      <div className="px-4 py-6 sm:py-8 lg:py-10">
        <div className="max-w-4xl mx-auto text-center flex items-center flex-col justify-center">
          <div className="relative mb-8">
            {/* Wheel Container */}
            <div className="relative">
              {/* Pointer/Arrow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 z-10">
                <svg
                  viewBox="0 0 32 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 48L0 24L16 0L32 24L16 48Z" fill="#dc2626" />
                </svg>
              </div>

              {/* Wheel */}
              <div
                ref={wheelRef}
                className="w-64 h-64 sm:w-96 sm:h-96 rounded-full relative transition-transform duration-[3s] ease-out"
                style={{
                  transformOrigin: "center center",
                  transform: "rotate(0deg)",
                }}
              >
                {wheelSegments.map((segment) => (
                  <div
                    key={segment.reward._id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                    style={{
                      transform: `rotate(${segment.angle}deg)`,
                    }}
                  >
                    {/* Segment */}
                    <div
                      className="absolute top-0 left-1/2 w-1/2 h-full origin-left"
                      style={{
                        transform: `rotate(${360 / wheelSegments.length}deg)`,
                        backgroundColor: segment.color,
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                      }}
                    >
                      {/* Label */}
                      <div
                        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-white font-bold whitespace-pre-line text-center"
                        style={{
                          transform: `rotate(${
                            90 + 360 / wheelSegments.length / 2
                          }deg)`,
                        }}
                      >
                        {segment.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={hasSpun}
              className={`mt-8 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-200 ${
                hasSpun
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#f97316] hover:bg-[#ea580c] text-white"
              }`}
            >
              {hasSpun ? "Spinning..." : "Spin Now!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
