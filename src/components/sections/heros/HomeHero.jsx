"use client";
import React, { useEffect, useRef } from "react";
import { VideoWrapper } from "@/components/ui/AnimationWrapper";
import { usePageTransition } from "@/contexts/PageTransitionContext";
export default function HomeHero() {
  const { animationsEnabled } = usePageTransition();
  const flowerRef = useRef(null);
  const flowerRef2 = useRef(null);

  useEffect(() => {
    // Control flower animation based on transition state
    if (flowerRef.current) {
      if (animationsEnabled) {
        flowerRef.current.style.animation = 'popIn 0.6s ease-out 0.3s both, spin 8s linear 0.9s infinite';
      } else {
        flowerRef.current.style.animation = 'none';
        flowerRef.current.style.opacity = '0';
      }
    }
    if (flowerRef2.current) {
      if (animationsEnabled) {
        flowerRef2.current.style.animation = 'popIn 0.6s ease-out 0.3s both, spin 8s linear 0.9s infinite';
      } else {
        flowerRef2.current.style.animation = 'none';
        flowerRef2.current.style.opacity = '0';
      }
    }
  }, [animationsEnabled]);
  return (
    <section className="relative bg-[#243c36] overflow-hidden">
      {/* Mobile Layout - Vertical */}
      <div className="block lg:hidden pt-20 md:pt-24">
        {/* Text content section */}
        <div className="px-6 md:px-12 py-20 md:py-32">
          <div className="max-w-5xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#dbf6a3] leading-tight">
            AM Forest profesionāla pieeja katram meža īpašniekam, katram hektāram.
            </h1>
          </div>
        </div>

        {/* Bottom section with line and flower - Mobile */}
        <div className="relative">
          <div className="w-full h-px bg-[#c7dccd] mb-6"></div>
            <div className="flex justify-end items-center pb-6 px-6 md:px-12">
            <div className="flex items-center gap-6">
              {/* Vertical line on the left */}
              <div className="w-px h-12 bg-[#c7dccd]"></div>
              
              {/* Flower element */}
              <div className="relative w-12 h-12 md:w-16 md:h-16 group flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="64" 
                  height="64" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className="flower-svg"
                  ref={flowerRef}
                >
                  <g clipPath="url(#a)">
                    <path fill="#faf6ed" d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"></path>
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 24h24V0H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Video section */}
        <div className="relative h-[400px] md:h-[500px]">
          <VideoWrapper 
            src="/video/vid-bg-amforest(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            alt="Aerial view of forest and suburban area"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:flex lg:h-screen">
        {/* Left side - Text content */}
        <div className="flex-[2] flex flex-col justify-center px-20 py-20">
          <div className="max-w-5xl">
            <h1 className="text-7xl font-bold text-[#dbf6a3] leading-tight mb-8">
            AM Forest profesionāla pieeja katram meža īpašniekam, katram hektāram.
            </h1>
          </div>
        </div>

        {/* Vertical separating line */}
        <div className="w-px bg-[#c7dccd]"></div>

        {/* Right side - Video */}
        <div className="flex-1 relative">
          <VideoWrapper 
            src="/video/vid-bg-amforest(1).mp4"
            autoPlay
            loop
            muted
            playsInline
            alt="Aerial view of forest and suburban area"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Horizontal line and flower sign below - Desktop only */}
      <div className="hidden lg:block absolute bottom-0 left-0 right-[30.37%]">
        <div className="h-px bg-[#c7dccd]"></div>
        <div className="flex justify-end items-center py-6 px-8">
          <div className="flex items-center gap-8">
            {/* Vertical line on the left */}
            <div className="w-px h-12 bg-[#c7dccd]"></div>
            
            {/* Bigger centered flower */}
            <div className="relative w-16 h-16 group">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                fill="none" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
                className="flower-svg"
                ref={flowerRef2}
              >
                <g clipPath="url(#a)">
                  <path fill="#faf6ed" d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"></path>
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 24h24V0H0z"></path>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .flower-svg {
          /* Animation controlled by JavaScript */
        }

        .group:hover .flower-svg {
          animation-play-state: paused, paused;
        }
      `}</style>
    </section>
  );
} 