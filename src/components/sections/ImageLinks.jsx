"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ImageLinks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animatedLinks, setAnimatedLinks] = useState([]); // Track which links have been animated
  const mobileLineRef = useRef(null);
  const desktopLineRef = useRef(null);
  const linksContainerRef = useRef(null);
  const animationTimeouts = useRef([]);

  const links = [
    {
      title: "Kapēc jauzkopj mežs?",
      href: "/services/forest-management",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Kā pārdot mežu?",
      href: "/services/timber-trade",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Kad ir īstais laiks cirst mežu?",
      href: "/services/consulting",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Kas jāzina pirms meža izciršanas?",
      href: "/services/reforestation",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    }
  ];

  const currentImage = hoveredIndex !== null ? links[hoveredIndex].image : "/image/beautiful-shot-forest-with-sunlight.png";

  // Intersection Observer for triggering overlay animations on links
  useEffect(() => {
    if (!linksContainerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);
            
            // Wait a tick to ensure DOM is ready
            setTimeout(() => {
              // Get all overlay elements in order (top to bottom)
              const overlays = linksContainerRef.current?.querySelectorAll('[data-link-overlay]');
              
              if (overlays && overlays.length > 0) {
                // Animate each overlay in order from top to bottom
                overlays.forEach((overlay, index) => {
                  const delay = index * 200; // 200ms between each animation
                  const timeout = setTimeout(() => {
                    overlay.style.transform = 'translateY(100%)';
                    
                    // Mark this link as animated after transition completes
                    setTimeout(() => {
                      setAnimatedLinks(prev => [...prev, index]);
                    }, 500); // Match the transition duration
                  }, delay);
                  animationTimeouts.current.push(timeout);
                });
              }
            }, 100); // Small delay to ensure DOM is ready
          }
        });
      },
      {
        threshold: 0.0, // Trigger when even 20px is visible
        rootMargin: '-20px 0px 0px 0px' // Start when 20px of container is visible
      }
    );

    observer.observe(linksContainerRef.current);

    return () => {
      if (linksContainerRef.current) {
        observer.unobserve(linksContainerRef.current);
      }
      // Clear all animation timeouts
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current = [];
    };
  }, [animationStarted]);

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

    const mobileElement = mobileLineRef.current;
    const desktopElement = desktopLineRef.current;
    
    if (mobileElement) {
      observer.observe(mobileElement);
    }
    if (desktopElement) {
      observer.observe(desktopElement);
    }

    return () => {
      if (mobileElement) {
        observer.unobserve(mobileElement);
      }
      if (desktopElement) {
        observer.unobserve(desktopElement);
      }
    };
  }, []);

  return (
    <section className="relative py-16 md:py-24 lg:py-30 bg-[#faf6ed] overflow-visible">
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-20 items-end relative">
        {/* Left side - Image */}
        <div className="w-full lg:w-5/12 mb-4 lg:mb-0 lg:pr-12">
          <div className="relative h-[400px] lg:h-[700px] overflow-hidden">
            <img 
              src={currentImage}
              alt="Forest"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out transform"
              style={{
                transform: hoveredIndex !== null ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          </div>
        </div>

        {/* Wavy line separator - mobile only */}
        <div ref={mobileLineRef} className="lg:hidden -mx-6 my-4" style={{ width: 'calc(100% + 3rem)' }}>
          <div className="relative w-full">
              <svg className="w-full" height="80" viewBox="0 0 1000 80" preserveAspectRatio="none">
                <defs>
                  <mask id="waveMaskMobile">
                    <rect x={isInView ? "0" : "1000"} y="0" width="1000" height="80" fill="white">
                      {isInView && (
                        <animate 
                          attributeName="x" 
                          from="1000" 
                          to="0" 
                          dur="2s" 
                          fill="freeze"
                          begin="0s"
                        />
                      )}
                    </rect>
                  </mask>
                </defs>
                <path 
                  d="M 0,15
                     L 100,15
                     C 150,15 150,5 200,5
                     C 250,5 250,25 300,25
                     C 350,25 350,5 400,5
                     C 450,5 450,25 500,25
                     C 550,25 550,5 600,5
                     C 650,5 650,25 700,25
                     C 750,25 750,5 800,5
                     C 850,5 850,15 900,15
                     L 1000,15
                     L 1000,65
                     L 900,65
                     C 850,65 850,55 800,55
                     C 750,55 750,75 700,75
                     C 650,75 650,55 600,55
                     C 550,55 550,75 500,75
                     C 450,75 450,55 400,55
                     C 350,55 350,75 300,75
                     C 250,75 250,55 200,55
                     C 150,55 150,65 100,65
                     L 0,65
                     Z" 
                  fill="#243c36"
                  mask="url(#waveMaskMobile)"
                />
              </svg>
          </div>
        </div>

        {/* Right side - Links */}
        <div className="w-full lg:w-7/12 relative">
          {/* Top line above links - desktop only */}
          <div ref={desktopLineRef} className="hidden lg:block absolute -left-12 -right-20" style={{ 
              width: 'calc(100% + 8rem)', 
              top: '-280px',
              transform: 'translateY(50%)'
            }}>
            <svg className="w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
              <defs>
                <mask id="waveMask">
                  <rect x={isInView ? "0" : "1000"} y="0" width="1000" height="120" fill="white">
                    {isInView && (
                      <animate 
                        attributeName="x" 
                        from="1000" 
                        to="0" 
                        dur="3s" 
                        fill="freeze"
                        begin="0s"
                      />
                    )}
                  </rect>
                </mask>
              </defs>
              <path 
                d="M 0,20
                   L 70,20
                   C 120,20 120,0 170,0
                   C 220,0 220,40 270,40
                   C 320,40 320,0 370,0
                   C 420,0 420,40 470,40
                   C 520,40 520,0 570,0
                   C 620,0 620,40 670,40
                   C 720,40 720,0 770,0
                   C 820,0 820,20 870,20
                   L 930,20
                   L 1000,20
                   L 1000,100
                   L 930,100
                   L 870,100
                   C 820,100 820,80 770,80
                   C 720,80 720,120 670,120
                   C 620,120 620,80 570,80
                   C 520,80 520,120 470,120
                   C 420,120 420,80 370,80
                   C 320,80 320,120 270,120
                   C 220,120 220,80 170,80
                   C 120,80 120,100 70,100
                   L 0,100
                   Z" 
                fill="#243c36"
                mask="url(#waveMask)"
              />
            </svg>
          </div>
          <div ref={linksContainerRef} className="border-t lg:border-t-0 border-b border-neutral-300 -mx-6 md:mx-0">
            {links.map((link, index) => (
              <div key={index}>
                <Link href={link.href}>
                  <div 
                    className="relative group cursor-pointer overflow-hidden"
                    onMouseEnter={() => {
                      // Only allow hover if this link's overlay has been animated
                      if (animatedLinks.includes(index)) {
                        setHoveredIndex(index);
                      }
                    }}
                    onMouseLeave={() => {
                      if (animatedLinks.includes(index)) {
                        setHoveredIndex(null);
                      }
                    }}
                  >
                    {/* Hover background effect - reveals from bottom to top */}
                    <div 
                      className="absolute inset-0 bg-[#243c36] transform transition-transform duration-500 ease-out"
                      style={{
                        transform: hoveredIndex === index ? 'translateY(0%)' : 'translateY(100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-between px-6 md:px-6 lg:px-6 py-5">
                      <div className="flex-1">
                        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                          hoveredIndex === index ? 'text-white' : 'text-neutral-700'
                        }`}>
                          {link.title}
                        </h3>
                      </div>
                      
                      {/* Arrow */}
                      <div className={`ml-8 transition-all duration-300 transform ${
                        hoveredIndex === index ? 'translate-x-2' : 'translate-x-0'
                      }`}>
                        <svg 
                          className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                            hoveredIndex === index ? 'text-white' : 'text-neutral-700'
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Initial overlay that covers the text - slides down like unhover */}
                    <div 
                      data-link-overlay={index}
                      className="absolute inset-0 bg-[#243c36] pointer-events-none z-20"
                      style={{
                        transform: 'translateY(0%)',
                        transition: 'transform 500ms ease-out'
                      }}
                    />
                  </div>
                </Link>
                
                {/* Divider line */}
                {index < links.length - 1 && (
                  <hr className="border-neutral-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}