import React from 'react'

export default function Component() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <svg
        width="100"
        height="100"
        viewBox="0 0 76 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-vercel-logo"
      >
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white" />
      </svg>
      <style jsx>{`
        @keyframes vercel-logo-animation {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-vercel-logo {
          animation: vercel-logo-animation 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
