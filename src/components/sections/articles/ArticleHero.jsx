"use client";
import React, { useEffect, useRef } from 'react';
import { usePageTransition } from '@/contexts/PageTransitionContext';

const ArticleHero = ({ title, subtitle }) => {
  const { animationsEnabled } = usePageTransition();
  const flowerRef1 = useRef(null);
  const curveRef = useRef(null);

  useEffect(() => {
    if (flowerRef1.current) {
      if (animationsEnabled) {
        flowerRef1.current.style.animation = 'popIn 0.6s ease-out 0.3s both, spin 8s linear 0.9s infinite';
      } else {
        flowerRef1.current.style.animation = 'none';
        flowerRef1.current.style.opacity = '0';
      }
    }
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
      <div className="min-h-[500px] lg:min-h-[70vh] flex items-center">
        <div className="px-6 md:px-12 lg:px-20 pt-40 pb-20 md:py-32 lg:py-20 w-full">
          <div className="max-w-5xl">
            <div className="mb-8 md:mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#faf6ed] leading-tight">
                <span className="inline-flex mr-3 align-middle" style={{ verticalAlign: '-0.1em' }}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flower-icon"
                    ref={flowerRef1}
                  >
                    <g clipPath="url(#a)">
                      <path 
                        fill="#dbf6a3" 
                        d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M0 24h24V0H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                {title}
              </h1>
            </div>
            
            {subtitle && (
              <div className="ml-8 md:ml-16 lg:ml-24">
                <p className="text-base md:text-lg lg:text-xl text-[#faf6ed]/80 max-w-3xl leading-relaxed">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden md:block absolute bottom-0 right-0">
        <svg 
          className="w-[28rem] lg:w-[36rem] h-80 lg:h-96" 
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
        }

        .flower-icon {
        }
      `}</style>
    </section>
  );
};

export default ArticleHero;
