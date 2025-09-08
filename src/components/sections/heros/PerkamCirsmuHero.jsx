"use client";
import React from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { VideoWrapper } from '@/components/ui/AnimationWrapper';

export default function PerkamCirsmuHero() {
  const { openContactModal } = useContactModal();

  return (
    <section className="relative flex h-[700px] pt-20 ">
      {/* Left side - Video touching edge */}
      <div className="w-full lg:w-1/2 relative h-full">
        <VideoWrapper
          src="/video/vid-bg-amforest(1).mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Content */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="px-6 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-700 leading-tight mb-8">
              Pērkam Cirsmu
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
              Piedāvājam izdevīgus nosacījumus cirsmu iegādei. Mūsu eksperti profesionāli novērtē kokmateriālu kvalitāti un apjomu, nodrošinot taisnīgu cenu. Veicam cirsmu izstrādi ar modernu tehniku, ievērojot visas vides prasības.
            </p>
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden absolute inset-0 flex flex-col">
        {/* Video background */}
        <div className="absolute inset-0">
          <VideoWrapper
            src="/video/vid-bg-amforest(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center h-full px-6 md:px-12">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#dbf6a3] leading-tight mb-6 text-center">
              Pērkam Cirsmu
            </h1>
            <p className="text-base md:text-lg text-[#faf6ed]/90 leading-relaxed mb-4 text-center">
              Piedāvājam izdevīgus nosacījumus cirsmu iegādei. Profesionāli novērtējam kokmateriālu kvalitāti un apjomu, nodrošinot taisnīgu cenu.
            </p>
            <p className="text-base md:text-lg text-[#faf6ed]/90 leading-relaxed mb-8 text-center">
              Ātra samaksa un kvalitatīva cirsmu izstrāde ar modernu tehniku.
            </p>
            <button 
              onClick={openContactModal}
              className="bg-[#dbf6a3] text-[#243c36] px-6 py-3 rounded-full font-semibold text-base hover:bg-[#c8e885] transition-colors duration-300 shadow-lg"
            >
              Saņemt piedāvājumu
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}