"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  url?: string;
}

export default function QRCodeModal({
  url = process.env.NEXT_PUBLIC_SITE_URL,
}: QRCodeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        url ?? "",
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
    <div className="flex flex-col items-center font-body">
      <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
    </div>
  );
}
