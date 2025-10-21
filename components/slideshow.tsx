"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import QRCodeModal from "./qr-code-modal";

interface SlideshowProps {
  onSlideClick: () => void;
}

const slides = [
  {
    id: 1,
    image: "/l1.png",
    title: "Spin the wheel and grab a prize from our bar or kitchen!",
  },
  {
    id: 2,
    image: "/l2.png",
    title: "Griez ratu un laimē balvu no mūsu bāra vai virtuves!",
  },
  {
    id: 3,
    image: "/l3.png",
    title: "Крути колесо и получай приз из нашего бара или кухни!",
  },
];

export default function Slideshow({ onSlideClick }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const skipTimer = setTimeout(() => {
  //     setShowSkipButton(true);
  //   }, 4000);

  //   return () => clearTimeout(skipTimer);
  // }, []);

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
          className={`absolute inset-0 transition-opacity duration-1000  ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full ">
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              quality={100}
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute  inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-white">
              <div className="flex flex-col items-center justify-center space-y-10">
                <div className="flex items-stretch justify-center space-x-5">
                  <div className="hidden lg:block">
                    <QRCodeModal />
                  </div>
                  <div className="">
                    <Button
                      onClick={handleSkipClick}
                      className="bg-[#f97316] h-full aspect-square hover:bg-[#ea580c] text-white px-6 py-3 text-xl font-bold shadow-lg"
                    >
                      Skip to Spin & Win
                    </Button>
                  </div>
                </div>
                <div className="text-center lg:px-12 md:px-6 px-1">
                  <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold mb-4 leading-tight font-heading text-center">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
