"use client";
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
export default function Services({ showHeader = true, showFullServices = false }) {
  const { t } = useTranslation('common');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [popupService, setPopupService] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const timeoutRef = useRef(null);
  const animationTimeouts = useRef([]);

  // Handle window resize and initial mount
  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update hover box position based on actual card dimensions
  useEffect(() => {
    if (hoveredIndex === null || !gridRef.current || !cardRefs.current[hoveredIndex]) return;
    
    const card = cardRefs.current[hoveredIndex];
    const grid = gridRef.current;
    if (!card || !grid) return;
    
    let animationId;
    let frameCount = 0;
    const maxFrames = 30; // Run for ~500ms at 60fps
    
    const updateHoverPosition = () => {
      const cardRect = card.getBoundingClientRect();
      const gridRect = grid.getBoundingClientRect();
      
      setHoverStyle({
        left: cardRect.left - gridRect.left,
        top: cardRect.top - gridRect.top,
        width: cardRect.width,
        height: cardRect.height,
      });
    };
    
    // Continuous update loop for smooth animation
    const animateUpdate = () => {
      updateHoverPosition();
      frameCount++;
      if (frameCount < maxFrames) {
        animationId = requestAnimationFrame(animateUpdate);
      }
    };
    
    // Start the animation loop
    animateUpdate();
    
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [hoveredIndex]);

  // Lock body scroll when popup is open and handle animation
  useEffect(() => {
    if (popupService) {
      document.body.style.overflow = 'hidden';
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setPopupVisible(true);
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [popupService]);

  // Close popup with animation
  const closePopup = () => {
    setPopupVisible(false);
    setTimeout(() => {
      setPopupService(null);
    }, 200); // Match transition duration
  };
  
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

  const baseServices = [
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="35" width="50" height="30" />
          <circle cx="35" cy="70" r="8" />
          <circle cx="65" cy="70" r="8" />
        </svg>
      ),
      title: t('servicesList.treilera.title'),
      subtitle: t('servicesList.treilera.subtitle'),
      link: "/services/treilera-pakalpojumi",
      description: t('servicesList.treilera.description'),
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
      title: t('servicesList.mezizvedeja.title'),
      subtitle: t('servicesList.mezizvedeja.subtitle'),
      link: "/services/mezizvedeja-traktora-pakalpojumi",
      description: t('servicesList.mezizvedeja.description'),
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
      title: t('servicesList.universala.title'),
      subtitle: t('servicesList.universala.subtitle'),
      link: "/services/universala-ritenu-traktora-pakalpojumi",
      description: t('servicesList.universala.description'),
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
      title: t('servicesList.kezu.title'),
      subtitle: t('servicesList.kezu.subtitle'),
      link: "/services/kezu-ekskavatora-pakalpojumi",
      description: t('servicesList.kezu.description'),
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
      title: t('servicesList.kniebeja.title'),
      subtitle: t('servicesList.kniebeja.subtitle'),
      link: "/services/kniebeja-ekskavatora-pakalpojumi",
      description: t('servicesList.kniebeja.description'),
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
      title: t('servicesList.kokvedeja.title'),
      subtitle: t('servicesList.kokvedeja.subtitle'),
      link: "/services/kokvedeja-pakalpojumi",
      description: t('servicesList.kokvedeja.description'),
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
      title: t('servicesList.puspiekabe.title'),
      subtitle: t('servicesList.puspiekabe.subtitle'), 
      link: "/services/kokvedeja-puspiekabes-pakalpojumi",
      description: t('servicesList.puspiekabe.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="45" r="20" />
          <path d="M50 65 L35 80 L65 80 Z" />
          <line x1="50" y1="25" x2="50" y2="45" />
        </svg>
      ),
      title: t('servicesList.malka.title'),
      subtitle: t('servicesList.malka.subtitle'),
      link: "/services/malkas-skalditaja-pakalpojumi",
      description: t('servicesList.malka.description'),
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
      title: t('servicesList.autoServiss.title'),
      subtitle: t('servicesList.autoServiss.subtitle'),
      link: "/services/auto-servisa-pakalpojumi",
      description: t('servicesList.autoServiss.description'),
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
      title: t('servicesList.telpas.title'),
      subtitle: t('servicesList.telpas.subtitle'),
      link: "/services/telpu-ire",
      description: t('servicesList.telpas.description'),
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
      title: t('servicesList.dastosana.title'),
      subtitle: t('servicesList.dastosana.subtitle'),  
      link: "/services/dastosanas-pakalpojumi",
      description: t('servicesList.dastosana.description'),
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
      title: t('servicesList.taksacija.title'),
      subtitle: t('servicesList.taksacija.subtitle'),
      link: "/services/meza-projekta-taksacijas",
      description: t('servicesList.taksacija.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M30 70 L30 30 L40 20 L60 20 L70 30 L70 70" />
          <line x1="30" y1="45" x2="70" y2="45" strokeDasharray="5,5" />
          <line x1="50" y1="30" x2="50" y2="70" strokeDasharray="5,5" />
        </svg>
      ),
      title: t('servicesList.stigosana.title'),
      subtitle: t('servicesList.stigosana.subtitle'),
      link: "/services/stigosanas-pakalpojumi",
      description: t('servicesList.stigosana.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="35" r="12" />
          <path d="M30 75 Q30 55 50 55 Q70 55 70 75" />
          <circle cx="50" cy="50" r="25" strokeDasharray="3,3" />
        </svg>
      ),
      title: t('servicesList.konsultacijas.title'),
      subtitle: t('servicesList.konsultacijas.subtitle'),
      description: t('servicesList.konsultacijas.description'),
      noSlug: true,
    },
  ];

  // Show only first 7 services on homepage with "View All" as 8th, or all on services page
  const services = showFullServices ? baseServices : [
    ...baseServices.slice(0, 7),
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="20" y1="50" x2="70" y2="50" />
          <polyline points="60,40 70,50 60,60" />
        </svg>
      ),
      title: t('servicesSection.viewAllTitle'),
      subtitle: t('servicesSection.viewAllSubtitle'),
      link: "/services",
      description: t('servicesSection.viewAllDesc'),
      isViewAll: true
    }
  ];

  // Intersection Observer for triggering overlay animations
  useEffect(() => {
    if (!gridRef.current || !hasMounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationStarted) {
            setAnimationStarted(true);
            
            // Wait a tick to ensure DOM is ready
            setTimeout(() => {
              // Get all overlay elements directly
              const overlays = gridRef.current?.querySelectorAll('[data-overlay-index]');
              
              if (overlays && overlays.length > 0) {
                // Create array of overlay elements with their indices
                const overlayArray = Array.from(overlays);
                // Shuffle using Fisher-Yates (only runs on client)
                const shuffled = [...overlayArray];
                for (let i = shuffled.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                
                // Animate each overlay with delay
                shuffled.forEach((overlay, order) => {
                  const delay = order * 150; // 150ms between each animation
                  const timeout = setTimeout(() => {
                    overlay.style.opacity = '0';
                    
                    // Check if this is the last overlay
                    if (order === shuffled.length - 1) {
                      // Add extra delay for the fade transition to complete (0.6s from CSS)
                      setTimeout(() => {
                        setAnimationComplete(true);
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
  }, [animationStarted, hasMounted]);

  return (
    <section className={`relative ${showHeader ? 'py-16 md:py-24 lg:py-30' : ''} bg-[#faf6ed] overflow-hidden`}>
      <div className="flex flex-col">
        {showHeader && (
          <div className="flex-[2] flex flex-col px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl">

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-700 leading-tight mb-4 md:mb-6 lg:mb-8">
                {t('servicesSection.heading')}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-neutral-700 max-w-3xl leading-relaxed mb-8 md:mb-12 lg:mb-16">
              {t('servicesSection.subheading')}
              </p>
            </div>
          </div>
        )}
        
        <div className="w-full md:px-12 lg:px-20">
          <div 
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 relative overflow-hidden"
            onMouseLeave={handleMouseLeave}
          >
            {/* Hover background that follows and matches card height */}
            {animationComplete && hasMounted && (
              <div
                className={`absolute pointer-events-none z-0 transition-all ease-out duration-300 bg-[#dbf6a3]`}
                style={{
                  left: hoverStyle.left,
                  top: hoverStyle.top,
                  width: hoverStyle.width,
                  height: hoverStyle.height,
                  opacity: hoveredIndex !== null && isHovering ? 1 : 0,
                }}
              />
            )}
            {services.map((service, index) => {
              // Mobile: 2 columns
              const mobileCol = index % 2;
              const mobileRow = Math.floor(index / 2);
              const mobileTotalRows = Math.ceil(services.length / 2);

              // Tablet (md): 3 columns
              const tabletCol = index % 3;
              const tabletRow = Math.floor(index / 3);
              const tabletTotalRows = Math.ceil(services.length / 3);

              // Desktop (lg): 4 columns
              const desktopCol = index % 4;
              const desktopRow = Math.floor(index / 4);
              const desktopTotalRows = Math.ceil(services.length / 4);

              // Border logic for each breakpoint
              const showMobileBottomBorder = mobileRow < mobileTotalRows - 1;
              const showMobileRightBorder = mobileCol < 1;

              const showTabletBottomBorder = tabletRow < tabletTotalRows - 1;
              const showTabletRightBorder = tabletCol < 2;

              const showDesktopBottomBorder = desktopRow < desktopTotalRows - 1;
              const showDesktopRightBorder = desktopCol < 3;

              const cardContent = (
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={service.noSlug ? () => setPopupService(service) : undefined}
                  className={`
                    relative flex flex-col items-start justify-center
                    p-6 md:p-10 lg:p-16 z-10 h-full
                    ${showMobileBottomBorder ? 'border-b' : ''}
                    ${showMobileRightBorder ? 'border-r' : ''}
                    ${showTabletBottomBorder ? 'md:border-b' : 'md:border-b-0'}
                    ${showTabletRightBorder ? 'md:border-r' : 'md:border-r-0'}
                    ${showDesktopBottomBorder ? 'lg:border-b' : 'lg:border-b-0'}
                    ${showDesktopRightBorder ? 'lg:border-r' : 'lg:border-r-0'}
                    border-[#243c36]
                    transition-all duration-300 hover:bg-opacity-10
                    ${service.noSlug ? 'cursor-pointer' : ''}
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
                  
                  <span className="mt-3 md:mt-4 lg:mt-6 text-2xl md:text-3xl lg:text-4xl text-[#243c36] opacity-50 transition-transform duration-300 inline-block group-hover:rotate-90">
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
              );

              // For services without slug, render as div; otherwise as Link
              if (service.noSlug) {
                return (
                  <div 
                    key={index} 
                    ref={el => cardRefs.current[index] = el}
                    className="block group"
                  >
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link
                  href={service.link || '#'}
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className="block group"
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popup Modal for noSlug services - rendered via portal to document.body */}
      {popupService && hasMounted && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-200 ${popupVisible ? 'opacity-100' : 'opacity-0'}`}
          onClick={closePopup}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 bg-black/50 transition-all duration-200 ${popupVisible ? 'backdrop-blur-sm' : 'backdrop-blur-none'}`} />
          
          {/* Modal */}
          <div 
            className={`relative bg-[#faf6ed] p-8 md:p-12 max-w-lg w-full border border-[#243c36] transition-all duration-200 ${popupVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 text-[#243c36] hover:opacity-70 transition-opacity"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Icon */}
            <div className="text-[#243c36] mb-4 opacity-70">
              {popupService.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-semibold text-[#243c36] mb-2">
              {popupService.title}
            </h3>
            {popupService.subtitle && (
              <h4 className="text-lg md:text-xl font-semibold text-[#243c36] mb-4">
                {popupService.subtitle}
              </h4>
            )}

            {/* Description */}
            <p className="text-base md:text-lg text-[#243c36]/80 leading-relaxed">
              {popupService.description}
            </p>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}