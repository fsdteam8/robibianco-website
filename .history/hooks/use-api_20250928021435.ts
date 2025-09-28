import { useMutation } from "@tanstack/react-query"
import type { ReviewData, SubmitReviewResponse, SpinWheelResponse } from "@/types"

const API_BASE_URL = "http://localhost:5001/api/v1/spin-win"

// Submit review mutation
export function useSubmitReview() {
  return useMutation<SubmitReviewResponse, Error, ReviewData>({
    mutationFn: async (reviewData: ReviewData) => {
      const response = await fetch(`${API_BASE_URL}/submit-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to submit review")
      }

      return result
    },
    onError: (error) => {
      console.error("Error submitting review:", error)
    },
  })
}

// Spin wheel mutation
export function useSpinWheel() {
  return useMutation<SpinWheelResponse, Error, string>({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`${API_BASE_URL}/spin-wheel/${reviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to spin wheel")
      }

      return result
    },
    onError: (error) => {
      console.error("Error spinning wheel:", error)
    },
  })
}
