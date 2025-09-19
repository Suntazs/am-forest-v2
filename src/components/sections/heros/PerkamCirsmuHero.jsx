"use client";
import React from "react";
import { ProgressiveVideo } from "@/components/ui/ProgressiveMedia";
import { useContactModal } from '@/contexts/ContactModalContext';

export default function PerkamCirsmuHero() {
  const { openContactModal } = useContactModal();

  return (
    <section className="relative overflow-hidden">
      {/* Mobile Layout */}
      <div className="block lg:hidden pt-20 md:pt-24">
        {/* Video section */}
        <div className="relative h-[400px] md:h-[500px]">
          <ProgressiveVideo
            src="/video/vid-bg-amforest(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="max-w-2xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Pērkam Cirsmu
              </h1>
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
                Piedāvājam izdevīgus nosacījumus cirsmu iegādei. Profesionāli novērtējam kokmateriālu kvalitāti un apjomu, nodrošinot taisnīgu cenu.
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
      </div>

      {/* Desktop Layout - Original Design */}
      <div className="hidden lg:flex h-[700px] pt-20">
        {/* Left side - Video touching edge */}
        <div className="w-1/2 relative h-full">
          <ProgressiveVideo
            src="/video/vid-bg-amforest(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Right side - Content */}
        <div className="w-1/2 flex items-center justify-center bg-[#faf6ed]">
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
      </div>
    </section>
  );
}