import React from "react";

export default function GoogleReview() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <iframe
        src="https://www.google.com/maps/embed?pb=!4vXXXXXXXXX!6m8!1m7!...YOUR_PLACE_ID..."
        width="100%"
        height="400"
        style={{
          border: 0,
        }}
        allowfullscreen={}
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
