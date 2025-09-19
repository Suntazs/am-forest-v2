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

      // Check if all videos are loaded
      const videos = document.querySelectorAll('video');
      const videoPromises = Array.from(videos).map(video => {
        if (video.readyState >= 3) return Promise.resolve();
        return new Promise(resolve => {
          video.addEventListener('loadeddata', resolve, { once: true });
          video.addEventListener('error', resolve, { once: true });
        });
      });

      // Wait for all media to load
      Promise.all([...imagePromises, ...videoPromises]).then(() => {
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
                  {/* Container for logo and text */}
                  <div className="relative flex items-center gap-4">
                    {/* Logo - starts at right position immediately */}
                    <motion.div
                      className="bg-[#243c36] w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center z-20"
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
                      <span className="text-[#faf6ed] font-bold text-xl md:text-3xl">AM</span>
                    </motion.div>
                    
                    {/* Text */}
                    <h1
                      ref={textRef}
                      className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#243c36] whitespace-nowrap opacity-0"
                      style={{
                        opacity: animationPhase === 'initial' ? 0 : 1,
                        transition: 'opacity 0.3s'
                      }}
                    >
                      AM Forest
                    </h1>
                    
                    {/* Overlay that covers the text initially, slides left */}
                    <motion.div 
                      className="absolute bg-gray-100 z-10 pointer-events-none"
                      style={{
                        top: '-10px',
                        bottom: '-10px',
                        left: '104px',
                        right: '-300px',
                        width: 'calc(100% + 500px)'
                      }}
                      initial={{ x: '0%' }}
                      animate={{ 
                        x: animationPhase === 'revealText' || animationPhase === 'slideUp' ? 
                          '-130%' : '0%'
                      }}
                      transition={{ 
                        duration: 2.5,
                        ease: [0.4, 0.0, 0.4, 1],
                        delay: typeof window !== 'undefined' && window.innerWidth < 768 ? -0.86 : -0.78
                      }}
                    />
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