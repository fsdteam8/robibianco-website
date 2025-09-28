export interface ReviewData {
  name: string
  email: string
  phone: string
  rating: number
  review: string
}

export interface SpinResult {
  prize: {
    id: string
    rewardName: string
    couponCode: string
    description: string
    isTryAgain: boolean
    prizeCode: string
  }
}

export interface SubmitReviewResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    reviewId: string
  }
}

export interface SpinWheelResponse {
  statusCode: number
  success: boolean
  message: string
  data: SpinResult
}

export type AppStep = "slideshow" | "spin-intro" | "review-form" | "spin-wheel" | "result" | "try-again"
