export interface ReviewData {
  name: string
  email: string
  phone: string
  rating: number
  review: string
}

export interface SpinResult {
  prize: string
  code: string
  discount?: number
}

export type AppStep = "slideshow" | "spin-intro" | "review-form" | "spin-wheel" | "result" | "try-again"
