import React from "react";

export default function GoogleReview() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <a
        href="https://search.google.com/local/writereview?placeid=AIzaSyA0ZFzzWU5APckWdn5lv6DjF52HXJXn_Bc"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Leave a Google Review
      </a>
    </div>
  );
}
