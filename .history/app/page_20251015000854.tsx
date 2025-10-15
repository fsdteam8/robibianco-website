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
  const [reviewId, setReviewId] = useState<string | null>("123")
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  const handleSlideClick = () => {
    setCurrentStep("spin-intro")
  }

  const handleSpinIntroStart = () => {
    setCurrentStep("review-form")
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
    setReviewId(null)
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
       <div className="absolute top-6 left-6 z-50 space-x-2 flex">
        <InfoModal/>
         <Dialog open={isQRModalOpen} onOpenChange={setIsQRModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2  bg-white/30 text-black hover:bg-white " >
              <QrCode className="h-4 w-4" />
              <span className="hidden md:block">QR Code</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="!text-white">
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

            

            case "spin-wheel":
              return <SpinWheel reviewId={reviewId} onSpinComplete={handleSpinComplete} />

            case "result":
              return <ResultScreen result={spinResult} onBackToHome={handleBackToHome} />

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
