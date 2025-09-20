"use client";
import React, { useState, useRef, useEffect } from 'react';
import ServiceIcon from '@/components/ui/ServiceIcon';

const ServiceFeatures = ({ title, features }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const gridRef = useRef(null);
  const animationTimeouts = useRef([]);

  const handleMouseEnter = (index) => {
    if (!animationComplete) return;
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!animationComplete) return;
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) {
        setHoveredIndex(null);
      }
    }, 300);
  };

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

              if (overlays && overlays.length > 0) {
                // Create array of overlay elements with their indices
                const overlayArray = Array.from(overlays);
                const shuffled = [...overlayArray].sort(() => Math.random() - 0.5);

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
  }, [animationStarted]);

  const getGridPosition = (index) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const cols = isMobile ? 1 : 3;
    const totalRows = Math.ceil(features.length / cols);
    const rowHeight = 100 / totalRows;

    return {
      left: isMobile ? '0%' : `${(index % cols) * 33.333}%`,
      top: `${Math.floor(index / cols) * rowHeight}%`,
      width: isMobile ? '100%' : '33.333%',
      height: `${rowHeight}%`,
    };
  };

  return (
    <section className="bg-[#faf6ed] border-t border-[#243c36] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 py-18">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 mb-">
          {title}
        </h2>
      </div>

      <div className="w-full md:px-12 lg:px-20">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 relative overflow-hidden">
          {/* Hover background effect - positioned to fill full width */}
          {animationComplete && (
            <div
              className="absolute pointer-events-none z-0 transition-all ease-out duration-300"
              style={{
                ...getGridPosition(hoveredIndex !== null ? hoveredIndex : 0),
                opacity: hoveredIndex !== null && isHovering ? 1 : 0
              }}
            >
              <div className="w-full h-full bg-[#dbf6a3]" />
            </div>
          )}

          {features.map((feature, index) => {
          const isLastItem = index === features.length - 1;
          const isLastCol = (index + 1) % 3 === 0;
          const isLastRow = index >= features.length - 3;

          return (
            <article
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`
                relative z-10
                ${!isLastItem ? 'border-b md:border-b' : ''}
                ${!isLastRow ? 'md:border-b' : 'md:border-b-0'}
                ${!isLastCol && index !== features.length - 1 ? 'md:border-r' : ''}
                border-[#243c36]
                transition-all duration-300
              `}
            >
              <div className="flex flex-col items-start justify-start px-6 py-8 md:p-10 lg:p-12">
                {feature.iconPath && (
                  <div className="text-[#243c36] mb-6 opacity-70" aria-hidden="true">
                    <ServiceIcon iconPath={feature.iconPath} />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-semibold text-[#243c36] mb-4 leading-tight">
                  {feature.title}
                </h3>
                {feature.description ? (
                  <p className="text-base md:text-lg text-neutral-700 opacity-70 leading-relaxed mt-2">
                    {feature.description}
                  </p>
                ) : (
                  <p className="text-base md:text-lg text-red-500">No description available</p>
                )}
              </div>
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
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;