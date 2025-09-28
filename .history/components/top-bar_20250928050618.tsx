"use client"

import { useState } from "react"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import QRCodeModal from "./qr-code-modal"

export default function TopBar() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">Spin & Win</h1>
        </div>

      
      </div>
    </div>
  )
}
