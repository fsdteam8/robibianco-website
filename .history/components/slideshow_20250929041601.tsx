"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SlideshowProps {
  onSlideClick: () => void;
}

const slides = [
  {
    id: 1,
    image: "/home-banner.jpg",
    title: "Get daily Calorie everything you eat",
    subtitle:
      "We are uploading our food database every minute to help you track your calories",
    highlightWord: "Calorie",
  },
  {
    id: 2,
    image: "/home-banner2.jpg",
    title: "Get daily Calorie everything you eat",
    subtitle:
      "We are uploading our food database every minute to help you track your calories",
    highlightWord: "Calorie",
  },
  {
    id: 3,
    image: "/home-banner3.jpg",
    title: "Get daily Calorie everything you eat",
    subtitle:
      "We are uploading our food database every minute to help you track your calories",
    highlightWord: "Calorie",
  },
];

export default function Slideshow({ onSlideClick }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const skipTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 4000);

    return () => clearTimeout(skipTimer);
  }, []);

  const handleSlideClick = () => {
    onSlideClick();
  };

  const handleSkipClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the slide click
    onSlideClick();
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden cursor-pointer"
      onClick={handleSlideClick}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl md:text-8xl font-bold mb-4 leading-tight">
                Get daily{" "}
                <span className="text-[#a2e62e] font-heading">
                  {slide.highlightWord}
                </span>
                <br />
                everything you eat
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {showSkipButton && (
        <div className="absolute top-6 right-6 z-10">
          <Button
            onClick={handleSkipClick}
            className="bg-[#f97316]  hover:bg-[#ea580c] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Skip to Spin & Win
          </Button>
        </div>
      )}

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-6 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-white " : "bg-white/50 "
            }`}
          />
        ))}
      </div>
    </div>
  );
}
