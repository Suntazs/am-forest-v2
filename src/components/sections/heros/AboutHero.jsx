"use client";
import React, { useEffect, useRef } from 'react';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import SplitText from '@/components/anim/split-text';

export default function AboutHero() {
  const { animationsEnabled } = usePageTransition();
  const curveRef = useRef(null);

  useEffect(() => {
    // Control animations based on transition state
    if (curveRef.current) {
      if (animationsEnabled) {
        curveRef.current.style.animation = 'drawLine 2.5s cubic-bezier(0.65, 0, 0.35, 1) 0.6s forwards';
      } else {
        curveRef.current.style.animation = 'none';
        curveRef.current.style.strokeDashoffset = '1000';
      }
    }
  }, [animationsEnabled]);
  return (
    <section className="relative bg-[#243c36] overflow-hidden">
      <div className="min-h-[600px] lg:min-h-screen flex items-center">
        <div className="px-6 md:px-12 lg:px-20 pt-40 pb-32 md:py-32 lg:py-20 w-full">
          <div className="max-w-7xl">
          {/* Heading with flower - without SplitText due to inline SVGs */}
          <div className="mb-12 md:mb-16">
            <SplitText
              text="Expertise that inspires confidence and security at every step"
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#faf6ed] leading-tight max-w-5xl"
              delay={50}
              duration={1.2}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="start"
              tag="h1"
            />
          </div>
          
          {/* Description with offset */}
          <div className="ml-12 md:ml-32 lg:ml-48">
            <SplitText
              text="Thanks to the dedication and expertise of our team at AM Forest, we continue to grow and inspire confidence. Each member plays a key role in the success of your forestry projects, combining rigor with a human approach to sustainable forest management."
              className="text-lg md:text-xl lg:text-2xl text-[#faf6ed]/80 max-w-4xl leading-relaxed"
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
      
      {/* Bottom curve - desktop only */}
      <div className="hidden md:block absolute bottom-0 right-0">
        <svg 
          className="w-[32rem] lg:w-[40rem] h-96 lg:h-[28rem]" 
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="#dbf6a3"
            strokeWidth="30"
            className="curve-path"
            ref={curveRef}
          />
        </svg>
      </div>
    </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

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
          /* Animation controlled by JavaScript */
        }

        .flower-icon {
          /* Animation controlled by JavaScript */
        }

        .flower-icon-alt {
          /* Animation controlled by JavaScript */
        }
      `}</style>
    </section>
  );
}