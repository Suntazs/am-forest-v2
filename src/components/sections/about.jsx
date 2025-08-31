"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isInView, setIsInView] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  const [count, setCount] = useState(0);
  const [finalSnap, setFinalSnap] = useState(false);
  const flowerRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (flowerRef.current) {
      observer.observe(flowerRef.current);
    }

    return () => {
      if (flowerRef.current) {
        observer.unobserve(flowerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countStarted) {
          setCountStarted(true);
          // Start counting animation with smooth decimal values
          let startTime = null;
          const duration = 4000; // 4 seconds
          const targetCount = 14;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Smooth ease-out to exactly 14
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentCount = easeOut * targetCount;
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [countStarted]);

  return (
    <> 
    <section className="relative py-16 md:py-24 lg:py-30 bg-[#f3ecda] overflow-hidden">
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-20">
        {/* Left side - 2/3 width on desktop, full width on mobile */}
        <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-700 leading-tight mb-6 md:mb-8">
              <span className="block">Par AM Forest</span>
              <span>
                {/* Animated flower inline */}
                <span ref={flowerRef} className="inline-block mr-3 md:mr-6 group" style={{ verticalAlign: 'baseline', position: 'relative', top: '-0.1em' }}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    aria-hidden="true"
                    className={`inline-block ${isInView ? 'flower-svg' : 'opacity-0'}`}
                    style={{ width: '0.8em', height: '0.8em' }}
                  >
                    <g clipPath="url(#about-flower)">
                      <path fill="#243c36" d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"></path>
                    </g>
                    <defs>
                      <clipPath id="about-flower">
                        <path fill="#fff" d="M0 24h24V0H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Mežsaimniecībā
              </span>
            </h2>
            <p className='text-neutral-700 text-base md:text-lg lg:text-xl'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium officia magnam delectus dolorum doloremque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, officia!
            </p>
          </div>
        </div>
        
        {/* Right side - Counter section */}
        <div className="w-full lg:w-1/3 lg:pl-16 mt-8 lg:mt-0">
          <div ref={countRef} className="lg:sticky lg:top-32">
            <div className="flex items-baseline justify-start">
              {/* First digit */}
              <div className="relative h-32 w-16 md:h-40 md:w-20 lg:h-40 lg:w-20 overflow-hidden">
                <div 
                  className="flex flex-col"
                  style={{
                    transform: `translateY(-${Math.min(count / 10, 1) * 160}px)`,
                  }}
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className="text-8xl md:text-9xl lg:text-9xl font-bold text-[#bc9d6e] h-32 md:h-40 lg:h-40 flex items-center justify-center tabular-nums"
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Second digit */}
              <div className="relative h-32 w-16 md:h-40 md:w-20 lg:h-40 lg:w-20 overflow-hidden -ml-2">
                <div 
                  className="flex flex-col"
                  style={{
                    transform: `translateY(-${(count % 10) * 160}px)`,
                  }}
                >
                  {/* Display 0-9 */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div 
                      key={num}
                      className="text-8xl md:text-9xl lg:text-9xl font-bold text-[#bc9d6e] h-32 md:h-40 lg:h-40 flex items-center justify-center tabular-nums"
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              
              <span className="text-6xl md:text-7xl lg:text-7xl font-bold text-[#bc9d6e] ml-3 md:ml-4 lg:ml-4">
                gadi +
              </span>
            </div>
            <p className="text-4xl md:text-6xl lg:text-6xl font-semibold text-neutral-600 mt-2 text-left">
              Mežsaimniecībā
            </p>
          </div>
        </div>
      </div>
    </section>
    
    {/* Bottom border line */}
    <div className="px-12 lg:px-20 bg-[#f3ecda]">
      <div className="w-full h-px bg-neutral-700"></div>
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
                animation: popIn 0.6s ease-out both, spin 8s linear 0.6s infinite;
              }

              .group:hover .flower-svg {
                animation-play-state: paused, paused;
              }
            `}</style>
    </>
  )
}