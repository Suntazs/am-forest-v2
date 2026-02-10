"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../contexts/PageTransitionContext';

export default function PageTransition({ children }) {
  const [animationPhase, setAnimationPhase] = useState('waiting');
  const [showOverlay, setShowOverlay] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [textWidth, setTextWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [pageFullyLoaded, setPageFullyLoaded] = useState(false);
  const [stage1Complete, setStage1Complete] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [showPercentage, setShowPercentage] = useState(false);
  const textRef = useRef(null);
  const { setTransitionComplete } = usePageTransition();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only prevent scrolling when overlay is showing
  useEffect(() => {
    if (showOverlay) {
      // Create and inject styles to hide scrollbars during animation
      const style = document.createElement('style');
      style.innerHTML = `
        body, html {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
        }
      `;
      style.id = 'page-transition-no-scroll';
      document.head.appendChild(style);
      
      return () => {
        const styleEl = document.getElementById('page-transition-no-scroll');
        if (styleEl) {
          document.head.removeChild(styleEl);
        }
      };
    }
  }, [showOverlay]);

  useEffect(() => {
    if (!mounted) return;
    
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      // First visit - show the full animation
      sessionStorage.setItem('hasVisited', 'true');
      setShowOverlay(true);
      setContentVisible(false);
      
      // Measure text width after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (textRef.current) {
          const width = textRef.current.offsetWidth;
          setTextWidth(width);
        }
      }, 50);
      
      // Start with initial state (logo already on right)
      setAnimationPhase('initial');
      
      // STAGE 1: After 1.5s delay, start text reveal animation
      setTimeout(() => {
        setAnimationPhase('revealText');
      }, 1500);
      
      // Mark stage 1 complete after text reveal finishes
      setTimeout(() => {
        setStage1Complete(true);
        setShowPercentage(true); // Show percentage after box moves

        // Animate percentage
        let current = 0;
        const interval = setInterval(() => {
          current += Math.floor(Math.random() * 15) + 5;

          if (current >= 100) {
            current = 100;
            setLoadingPercentage(current);
            clearInterval(interval);
          } else {
            setLoadingPercentage(current);
          }
        }, 100);
      }, 4000);
    } else {
      // Not first visit - immediately show content
      setShowOverlay(false);
      setContentVisible(true);
      // Mark transition as complete immediately if not showing animation
      setTransitionComplete(true);
    }
  }, [mounted, setTransitionComplete]);

  // Detect when page is fully loaded
  useEffect(() => {
    if (!mounted || !stage1Complete) return;

    // Set a timeout to ensure we don't get stuck
    const timeoutId = setTimeout(() => {
      setPageFullyLoaded(true);
    }, 2000); // 2 second max wait

    const checkPageLoad = () => {
      // Check if all images are loaded
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener('load', resolve, { once: true });
          img.addEventListener('error', resolve, { once: true });
        });
      });

      // Don't wait for videos - they load lazily now
      // Just wait for images
      Promise.all(imagePromises).then(() => {
        clearTimeout(timeoutId);
        setPageFullyLoaded(true);
      });
    };

    // Also listen for window load as backup
    if (document.readyState === 'complete') {
      checkPageLoad();
    } else {
      window.addEventListener('load', checkPageLoad);
      checkPageLoad(); // Also check immediately
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', checkPageLoad);
    };
  }, [mounted, stage1Complete]);

  // STAGE 2: Start slide-up animation when page is fully loaded and stage 1 is complete
  useEffect(() => {
    if (stage1Complete && pageFullyLoaded) {
      // Small delay before starting stage 2
      setTimeout(() => {
        setAnimationPhase('slideUp');
      }, 300);
      
      // Hide overlay and show page content after slide-up completes
      setTimeout(() => {
        setShowOverlay(false);
        setContentVisible(true);
        // Force cleanup on mobile
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        // Mark the initial transition as complete so animations can start
        setTransitionComplete(true);
      }, 2100);
    }
  }, [stage1Complete, pageFullyLoaded, setTransitionComplete]);

  return (
    <>
      {/* Main content - always rendered but pointer-events disabled during animation */}
      <div style={{ 
        pointerEvents: mounted && !contentVisible ? 'none' : 'auto'
      }}>
        {children}
      </div>

      {/* Overlay - shows for full animation */}
      <AnimatePresence mode="wait">
        {mounted && showOverlay && (
          <motion.div
            className="fixed inset-0 z-[100] bg-gray-100 flex items-center justify-center"
            style={{ overflow: 'hidden', maxWidth: '100vw' }}
            initial={{ y: '0%' }}
            animate={{ 
              y: animationPhase === 'slideUp' ? '-120%' : '0%'
            }}
            transition={{ 
              duration: 1.8, 
              ease: [0.6, 0.0, 0.4, 1]
            }}
          >
            {/* Container for centering content with overflow hidden */}
            <div className="relative overflow-hidden w-full max-w-full flex items-center justify-center">
              {/* Container for text sliding up */}
              <motion.div
                className="relative"
                initial={{ y: '0%' }}
                animate={{
                  y: animationPhase === 'slideUp' ? '-250%' : '0%'
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.6, 0.0, 0.4, 1]
                }}
              >
                  {/* Container for logo */}
                  <div className="relative flex items-center">
                    {/* Logo - starts at right position immediately */}
                    <motion.div
                      className="z-20 flex items-center gap-3 md:gap-4"
                      initial={{ 
                        x: textWidth > 0 ? `${textWidth + 20}px` : 0
                      }}
                      animate={{ 
                        x: animationPhase === 'revealText' || animationPhase === 'slideUp' ? 0 : 
                           textWidth > 0 ? `${textWidth + 20}px` : 0
                      }}
                      transition={{ 
                        duration: 1.5,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <img 
                        src="/image/amforest-logo-black.svg" 
                        alt="AM Forest" 
                        className="h-16 md:h-20 lg:h-24 w-auto"
                      />
                      <span className="text-[#243c36] font-semibold text-2xl md:text-3xl lg:text-4xl">Forest</span>
                    </motion.div>
                    
                    {/* Hidden text for width measurement */}
                    <h1
                      ref={textRef}
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#243c36] whitespace-nowrap opacity-0 absolute"
                      style={{
                        visibility: 'hidden'
                      }}
                    >
                      AM Forest
                    </h1>
                    
                  </div>
              </motion.div>
            </div>

            {/* Loading percentage in overlay, not in container */}
            {showPercentage && (
              <motion.div
                className="absolute text-[#243c36]/70 text-sm"
                style={{
                  bottom: '40%',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {loadingPercentage}%
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}