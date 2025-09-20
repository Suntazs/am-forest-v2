'use client';
import React, { useEffect, useRef } from 'react';
import { useContactModal } from '../../contexts/ContactModalContext';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';

export default function CTA() {
  const { openContactModal } = useContactModal();
  const curveRef = useRef(null);

  useEffect(() => {
    // Animate the curve on mount
    if (curveRef.current) {
      curveRef.current.style.animation = 'drawLine 2.5s cubic-bezier(0.65, 0, 0.35, 1) 0.6s forwards';
    }
  }, []);

  return (
    <section className="relative bg-[#243c36] overflow-hidden h-[600px]">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left side - Image touching the edge */}
        <div className="hidden lg:block lg:w-2/5 relative h-full">
          <div className="absolute inset-0">
            <ProgressiveImage
              src="/image/beautiful-shot-forest-with-sunlight.png"
              alt="Aerial view of forest"
              className="w-full h-full opacity-70"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 md:px-12 lg:px-8 py-30 relative z-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold  text-white leading-tight mb-8">
              Esi gatavs? Saznineis ar mums lai sāktu darboties
            </h2>
            
            <button 
              onClick={openContactModal}
              className="bg-[#dbf6a3] text-[#243c36] px-5 py-3 rounded-full font-semibold text-lg hover:bg-[#c8e885] transition-colors duration-300 shadow-lg">
              Saznineis ar mums
            </button>
          </div>
        </div>

        {/* Mobile image - below content */}
        <div className="lg:hidden w-full h-64 relative">
          <ProgressiveImage
            src="/image/beautiful-shot-forest-with-sunlight.png"
            alt="Aerial view of forest"
            className="w-full h-full opacity-70"
          />
        </div>
      </div>

      {/* Bottom curve - desktop only, behind text */}
      <div className="hidden md:block absolute bottom-0 right-0 z-0">
        <svg
          className="w-[32rem] lg:w-[40rem] h-96 lg:h-[28rem]"
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="white"
            strokeWidth="30"
            strokeOpacity="0.3"
            className="curve-path"
            ref={curveRef}
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes drawLine {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .curve-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
      `}</style>
    </section>
  );
}