"use client"

import { useState } from "react"
import type { AppStep, ReviewData, SpinResult } from "@/types"
import Slideshow from "@/components/slideshow"
import SpinIntro from "@/components/spin-intro"
import ReviewForm from "@/components/review-form"
import SpinWheel from "@/components/spin-wheel"
import ResultScreen from "@/components/result-screen"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("slideshow")
  const [reviewData, setReviewData] = useState<ReviewData | null>(null)
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null)
  const [hasSpun, setHasSpun] = useState(false)

  const handleSlideClick = () => {
    setCurrentStep("spin-intro")
  }

  const handleSpinIntroStart = () => {
    setCurrentStep("review-form")
  }

  const handleReviewSubmit = (data: ReviewData) => {
    setReviewData(data)
    setCurrentStep("spin-wheel")
  }

  const handleSpinComplete = (result: SpinResult) => {
    setSpinResult(result)
    setHasSpun(true)
    setCurrentStep("result")
  }

  const handleBackToHome = () => {
    // Reset all state for a fresh start
    setCurrentStep("slideshow")
    setReviewData(null)
    setSpinResult(null)
    setHasSpun(false)
  }

  // Allow user to try again only if they haven't spun yet
  // const handleTryAgain = () => {
  //   if (!hasSpun) {
  //     setCurrentStep("spin-wheel")
  //   } else {
  //     handleBackToHome()
  //   }
  // }

  // Render current step
  switch (currentStep) {
    case "slideshow":
      return <Slideshow onSlideClick={handleSlideClick} />

    case "spin-intro":
      return <SpinIntro onStart={handleSpinIntroStart} />

    case "review-form":
      return <ReviewForm onSubmit={handleReviewSubmit} />

    case "spin-wheel":
      return <SpinWheel onSpinComplete={handleSpinComplete} />

    case "result":
      return spinResult ? <ResultScreen result={spinResult} onBackToHome={handleBackToHome} /> : null

    default:
      return <Slideshow onSlideClick={handleSlideClick} />
  }
}
