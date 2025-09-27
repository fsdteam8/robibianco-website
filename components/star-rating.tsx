"use client"

import { useState } from "react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
  readonly?: boolean
}

export default function StarRating({ rating, onRatingChange, readonly = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const handleStarClick = (starRating: number) => {
    if (!readonly) {
      onRatingChange(starRating)
    }
  }

  const handleStarHover = (starRating: number) => {
    if (!readonly) {
      setHoverRating(starRating)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex space-x-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl transition-colors duration-150 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          }`}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          disabled={readonly}
        >
          <span className={`${star <= (hoverRating || rating) ? "text-[#f97316]" : "text-gray-300"}`}>★</span>
        </button>
      ))}
    </div>
  )
}
