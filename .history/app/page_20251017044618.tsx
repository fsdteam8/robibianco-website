"use client"

import { useState } from "react"
import type { AppStep, SpinResult } from "@/types"
import Slideshow from "@/components/slideshow"
import SpinIntro from "@/components/spin-intro"
// import ReviewForm from "@/components/review-form"
import SpinWheel from "@/components/spin-wheel"
import ResultScreen from "@/components/result-screen"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import QRCodeModal from "@/components/qr-code-modal"
import InfoModal from "@/components/info-modal"
import GoogleReview from "@/components/google-reviews"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("slideshow")
  // const [reviewId, setReviewId] = useState<string | null>("123")
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const handleSlideClick = () => {
    setCurrentStep("spin-intro")
  }

  const handleSpinIntroStart = () => {
    setCurrentStep("spin-wheel")
  }

  // const handleReviewSubmit = (id: string) => {
  //   setReviewId(id)
  //   setCurrentStep("spin-wheel")
  // }

  const handleSpinComplete = (result: SpinResult) => {
    setSpinResult(result)
    setCurrentStep("result")
  }

  const handleBackToHome = () => {
    // Reset all state for a fresh start
    setCurrentStep("slideshow")
    // setReviewId(null)
    setSpinResult(null)
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
  return (
    <div className="min-h-screen">
      {/* <TopBar /> */}
     
       
      <div >
        {(() => {
          switch (currentStep) {
            case "slideshow":
              return <Slideshow onSlideClick={handleSlideClick} />

            case "spin-intro":
              return <SpinIntro onStart={handleSpinIntroStart} />

            case "spin-wheel":
              return <SpinWheel onSpinComplete={handleSpinComplete} />

            case "result":
              return spinResult ? (
                <ResultScreen result={spinResult} onBackToHome={handleBackToHome} />
              ) : null

            case "review-form":
              return <GoogleReview/>

            default:
              return <Slideshow onSlideClick={handleSlideClick} />
          }
        })()}
      </div>
    </div>
  )
}
