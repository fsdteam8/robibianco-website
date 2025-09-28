import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { QueryProvider } from "@/lib/query-client"

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
