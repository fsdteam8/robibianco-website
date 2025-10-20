"use client";

import { Info, Gift, RotateCcw, Download, QrCode } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/50 text-black hover:bg-white"
        >
          <Info className="h-4 w-4" />
          <span className="hidden md:block">Info</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-white font-body">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Info className="h-5 w-5 text-blue-600" />
            How to Use Spin & Win
          </DialogTitle>
          <DialogDescription>
            Learn how to play and maximize your chances of winning exciting
            rewards!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* How to Play Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-green-600" />
              How to Play
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  1
                </span>
                <p>
                  Tap the orange &#34;Tap to Spin&#34; button to start spinning
                  the wheel
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  2
                </span>
                <p>Watch the wheel spin and wait for it to stop on a segment</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  3
                </span>
                <p>
                  The black pointer at the top indicates your winning segment
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-semibold">
                  4
                </span>
                <p>View your result and claim your prize if you win!</p>
              </div>
            </div>
          </div>

          {/* Prizes Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-600" />
              Available Prizes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="font-medium text-green-800">
                  Discount Rewards
                </div>
                <div className="text-green-600 text-xs mt-1">
                  Get percentage discounts on your orders
                </div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <div className="font-medium text-orange-800">
                  Special Offers
                </div>
                <div className="text-orange-600 text-xs mt-1">
                  Exclusive deals and promotions
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div className="font-medium text-yellow-800">Coupon Codes</div>
                <div className="text-yellow-600 text-xs mt-1">
                  Redeemable discount codes
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="font-medium text-gray-800">Try Again</div>
                <div className="text-gray-600 text-xs mt-1">
                  Better luck next time!
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <QrCode className="h-5 w-5 text-purple-600" />
              QR Code Features
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <Download className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Download QR Codes:</strong> Save your discount QR
                  codes to your device for later use
                </p>
              </div>
              <div className="flex items-start gap-3">
                <QrCode className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Easy Redemption:</strong> Scan the QR code at checkout
                  to apply your discount
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Info className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Plain Text Format:</strong> QR codes contain
                  easy-to-read discount information
                </p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600">💡 Pro Tips</h3>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <ul className="space-y-2 text-sm text-blue-800">
                <li>
                  • Each spin is completely random - every segment has an equal
                  chance
                </li>
                <li>
                  • Save your QR codes immediately after winning to avoid losing
                  them
                </li>
                <li>
                  • The app automatically returns to home after 1 minutes on
                  result screens
                </li>
                <li>• Check the expiration date on your discount codes</li>
                <li>
                  • Share the QR code in the top bar to let others access the
                  game
                </li>
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Need Help?</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">
                If you encounter any issues or have questions about using the
                Spin & Win game, please contact our support team. We&apos;re
                here to help you make the most of your spinning experience!
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
