"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useMouseFollower } from '@/contexts/MouseFollowerContext';

const BuyingProcess = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredLinkIndex, setHoveredLinkIndex] = useState(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [linkHeight, setLinkHeight] = useState(80);
  const linksRef = useRef(null);
  const linkRefs = useRef([]);
  const { showFollower, hideFollower } = useMouseFollower();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) {
        setHoveredIndex(null);
      }
    }, 300);
  };

  // Check if mobile and get link height
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Get actual link height when refs are available
      if (linkRefs.current[0]) {
        const height = linkRefs.current[0].getBoundingClientRect().height;
        setLinkHeight(height);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initial height check after render
    setTimeout(checkMobile, 100);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll for mobile
  useEffect(() => {
    if (!isMobile || !linksRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const linksElement = linksRef.current;
      const rect = linksElement.getBoundingClientRect();
      const linksTop = rect.top + scrollY;
      const linksHeight = rect.height;
      
      // Check if links section is in view
      if (scrollY + windowHeight > linksTop && scrollY < linksTop + linksHeight) {
        // Calculate which third of the viewport we're in
        const viewportPosition = (scrollY + windowHeight - linksTop) / windowHeight;
        
        let activeIndex = null;
        if (viewportPosition < 0.4) {
          activeIndex = 0; // Bottom third - first link
        } else if (viewportPosition < 0.7) {
          activeIndex = 1; // Middle third - second link
        } else {
          activeIndex = 2; // Top third - third link
        }
        
        if (activeIndex !== mobileActiveIndex) {
          setMobileActiveIndex(activeIndex);
          
          // Show follower for mobile
          if (activeIndex !== null && relatedServices[activeIndex]) {
            const service = relatedServices[activeIndex];
            const content = (
              <div className="w-48 h-32 overflow-hidden shadow-lg">
                <img 
                  src={service.media}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            );
            
            // Position based on which section
            const mobileFollowerEl = document.createElement('div');
            mobileFollowerEl.className = 'fixed z-50 pointer-events-none transition-all duration-300';
            
            if (activeIndex === 0) {
              // First link - show below and to the left
              mobileFollowerEl.style.bottom = '20%';
              mobileFollowerEl.style.left = '10%';
            } else if (activeIndex === 1) {
              // Middle link - show below center
              mobileFollowerEl.style.bottom = '15%';
              mobileFollowerEl.style.left = '50%';
              mobileFollowerEl.style.transform = 'translateX(-50%)';
            } else {
              // Last link - show below and to the right
              mobileFollowerEl.style.bottom = '20%';
              mobileFollowerEl.style.right = '10%';
            }
            
            // Note: We'll handle this differently with a state-based approach
          }
        }
      } else {
        setMobileActiveIndex(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, mobileActiveIndex]);

  const relatedServices = [
    {
      title: "Meža inventarizācija",
      href: "/services/forest-inventory",
      ariaLabel: "Meža inventarizācijas pakalpojumi",
      media: "/image/beautiful-shot-forest-with-sunlight.png",
      mediaType: "image" // Can be "image" or "video"
    },
    {
      title: "Taksācijas pakalpojumi",
      href: "/services/taxation",
      ariaLabel: "Meža taksācijas un vērtēšanas pakalpojumi",
      media: "/image/beautiful-shot-forest-with-sunlight.png",
      mediaType: "image"
    },
    {
      title: "Juridiskās konsultācijas",
      href: "/services/legal-consulting",
      ariaLabel: "Juridiskās konsultācijas meža īpašumu jautājumos",
      media: "/image/beautiful-shot-forest-with-sunlight.png",
      mediaType: "image"
    }
  ];

  const forestStates = [
    {
      title: "Izstrādātus meža īpašumus",
      description: "Pilnībā apstrādāti un gatavi tālākai attīstībai",
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="30" />
          <path d="M35 50 L45 60 L65 40" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Daļēji izstrādātus meža īpašumus",
      description: "Ar iesāktiem darbiem un potenciālu turpināšanai",
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="30" />
          <path d="M50 20 L50 50 L65 65" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Neizstrādātus meža īpašumus",
      description: "Dabīgi meži ar pilnu attīstības potenciālu",
      icon: (
        <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      )
    }
  ];

  return (
    <>
      <section className="bg-[#faf6ed] py-16 md:py-24 lg:py-30">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight max-w-7xl mb-8 md:mb-12 lg:mb-16 px-6 md:px-12 lg:px-20">
          AM forest. Pērkam meža īpašumus visos stāvokļos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 relative md:mx-12 lg:mx-20">
          {hoveredIndex !== null && !isMobile && (
            <div
              className={`absolute pointer-events-none z-0 transition-all ease-out ${
                isHovering ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
              }`}
              style={{
                left: `${(hoveredIndex % 3) * 33.333}%`,
                top: `${Math.floor(hoveredIndex / 3) * 100}%`,
                width: '33.333%',
                height: '100%',
              }}
            >
              <div className="w-full h-full bg-[#dbf6a3]" />
            </div>
          )}
          
          {forestStates.map((state, index) => {
            const totalItems = forestStates.length;
            const isLastRow = index >= totalItems - (totalItems % 3 || 3);
            const isLastCol = (index + 1) % 3 === 0;
            const isRightmostInGrid = isLastCol || index === totalItems - 1;
            
            return (
              <article
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`
                  relative flex flex-col items-start justify-start 
                  z-10
                  border-b border-[#243c36]
                  ${!isLastCol ? 'md:border-r md:border-[#243c36]' : ''}
                  transition-all duration-300
                  ${isMobile && hoveredIndex === index ? 'bg-[#dbf6a3]' : ''}
                `}
              >
                <div className="p-8 md:p-10 lg:p-12 w-full">
                  <div className="text-[#243c36] mb-6 opacity-70" aria-hidden="true">
                    {state.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#243c36] mb-4 leading-tight">
                    {state.title}
                  </h3>
                  <p className="text-base md:text-lg text-[#243c36] opacity-80 leading-relaxed">
                    {state.description}
                  </p>
                  <button 
                    className="mt-6 text-3xl md:text-4xl text-[#243c36] opacity-50 hover:rotate-90 transition-transform duration-300 cursor-pointer"
                    aria-label="Papildu informācija"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </article>
            );
          })}
        </div>


        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-700 my-8 md:my-12 px-6 md:px-12 lg:px-20">
          Saistītie pakalpojumi kas var palīdzēt jūsu mežam
        </h3>

        {/* Services Links */}
        <div className="relative md:px-12 lg:px-20">
          <div ref={linksRef} className="border-t border-b border-neutral-300" role="list" aria-label="Saistītie pakalpojumi">
            {relatedServices.map((service, index) => (
            <div key={index} role="listitem" ref={el => linkRefs.current[index] = el}>
              <Link href={service.href} aria-label={service.ariaLabel}>
                <div 
                  className="relative group cursor-pointer overflow-hidden"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setHoveredLinkIndex(index);
                      const content = service.mediaType === 'video' ? (
                        <div className="w-80 h-52 overflow-hidden rounded-lg shadow-xl">
                          <video 
                            src={service.media}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                          />
                        </div>
                      ) : (
                        <div className="w-80 h-52 overflow-hidden rounded-lg shadow-xl">
                          <img 
                            src={service.media}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                      showFollower(content);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setHoveredLinkIndex(null);
                      hideFollower();
                    }
                  }}
                >
                  {/* Hover background effect - reveals from bottom to top */}
                  <div 
                    className="absolute inset-0 bg-[#243c36] transform transition-transform duration-500 ease-out"
                    style={{
                      transform: (isMobile ? mobileActiveIndex === index : hoveredLinkIndex === index) ? 'translateY(0%)' : 'translateY(100%)'
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between px-6 md:px-6 py-6 md:py-8">
                    <div className="flex-1">
                      <h4 className={`text-xl md:text-2xl lg:text-3xl font-semibold transition-colors duration-300 ${
                        (isMobile ? mobileActiveIndex === index : hoveredLinkIndex === index) ? 'text-white' : 'text-neutral-700'
                      }`}>
                        {service.title}
                      </h4>
                    </div>
                    
                    {/* Arrow */}
                    <div className={`ml-8 transition-all duration-300 transform ${
                      (isMobile ? mobileActiveIndex === index : hoveredLinkIndex === index) ? 'translate-x-2' : 'translate-x-0'
                    }`}>
                      <svg 
                        className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                          (isMobile ? mobileActiveIndex === index : hoveredLinkIndex === index) ? 'text-white' : 'text-neutral-700'
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
                </div>
              </Link>
              
              {/* Divider line */}
              {index < relatedServices.length - 1 && (
                <hr className="border-neutral-300" />
              )}
            </div>
          ))}
          </div>
          
          {/* Mobile Image Display - Smoothly moves below active link */}
          {isMobile && (
            <div 
              className={`md:hidden absolute pointer-events-none transition-all duration-700 ease-in-out ${
                mobileActiveIndex === null ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                top: mobileActiveIndex !== null ? `${(mobileActiveIndex + 1) * linkHeight + 10}px` : '0px',
                left: '50%',
                transform: mobileActiveIndex === 0 ? 'translateX(-50%) translateX(-80px)' :
                          mobileActiveIndex === 1 ? 'translateX(-50%)' :
                          mobileActiveIndex === 2 ? 'translateX(-50%) translateX(80px)' : 
                          'translateX(-50%)',
                zIndex: 10
              }}
            >
              <div className="w-60 h-36 overflow-hidden shadow-2xl">
                {mobileActiveIndex !== null && (
                  <img 
                    src={relatedServices[mobileActiveIndex]?.media}
                    alt=""
                    className="w-full h-full object-cover"
                    key={mobileActiveIndex} // Force re-render for smooth image change
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BuyingProcess;