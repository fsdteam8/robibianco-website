"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  url?: string;
}

export default function QRCodeModal({
  url = "https://robibianco-website.vercel.app/",
}: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url,
        {
          width: 400,
          margin: 2,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        },
        (error) => {
          if (error) {
            console.error("Error generating QR code:", error);
          }
        }
      );
    }
  }, [url]);

  return (
    <div className="flex flex-col items-center gap-4 py-4 font-body">
      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
      <div className="text-center">
        <p className="text-sm text-gray-100 mb-2">
          Scan with your phone camera
        </p>
        <p className="text-xs text-blue-400 break-all">{url}</p>
      </div>
    </div>
  );
}
