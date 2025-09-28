/** @type {import('next').NextConfig} */
const nextConfig = {content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
    images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com"
    ],
  },
};

export default nextConfig;
