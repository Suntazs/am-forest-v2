'use client';
import React from 'react';
import { useContactModal } from '../../contexts/ContactModalContext';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';

export default function CTA() {
  const { openContactModal } = useContactModal();

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
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 md:px-12 lg:px-8 py-30">
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
    </section>
  );
}