/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query"
import type { ReviewData, SubmitReviewResponse, SpinWheelResponse, RewardsResponse } from "@/types"
import { apiClient } from "@/lib/api-client"

export function useSubmitReview() {
  return useMutation<SubmitReviewResponse, Error, ReviewData>({
    mutationFn: async (reviewData: ReviewData) => {
      try {
        const result = await apiClient.post<SubmitReviewResponse>("/spin-win/submit-review", reviewData)

        if (!result.success) {
          throw new Error(result.message || "Failed to submit review")
        }

        return result
      } catch (error: any) {
        console.error("  Error submitting review:", error)
        throw new Error(error.response?.data?.message || error.message || "Failed to submit review")
      }
    },
    onError: (error) => {
      console.error("Submit review mutation error:", error)
    },
  })
}

export function useSpinWheel() {
  return useMutation<SpinWheelResponse, Error, string>({
    mutationFn: async (reviewId: string) => {
      try {
        const result = await apiClient.patch<SpinWheelResponse>(`/spin-win/spin-wheel/${reviewId}`)

        if (!result.success) {
          throw new Error(result.message || "Failed to spin wheel")
        }

        return result
      } catch (error: any) {
        console.error("  Error spinning wheel:", error)
        throw new Error(error.response?.data?.message || error.message || "Failed to spin wheel")
      }
    },
    onError: (error) => {
      console.error("  Spin wheel mutation error:", error)
    },
  })
}

export function useRewards() {
  return useQuery<RewardsResponse, Error>({
    queryKey: ["rewards"],
    queryFn: async () => {
      try {
        const result = await apiClient.get<RewardsResponse>("/rewards")

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch rewards")
        }

        return result
      } catch (error: any) {
        console.error("  Error fetching rewards:", error)
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch rewards")
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  })
}
