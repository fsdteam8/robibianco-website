"use client"

import { useState } from "react"
import type { AppStep, SpinResult } from "@/types"
import Slideshow from "@/components/slideshow"
import SpinIntro from "@/components/spin-intro"
import ReviewForm from "@/components/review-form"
import SpinWheel from "@/components/spin-wheel"
import ResultScreen from "@/components/result-screen"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import QRCodeModal from "@/components/qr-code-modal"
export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("slideshow")
  const [reviewId, setReviewId] = useState<string | null>(null)
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null)
  const [hasSpun, setHasSpun] = useState(false)
 const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const handleSlideClick = () => {
    setCurrentStep("spin-intro")
  }

  const handleSpinIntroStart = () => {
    setCurrentStep("review-form")
  }

  const handleReviewSubmit = (id: string) => {
    setReviewId(id)
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
    setReviewId(null)
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
  return (
    <div className="min-h-screen">
      {/* <TopBar /> */}
       <div className="absolute top-6 left-6 z-50">
         <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <QrCode className="h-4 w-4" />
              QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan QR Code</DialogTitle>
              <DialogDescription>Scan this QR code to access our website</DialogDescription>
            </DialogHeader>
            <QRCodeModal />
          </DialogContent>
        </Dialog>
       </div>
      <div >
        {(() => {
          switch (currentStep) {
            case "slideshow":
              return <Slideshow onSlideClick={handleSlideClick} />

            case "spin-intro":
              return <SpinIntro onStart={handleSpinIntroStart} />

            case "review-form":
              return <ReviewForm onSubmit={handleReviewSubmit} />

            case "spin-wheel":
              return reviewId ? <SpinWheel reviewId={reviewId} onSpinComplete={handleSpinComplete} /> : null

            case "result":
              return spinResult ? <ResultScreen result={spinResult} onBackToHome={handleBackToHome} /> : null

            default:
              return <Slideshow onSlideClick={handleSlideClick} />
          }
        })()}
      </div>
    </div>
  )
}
