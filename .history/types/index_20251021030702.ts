export interface ReviewData {
  fullName: string
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
  spinDetails?: {
    spinResult: string
    uniqueCode: string
    ipAddress: string
    deviceInfo: {
      userAgent: string
    }
    fingerprint: string
    _id: string
    createdAt: string
    updatedAt: string
  }
  qrCode?: string
  redeemLink?: string
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

export interface Reward {
  _id: string
  rewardName: string
  description: string
  couponCode: string
  stockLimit: number
  stock: number
  expiryDays: number
  isTryAgain: boolean
  requiresReview: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface RewardsResponse {
  statusCode: number
  success: boolean
  message: string
  data: {
    rewards: Reward[]
    page: number
    limit: number
    totalRewards: number
    totalPages: number
  }
}

export interface WheelSegment {
  label: string
  color: string
  angle: number
  reward: Reward
}

export type AppStep = "slideshow" | "spin-intro" | "review-form" | "spin-wheel" | "result" | "try-again"
