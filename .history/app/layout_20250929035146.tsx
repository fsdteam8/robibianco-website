import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { QueryProvider } from "@/lib/query-provider"
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // normal + bold
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // regular, medium, bold
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Spin & Win - Food Review Game",
  description: "Leave a review, spin the wheel, and win amazing prizes!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
