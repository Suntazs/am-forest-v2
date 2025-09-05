"use client";
import React from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { VideoWrapper } from '@/components/ui/AnimationWrapper';
import SplitText from '@/components/anim/split-text';

export default function PerkamMezuHero() {
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
            <SplitText
              text="Pērkam Mežu"
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#243c36] leading-tight mb-8"
              delay={50}
              duration={1}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="start"
              tag="h1"
            />
            <SplitText
              text="Mēs esam uzticams partneris meža īpašumu iegādē. Piedāvājam godīgas cenas, ātru darījumu norisi un profesionālu konsultāciju. Mūsu pieredzējušie eksperti nodrošina caurskatāmu procesu no sākotnējās apsekošanas līdz darījuma noslēgšanai."
              className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="start"
              tag="p"
            />
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
            <SplitText
              text="Pērkam Mežu"
              className="text-4xl md:text-5xl font-bold text-[#dbf6a3] leading-tight mb-6"
              delay={40}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="h1"
            />
            <SplitText
              text="Mēs esam uzticams partneris meža īpašumu iegādē. Piedāvājam godīgas cenas, ātru darījumu norisi un profesionālu konsultāciju."
              className="text-base md:text-lg text-[#faf6ed]/90 leading-relaxed mb-4"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="p"
            />
            <SplitText
              text="Garantējam konfidencialitāti un individuālu pieeju katram klientam."
              className="text-base md:text-lg text-[#faf6ed]/90 leading-relaxed mb-8"
              delay={30}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              tag="p"
            />
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