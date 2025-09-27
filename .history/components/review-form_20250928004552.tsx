"use client"

import type React from "react"

import { useState } from "react"
import type { ReviewData } from "@/types"
import StarRating from "./star-rating"

interface ReviewFormProps {
  onSubmit: (data: ReviewData) => void
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [formData, setFormData] = useState<ReviewData>({
    name: "",
    email: "",
    phone: "",
    rating: 0,
    review: "",
  })

  const [errors, setErrors] = useState<Partial<ReviewData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<ReviewData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (formData.rating === 0) {
      newErrors.rating = 1 // Using 1 as error indicator for rating
    }

    if (!formData.review.trim()) {
      newErrors.review = "Review is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const handleInputChange = (field: keyof ReviewData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with food image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/robibianco__Client_file_.png-zxylAMIW13Vqf4QVVUPOMesSYmZq4s.jpeg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Green curved header */}
      <div className="relative z-10">
        <div className="bg-[#48a256] text-white text-center py-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold">Spin & Win</h1>
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <svg viewBox="0 0 1200 120" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="#cdda55" />
            </svg>
          </div>
        </div>

        {/* Form Content */}
        <div className="relative z-20 px-4 py-8">
          <div className="max-w-2xl mx-auto bg-black/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Leave a Review, Spin the Wheel, Win Prizes!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">User Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter the name"
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-colors ${
                      errors.name ? "border-red-500" : "border-white/20"
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="name@gmail.com"
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-colors ${
                      errors.email ? "border-red-500" : "border-white/20"
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Phone and Rating Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+088"
                    className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-colors ${
                      errors.phone ? "border-red-500" : "border-white/20"
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ratings</label>
                  <div
                    className={`p-3 rounded-lg bg-white/10 border backdrop-blur-sm ${
                      errors.rating ? "border-red-500" : "border-white/20"
                    }`}
                  >
                    <StarRating
                      rating={formData.rating}
                      onRatingChange={(rating) => handleInputChange("rating", rating)}
                    />
                  </div>
                  {errors.rating && <p className="text-red-400 text-sm mt-1">Please select a rating</p>}
                </div>
              </div>

              {/* Review */}
              <div>
                <label className="block text-sm font-medium mb-2">Review</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => handleInputChange("review", e.target.value)}
                  placeholder="Delicious meals with excellent service. A perfect place for family and..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#f97316] transition-colors resize-none ${
                    errors.review ? "border-red-500" : "border-white/20"
                  }`}
                />
                {errors.review && <p className="text-red-400 text-sm mt-1">{errors.review}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-[#f97316]/50 text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Continue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
