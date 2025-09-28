"use client";

interface SpinIntroProps {
  onStart: () => void;
}

export default function SpinIntro({ onStart }: SpinIntroProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with food image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/home-banner.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Green curved header */}
      <div className="relative z-10">
        <div className="bg-[#48a256] text-white text-center py-8 relative">
          <h1 className="text-4xl md:text-5xl font-bold font-heading">
            Spin & Win
          </h1>
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <svg
              viewBox="0 0 1200 120"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"
                fill="#cdda55"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 px-6 py-16 text-center flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md mx-auto bg-black/70 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight ">
              Leave a Review, Spin the Wheel, Win Prizes!
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Rate us 5-stars and spin our prize wheel for chance to win amazing
              discount!
            </p>
            <button
              onClick={onStart}
              className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
