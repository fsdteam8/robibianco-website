"use client";

import { useState, useRef, useMemo } from "react";
import { useSpinWheel, useRewards } from "@/hooks/use-api";
import type { SpinResult, WheelSegment } from "@/types";

interface SpinWheelProps {
  reviewId: string;
  onSpinComplete: (result: SpinResult) => void;
}

export default function SpinWheel({
  reviewId,
  onSpinComplete,
}: SpinWheelProps) {
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheelMutation = useSpinWheel();
  const {
    data: rewardsData,
    isLoading: rewardsLoading,
    error: rewardsError,
  } = useRewards();

  const wheelSegments: WheelSegment[] = useMemo(() => {
    if (!rewardsData?.data?.rewards) {
      return [];
    }

    const rewards = rewardsData.data.rewards;
    // console.log("Total rewards:", rewards.length);

    // Calculate segment angle based on number of rewards
    const segmentAngle = 360 / rewards.length;
    // console.log("Segment angle:", segmentAngle);

    // Generate colors array that can handle any number of segments
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

    return rewards.map((reward, index) => {
      const angle = segmentAngle * index;

      // Handle the label formatting
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
  }, [rewardsData]);

  const handleSpin = async () => {
    if (spinWheelMutation.isPending || hasSpun || wheelSegments.length === 0)
      return;

    try {
      const result = await spinWheelMutation.mutateAsync(reviewId);

      if (result.success && result.data) {
        const matchingSegmentIndex = wheelSegments.findIndex(
          (segment) => segment.reward._id === result.data.prize.id
        );
        const targetIndex =
          matchingSegmentIndex >= 0
            ? matchingSegmentIndex
            : Math.floor(Math.random() * wheelSegments.length);

        const baseRotation = 1800; // 5 full rotations for effect
        const segmentAngle = 360 / wheelSegments.length;
        const finalAngle =
          360 - (wheelSegments[targetIndex].angle + segmentAngle / 2);
        const totalRotation = baseRotation + finalAngle;

        // console.log(
        //   "Spinning to segment:",
        //   targetIndex,
        //   "Total rotation:",
        //   totalRotation
        // );

        if (wheelRef.current) {
          wheelRef.current.style.setProperty(
            "--final-rotation",
            `${totalRotation}deg`
          );
          wheelRef.current.classList.add("spin-animation");
        }

        setTimeout(() => {
          setHasSpun(true);

          setTimeout(() => {
            onSpinComplete(result.data);
          }, 1000);
        }, 3000);
      }
    } catch (error) {
      console.error("Error spinning wheel:", error);
      alert("Failed to spin wheel. Please try again.");
    }
  };

  if (rewardsLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316] mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base font-body">
            Loading wheel segments...
          </p>
        </div>
      </div>
    );
  }

  if (rewardsError || wheelSegments.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-red-600 mb-4 text-sm sm:text-base font-body">
            Failed to load wheel segments
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-[#ea580c] text-sm sm:text-base font-body"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            <defs>
              <linearGradient
                id="curveGradient"
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
              fill="url(#curveGradient)"
            />
          </svg>
        </div>
      </div>

      <div className="px-4 py-6 sm:py-8 lg:py-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-10 lg:mb-12 leading-relaxed px-4 font-medium font-body">
            Tap the wheel to spin and reveal your prize. Every spin gives you a
            chance to win exciting rewards!
          </p>

          {/* Display segment count for debugging */}
          {/* <p className="text-sm text-gray-500 mb-4">
            {wheelSegments.length} segments loaded
          </p> */}

          <div className="relative inline-block mb-8 sm:mb-12 lg:mb-16 ">
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 -translate-y-2 sm:-translate-y-3 lg:-translate-y-4 z-30">
              <div className="relative rotate-180">
                <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] sm:border-l-[16px] sm:border-r-[16px] sm:border-b-[28px] lg:border-l-[20px] lg:border-r-[20px] lg:border-b-[36px] border-l-transparent border-r-transparent border-b-black drop-shadow-lg"></div>
                <div className="absolute top-[18px] sm:top-[26px] lg:top-[34px] left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-black rounded-full"></div>
              </div>
            </div>

            <div className="relative">
              <div
                ref={wheelRef}
                className="w-72 h-72 font-body sm:w-96 sm:h-96 md:w-[28rem] md:h-[rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] rounded-full relative overflow-hidden border-8 lg:border-12 border-gray-300 transition-transform  shadow-2xl"
                // onClick={handleSpin}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 400"
                  className="transform -rotate-90"
                >
                  <defs>
                    {wheelSegments.map((segment, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`segmentGradient-${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={segment.color} />
                        <stop offset="100%" stopColor={segment.color + "DD"} />
                      </linearGradient>
                    ))}
                  </defs>
                  {wheelSegments.map((segment, index) => {
                    // Calculate segment angle dynamically based on total segments
                    const segmentAngle = 360 / wheelSegments.length;
                    const startAngle = index * segmentAngle * (Math.PI / 180);
                    const endAngle =
                      (index + 1) * segmentAngle * (Math.PI / 180);
                    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                    const x1 = 200 + 190 * Math.cos(startAngle);
                    const y1 = 200 + 190 * Math.sin(startAngle);
                    const x2 = 200 + 190 * Math.cos(endAngle);
                    const y2 = 200 + 190 * Math.sin(endAngle);

                    const pathData = [
                      `M 200 200`,
                      `L ${x1} ${y1}`,
                      `A 190 190 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      "Z",
                    ].join(" ");

                    const textAngle = startAngle + (endAngle - startAngle) / 2;
                    const textX = 200 + 130 * Math.cos(textAngle);
                    const textY = 200 + 130 * Math.sin(textAngle);
                    const iconX = 200 + 90 * Math.cos(textAngle);
                    const iconY = 200 + 90 * Math.sin(textAngle);

                    // Adjust font size based on number of segments
                    const fontSize = wheelSegments.length > 8 ? "12" : "14";

                    return (
                      <g key={segment.reward._id}>
                        <path
                          d={pathData}
                          fill={`url(#segmentGradient-${index})`}
                          stroke="#fff"
                          strokeWidth="2"
                          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize={fontSize}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${
                            textAngle * (180 / Math.PI) + 90
                          } ${textX} ${textY})`}
                          className="select-none"
                          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                        >
                          {segment.label.split("\n").map((line, lineIndex) => (
                            <tspan
                              key={lineIndex}
                              x={textX}
                              dy={lineIndex === 0 ? 0 : "1.2em"}
                            >
                              {line}
                            </tspan>
                          ))}
                        </text>
                        <text
                          x={iconX}
                          y={iconY}
                          fontSize={wheelSegments.length > 8 ? "16" : "20"}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${
                            textAngle * (180 / Math.PI) + 90
                          } ${iconX} ${iconY})`}
                          className="select-none"
                        >
                          {!segment.reward.isTryAgain ? "😔" : "🎁"}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-black rounded-full flex items-center justify-center z-10 shadow-2xl border-4 border-white">
                  <span className="text-white font-bold text-sm sm:text-base lg:text-lg font-heading">
                    Spin
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSpin}
            disabled={
              spinWheelMutation.isPending ||
              hasSpun ||
              wheelSegments.length === 0
            }
            className={`w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto font-bold py-4 sm:py-5 lg:py-6 px-8 sm:px-10 lg:px-12 rounded-2xl text-lg sm:text-xl lg:text-2xl transition-all duration-200 font-body ${
              spinWheelMutation.isPending ||
              hasSpun ||
              wheelSegments.length === 0
                ? "bg-gray-400 cursor-not-allowed text-gray-600"
                : "bg-[#f97316] hover:bg-[#ea580c] text-white hover:scale-105 shadow-xl hover:shadow-2xl"
            }`}
          >
            {spinWheelMutation.isPending
              ? "Spinning..."
              : hasSpun
              ? "Spin Complete!"
              : "Tap to Spin"}
          </button>

          {spinWheelMutation.isPending && (
            <p className="text-gray-600 mt-4 animate-pulse text-sm sm:text-base lg:text-lg font-body">
              Good luck! Your prize is being determined...
            </p>
          )}

          {spinWheelMutation.error && (
            <p className="text-red-600 mt-4 bg-red-50 p-3 rounded-lg text-sm sm:text-base lg:text-lg">
              Error: {spinWheelMutation.error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
