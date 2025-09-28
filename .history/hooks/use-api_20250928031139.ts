import { useMutation, useQuery } from "@tanstack/react-query"
import type { ReviewData, SubmitReviewResponse, SpinWheelResponse, RewardsResponse } from "@/types"

const API_BASE_URL = "http://localhost:5001/api/v1/spin-win"
const REWARDS_API_URL = "http://localhost:5001/api/v1/rewards"

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

// Rewards query hook for fetching dynamic wheel segments
export function useRewards() {
  return useQuery<RewardsResponse, Error>({
    queryKey: ["rewards"],
    queryFn: async () => {
      const response = await fetch(REWARDS_API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch rewards")
      }

      return result
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}
