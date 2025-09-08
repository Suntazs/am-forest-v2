"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
export default function Services({ showHeader = true, showFullServices = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const gridRef = useRef(null);
  const timeoutRef = useRef(null);
  const animationTimeouts = useRef([]);
  
  const handleMouseEnter = (index) => {
    if (!animationComplete) return; // Don't allow hover until animation is done
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!animationComplete) return; // Don't allow hover until animation is done
    
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
  };


  const getGridPosition = (index) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cols = isMobile ? 2 : 4;
    const totalRows = Math.ceil(services.length / cols);
    const rowHeight = 100 / totalRows;
    
    return {
      left: `${(index % cols) * (100 / cols)}%`,
      top: `${Math.floor(index / cols) * rowHeight}%`,
      width: `${100 / cols}%`,
      height: `${rowHeight}%`,
    };
  };

  const getServiceGridInfo = (index) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cols = isMobile ? 2 : 4;
    const totalRows = Math.ceil(services.length / cols);
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      row,
      col,
      isTopRow: row === 0,
      isBottomRow: row === totalRows - 1,
      isLeftCol: col === 0,
      isRightCol: col === cols - 1,
      cols,
      totalRows
    };
  };

  const baseServices = [
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="35" width="50" height="30" />
          <circle cx="35" cy="70" r="8" />
          <circle cx="65" cy="70" r="8" />
        </svg>
      ),
      title: "Treilera",
      subtitle: "pakalpojumi",
      link: "/services/treilera-pakalpojumi",
      description: "Profesionāli treilera pakalpojumi meža un kokmateriālu transportēšanai.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="40" width="40" height="25" />
          <path d="M25 65 L30 40 L70 40 L75 65" />
          <circle cx="35" cy="70" r="6" />
          <circle cx="65" cy="70" r="6" />
        </svg>
      ),
      title: "Mežizvedēja",
      subtitle: "traktors",
      link: "/services/mezizvedeja-traktora-pakalpojumi",
      description: "Specializēti mežizvedēja traktora pakalpojumi kokmateriālu savākšanai.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="40" width="50" height="20" />
          <circle cx="30" cy="70" r="8" />
          <circle cx="50" cy="70" r="8" />
          <circle cx="70" cy="70" r="8" />
        </svg>
      ),
      title: "Universālā traktora",
      subtitle: "pakalpojumi",
      link: "/services/universala-ritenu-traktora-pakalpojumi",
      description: "9 tonnu universālā riteņu traktora pakalpojumi dažādiem darbiem.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="45" width="40" height="30" />
          <path d="M30 45 L50 30 L70 45" />
          <rect x="25" y="75" width="10" height="15" />
          <rect x="65" y="75" width="10" height="15" />
        </svg>
      ),
      title: "Ķēžu ekskavatora",
      subtitle: "pakalpojumi",
      link: "/services/kezu-ekskavatora-pakalpojumi",
      description: "20 tonnu ķēžu ekskavatora pakalpojumi celmu raušanai un grāvju rakšanai.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="45" width="35" height="25" />
          <path d="M65 60 L80 60 L75 40" />
          <circle cx="35" cy="75" r="5" />
          <circle cx="60" cy="75" r="5" />
        </svg>
      ),
      title: "Kniebēja ekskavatora",
      subtitle: "pakalpojumi",
      link: "/services/kniebeja-ekskavatora-pakalpojumi",
      description: "Kniebēja ekskavatora pakalpojumi precīziem zemes darbiem.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="40" width="35" height="20" />
          <rect x="55" y="35" width="25" height="25" />
          <circle cx="30" cy="70" r="6" />
          <circle cx="45" cy="70" r="6" />
          <circle cx="65" cy="70" r="6" />
        </svg>
      ),
      title: "Kokvedēja",
      subtitle: "pakalpojumi",
      link: "/services/kokvedeja-pakalpojumi",
      description: "Kokvedēja pakalpojumi kokmateriālu transportēšanai lielos apjomos.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="45" width="30" height="15" />
          <rect x="55" y="40" width="25" height="20" />
          <circle cx="35" cy="70" r="5" />
          <circle cx="65" cy="70" r="5" />
          <circle cx="75" cy="70" r="5" />
        </svg>
      ),
      title: "Kokvedēja puspiekabes",
      subtitle: "pakalpojumi", 
      link: "/services/kokvedeja-puspiekabes-pakalpojumi",
      description: "Kokvedēja puspiekabes pakalpojumi garām kravām.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="45" r="20" />
          <path d="M50 65 L35 80 L65 80 Z" />
          <line x1="50" y1="25" x2="50" y2="45" />
        </svg>
      ),
      title: "Malkas skaldītāja",
      subtitle: "pakalpojumi",
      link: "/services/malkas-skalditaja-pakalpojumi",
      description: "Profesionāla malkas skaldīšana ar augstražīgu tehniku.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="40" width="50" height="25" />
          <path d="M25 40 L40 25 L60 25 L75 40" />
          <circle cx="35" cy="70" r="6" />
          <circle cx="65" cy="70" r="6" />
        </svg>
      ),
      title: "Auto servisa",
      subtitle: "pakalpojumi",
      link: "/services/auto-servisa-pakalpojumi",
      description: "Specializēts auto serviss meža tehnikas apkopei un remontam.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="30" width="60" height="50" />
          <path d="M20 30 L50 15 L80 30" />
          <rect x="35" y="50" width="15" height="20" />
          <rect x="55" y="50" width="15" height="20" />
        </svg>
      ),
      title: "Telpu",
      subtitle: "īre",
      link: "/services/telpu-ire",
      description: "Biroja un noliktavu telpu īre ar ērtu piekļuvi.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="25" />
          <line x1="50" y1="25" x2="50" y2="75" />
          <line x1="25" y1="50" x2="75" y2="50" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      ),
      title: "Dastošanas",
      subtitle: "pakalpojumi",  
      link: "/services/dastosanas-pakalpojumi",
      description: "Precīza meža dastošana un uzmērīšana profesionāliem mērķiem.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="25" width="50" height="50" />
          <line x1="35" y1="40" x2="65" y2="40" />
          <line x1="35" y1="50" x2="65" y2="50" />
          <line x1="35" y1="60" x2="55" y2="60" />
        </svg>
      ),
      title: "Meža projekta",
      subtitle: "taksācijas",
      link: "/services/meza-projekta-taksacijas",
      description: "Meža taksācija un projektu izstrāde ilgtspējīgai apsaimniekošanai.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M30 70 L30 30 L40 20 L60 20 L70 30 L70 70" />
          <line x1="30" y1="45" x2="70" y2="45" strokeDasharray="5,5" />
          <line x1="50" y1="30" x2="50" y2="70" strokeDasharray="5,5" />
        </svg>
      ),
      title: "Stigošanas",
      subtitle: "pakalpojumi",
      link: "/services/stigosanas-pakalpojumi",
      description: "Meža stigošana un robežu noteikšana ar precīzu aprīkojumu.",
    },
  ];

  // Show only first 8 services on homepage, all on services page
  const services = showFullServices ? baseServices : baseServices.slice(0, 8);

  // Intersection Observer for triggering overlay animations
  useEffect(() => {
    if (!gridRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);
            
            // Wait a tick to ensure DOM is ready
            setTimeout(() => {
              // Get all overlay elements directly
              const overlays = gridRef.current?.querySelectorAll('[data-overlay-index]');
              console.log('Found overlays:', overlays?.length);
              
              if (overlays && overlays.length > 0) {
                // Create array of overlay elements with their indices
                const overlayArray = Array.from(overlays);
                const shuffled = [...overlayArray].sort(() => Math.random() - 0.5);
                
                console.log('Starting animation for', shuffled.length, 'overlays');
                
                // Animate each overlay with delay
                shuffled.forEach((overlay, order) => {
                  const delay = order * 150; // 150ms between each animation
                  const timeout = setTimeout(() => {
                    console.log(`Hiding overlay ${order + 1}/${shuffled.length}`);
                    overlay.style.opacity = '0';
                    
                    // Check if this is the last overlay
                    if (order === shuffled.length - 1) {
                      // Add extra delay for the fade transition to complete (0.6s from CSS)
                      setTimeout(() => {
                        setAnimationComplete(true);
                        console.log('All animations complete, hover enabled');
                      }, 600);
                    }
                  }, delay);
                  animationTimeouts.current.push(timeout);
                });
              }
            }, 100); // Small delay to ensure DOM is ready
          }
        });
      },
      {
        threshold: 0.05, // Trigger when 5% of the section is visible
        rootMargin: '0px'
      }
    );

    observer.observe(gridRef.current);

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
      // Clear all animation timeouts
      animationTimeouts.current.forEach(timeout => clearTimeout(timeout));
      animationTimeouts.current = [];
    };
  }, [animationStarted]);

  return (
    <section className={`relative ${showHeader ? 'py-16 md:py-24 lg:py-30' : ''} bg-[#faf6ed] overflow-hidden`}>
      <div className="flex flex-col">
        {showHeader && (
          <div className="flex-[2] flex flex-col px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl">

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-700 leading-tight mb-4 md:mb-6 lg:mb-8">
                Mūsu pakalpojumi, piedāvā pilnu mežsaimniecības risinājumu klāstu no plānošanas līdz apsaimniekošanai
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-neutral-700 max-w-3xl leading-relaxed mb-8 md:mb-12 lg:mb-16">
              Nodrošinām individuālu pieeju un augstu kvalitāti visos mežsaimniecības posmos.
              </p>
            </div>
          </div>
        )}
        
        <div className="w-full md:px-12 lg:px-20">
          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-4 relative overflow-hidden"
            onMouseLeave={handleMouseLeave}
          >
            {animationComplete && (
              <div
                className={`absolute pointer-events-none z-0 transition-all ease-out duration-300`}
                style={{
                  ...getGridPosition(hoveredIndex !== null ? hoveredIndex : 0),
                  opacity: hoveredIndex !== null && isHovering ? 1 : 0
                }}
              >
                <div className="w-full h-full bg-[#dbf6a3]" />
              </div>
            )}
            {services.map((service, index) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const cols = isMobile ? 2 : 4;
              const totalRows = Math.ceil(services.length / cols);
              const currentRow = Math.floor(index / cols);
              const currentCol = index % cols;
              const isLastRow = currentRow === totalRows - 1;
              const isLastCol = currentCol === cols - 1;
              
              return (
                <Link 
                  href={service.link || '#'}
                  key={index}
                  className="block"
                >
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    className={`
                      relative flex flex-col items-start justify-center 
                      p-6 md:p-10 lg:p-16 z-10 h-full
                      ${!isLastRow ? 'border-b border-[#243c36]' : ''}
                      ${!isLastCol ? 'border-r border-[#243c36]' : ''}
                      transition-all duration-300 hover:bg-opacity-10
                    `}
                  >
                    <div className="text-[#243c36] mb-3 md:mb-4 lg:mb-6 opacity-70">
                      {service.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-[#243c36] leading-tight">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-[#243c36] leading-tight">
                          {service.subtitle}
                        </h3>
                      )}
                    </div>
                    <span className="mt-3 md:mt-4 lg:mt-6 text-2xl md:text-3xl lg:text-4xl text-[#243c36] opacity-50 hover:rotate-90 transition-transform duration-300 inline-block">
                      +
                    </span>
                    {/* Overlay that starts visible and fades out */}
                    <div 
                      data-overlay-index={index}
                      className="absolute inset-0 bg-[#dbf6a3] pointer-events-none"
                      style={{ 
                        opacity: 1,
                        transition: 'opacity 0.6s ease-out',
                        zIndex: 20
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  )
}