"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function Services({ showHeader = true, showFullServices = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const gridRef = useRef(null);
  const timeoutRef = useRef(null);
  const serviceRefs = useRef([]);
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
  };

  const handleServiceClick = (index) => {
    const element = serviceRefs.current[index];
    if (element) {
      // Get current scroll position FIRST
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Get rect - this is relative to current viewport
      const rect = element.getBoundingClientRect();
      
      // These are the actual viewport positions where the element appears
      const viewportLeft = rect.left;
      const viewportTop = rect.top;
      
      // Calculate center of viewport
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      // Calculate element's center as it appears on screen
      const elementCenterX = viewportLeft + rect.width / 2;
      const elementCenterY = viewportTop + rect.height / 2;
      
      // Translation needed to center it
      const translateX = viewportCenterX - elementCenterX;
      const translateY = viewportCenterY - elementCenterY;
      
      // Calculate scale
      const scaleX = (window.innerWidth * 0.8) / rect.width;
      const scaleY = (window.innerHeight * 0.7) / rect.height;
      const scale = Math.min(scaleX, scaleY);
      
      // Check for Locomotive Scroll
      const locomotiveScroll = window.locomotiveScroll;
      if (locomotiveScroll) {
        locomotiveScroll.stop();
      }
      
      // Set state with viewport positions
      setSelectedService({
        index,
        rect: {
          left: viewportLeft,
          top: viewportTop,
          width: rect.width,
          height: rect.height
        },
        translateX,
        translateY,
        scale,
        scrollY: currentScrollY,
        hasLocomotiveScroll: !!locomotiveScroll
      });
      
      // DON'T change body position - use overlay to block scroll instead
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      
      // Hide navbar
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.transform = 'translateY(-100%)';
      }
      
      setTimeout(() => {
        setIsZooming(true);
      }, 10);
    }
  };

  const handleCloseZoom = () => {
    setIsZooming(false);
    
    // Show navbar
    const navbar = document.querySelector('nav');
    if (navbar) {
      navbar.style.transform = 'translateY(0)';
    }
    
    // Get saved data
    const hasLocomotiveScroll = selectedService?.hasLocomotiveScroll;
    
    setTimeout(() => {
      // Re-enable scrolling
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      
      // Restart Locomotive Scroll if needed
      if (hasLocomotiveScroll && window.locomotiveScroll) {
        window.locomotiveScroll.start();
      }
      
      setSelectedService(null);
    }, 700);
  };

  // Get the grid position of the service for determining which lines to show
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

  const baseServices = [
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" fill="none" strokeWidth="1.5"/>
          <rect x="15" y="15" width="15" height="15" stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="5,5"/>
          <rect x="70" y="70" width="15" height="15" stroke="currentColor" fill="none" strokeWidth="1.5" strokeDasharray="5,5"/>
        </svg>
      ),
      title: "Forest",
      subtitle: "Management",
      description: "Comprehensive forest management services including strategic planning, resource optimization, and sustainable practices to maximize forest health and productivity while maintaining ecological balance.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="50" cy="50" r="20" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      ),
      title: "Sustainable",
      subtitle: "Harvesting",
      description: "Environmentally responsible timber harvesting techniques that ensure forest regeneration, minimize ecological impact, and maintain biodiversity for future generations.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={50 + 20 * Math.cos((i * Math.PI * 2) / 8)}
              cy={50 + 20 * Math.sin((i * Math.PI * 2) / 8)}
              r="15"
              fill="none"
            />
          ))}
        </svg>
      ),
      title: "Reforestation",
      subtitle: "",
      description: "Professional reforestation services including site preparation, species selection, planting, and monitoring to restore forest ecosystems and enhance carbon sequestration.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 20 C30 30, 30 70, 50 80 C70 70, 70 30, 50 20Z" />
          <path d="M20 50 C30 30, 70 30, 80 50 C70 70, 30 70, 20 50Z" />
        </svg>
      ),
      title: "Wildlife",
      subtitle: "Conservation",
      description: "Habitat management and conservation strategies to protect and enhance wildlife populations, ensuring biodiversity and ecological balance within forest ecosystems.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="35" cy="40" r="8" />
          <circle cx="65" cy="60" r="8" />
          <line x1="20" y1="20" x2="35" y2="40" />
          <line x1="65" y1="60" x2="80" y2="80" />
          <line x1="35" y1="40" x2="65" y2="60" />
        </svg>
      ),
      title: "Land",
      subtitle: "Assessment",
      description: "Detailed land evaluation services including soil analysis, topographic mapping, and resource inventory to inform land use decisions and management strategies.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="35" cy="35" r="10" />
          <circle cx="65" cy="35" r="10" />
          <circle cx="35" cy="65" r="10" />
          <circle cx="65" cy="65" r="10" />
        </svg>
      ),
      title: "Ecosystem",
      subtitle: "Planning",
      description: "Integrated ecosystem planning that balances ecological, economic, and social objectives to create sustainable forest management solutions.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M30 50 Q50 30, 70 50" fill="none" />
          {[...Array(8)].map((_, i) => (
            <line key={i} x1={30 + i * 5} y1={50} x2={30 + i * 5} y2={50 + i * 2} />
          ))}
        </svg>
      ),
      title: "Carbon",
      subtitle: "Management",
      description: "Carbon offset programs and forest carbon management strategies to maximize carbon sequestration and participate in carbon credit markets.",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="50" y1="20" x2="50" y2="80" />
          <line x1="20" y1="50" x2="80" y2="50" />
          <line x1="30" y1="30" x2="70" y2="70" />
          <line x1="70" y1="30" x2="30" y2="70" />
        </svg>
      ),
      title: "Site",
      subtitle: "Preparation",
      description: "Professional site preparation services including clearing, grading, and soil conditioning to optimize conditions for successful forest establishment.",
    },
  ];

  const additionalServices = [
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M25 75 L50 25 L75 75 Z" fill="none" />
          <circle cx="50" cy="55" r="10" />
        </svg>
      ),
      title: "Tree",
      subtitle: "Inventory",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="30" width="40" height="40" />
          <path d="M30 50 L70 50 M50 30 L50 70" />
        </svg>
      ),
      title: "Timber",
      subtitle: "Valuation",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="50" cy="50" rx="30" ry="20" />
          <path d="M20 50 Q50 70, 80 50" fill="none" />
        </svg>
      ),
      title: "Soil",
      subtitle: "Analysis",
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M50 20 L30 40 L30 60 L50 80 L70 60 L70 40 Z" fill="none" />
        </svg>
      ),
      title: "Pest",
      subtitle: "Control",
    },
  ];

  const services = showFullServices ? [...baseServices, ...additionalServices] : baseServices;

  return (
    <section className={`relative ${showHeader ? 'py-16 md:py-24 lg:py-30' : 'pb-16 md:pb-24 lg:pb-30'} bg-[#faf6ed] overflow-hidden`}>
      <div className="flex flex-col">
        {showHeader && (
          <div className="flex-[2] flex flex-col px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight mb-4 md:mb-6 lg:mb-8">
                See beyond that of limits, because that each field tells the story a History single
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-neutral-700 max-w-3xl leading-relaxed mb-8 md:mb-12 lg:mb-16">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo quis voluptate quaerat. Fuga veritatis aliquid consequuntur, unde laudantium voluptatibus earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi dolorum ipsum deserunt quis voluptates quam harum iusto natus. Totam, laudantium.
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
            {hoveredIndex !== null && (
              <div
                className={`absolute pointer-events-none z-0 transition-all ease-out ${isHovering ? 'opacity-100 duration-300' : 'opacity-0 duration-500'}`}
                style={getGridPosition(hoveredIndex)}
              >
                <div className="w-full h-full bg-[#dbf6a3]" />
              </div>
            )}
            {services.map((service, index) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              const cols = isMobile ? 2 : 4;
              const totalRows = Math.ceil(services.length / cols);
              const currentRow = Math.floor(index / cols);
              const isLastRow = currentRow === totalRows - 1;
              const isLastCol = (index + 1) % cols === 0;
              
              return (
                <div
                  key={index}
                  ref={el => serviceRefs.current[index] = el}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={() => handleServiceClick(index)}
                  className={`
                    relative flex flex-col items-start justify-center 
                    p-6 md:p-10 lg:p-16 cursor-pointer z-10
                    ${!isLastRow ? 'border-b border-[#243c36]' : ''}
                    ${!isLastCol ? 'border-r border-[#243c36]' : ''}
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
                  <button className="mt-3 md:mt-4 lg:mt-6 text-2xl md:text-3xl lg:text-4xl text-[#243c36] opacity-50 hover:rotate-90 transition-transform duration-300">
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zoom Overlay */}
      {selectedService !== null && (
        <>
          {/* Backdrop to prevent scrolling */}
          <div 
            className="fixed inset-0 z-[99] bg-transparent pointer-events-auto"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden'
            }}
            onClick={handleCloseZoom}
          />
          
          {/* Zoom Container */}
          <div 
            className="fixed inset-0 z-[100] pointer-events-none"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              transform: 'none' 
            }}
          >
            {(() => {
              const service = services[selectedService.index];
              const gridInfo = getServiceGridInfo(selectedService.index);
              
              return (
                <>
                  {/* Zooming Box */}
                  <div
                    className="fixed bg-[#faf6ed] transition-all duration-700 ease-in-out pointer-events-auto"
                    style={{
                      left: `${selectedService.rect.left}px`,
                      top: `${selectedService.rect.top}px`,
                    width: `${selectedService.rect.width}px`,
                    height: `${selectedService.rect.height}px`,
                    transform: isZooming 
                      ? `translate(${selectedService.translateX}px, ${selectedService.translateY}px) scale(${selectedService.scale})`
                      : 'translate(0, 0) scale(1)',
                    transformOrigin: 'center center',
                    zIndex: 51,
                    borderTop: !gridInfo.isTopRow ? '1px solid #243c36' : 'none',
                    borderBottom: !gridInfo.isBottomRow ? '1px solid #243c36' : 'none',
                    borderLeft: !gridInfo.isLeftCol ? '1px solid #243c36' : 'none',
                    borderRight: !gridInfo.isRightCol ? '1px solid #243c36' : 'none',
                    maxHeight: isZooming ? '90vh' : '100%',
                  }}
                  onClick={handleCloseZoom}
                >
                    {/* Icon - scales up during zoom */}
                    <div className={`text-[#243c36] opacity-70 transition-all duration-700 ${
                      isZooming ? 'scale-150 mb-8' : 'scale-100 mb-4'
                    }`}>
                      {service.icon}
                    </div>
                    
                    {/* Title - grows during zoom */}
                    <div className={`text-center transition-all duration-700 ${
                      isZooming ? 'scale-150' : 'scale-100'
                    }`}>
                      <h2 className={`font-bold text-[#243c36] ${
                        isZooming ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-sm md:text-lg lg:text-xl'
                      }`}>
                        {service.title}
                      </h2>
                      {service.subtitle && (
                        <h3 className={`font-bold text-[#243c36] ${
                          isZooming ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-sm md:text-lg lg:text-xl'
                        }`}>
                          {service.subtitle}
                        </h3>
                      )}
                    </div>
                    
                    {/* Plus sign - rotates during zoom */}
                    <div className={`mt-4 text-2xl md:text-3xl lg:text-4xl text-[#243c36] opacity-50 transition-transform duration-700 ${
                      isZooming ? 'rotate-45' : 'rotate-0'
                    }`}>
                      +
                    </div>
                    
                    {/* Description - Shows after zoom */}
                    <p className={`text-center text-[#243c36]/80 max-w-2xl mx-auto mt-8 px-8 transition-all duration-700 delay-300 ${
                      isZooming ? 'opacity-100 translate-y-0 text-base md:text-lg' : 'opacity-0 translate-y-4 text-sm'
                    }`}>
                      {service.description}
                    </p>

                    {/* Close button - shows after zoom */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseZoom();
                      }}
                      className={`absolute top-4 right-4 text-[#243c36] hover:opacity-70 transition-all duration-500 ${
                        isZooming ? 'opacity-100 delay-500' : 'opacity-0'
                      }`}
                    >
                      <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </>
      )}
    </section>
  )
}