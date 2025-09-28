import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },export default config;
 theme: {
    extend: {
     
    },
  },
    images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com"
    ],
  },
    },
  },
  plugins: [],
};
export default config;
