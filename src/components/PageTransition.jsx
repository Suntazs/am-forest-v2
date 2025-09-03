"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageTransition({ children }) {
  const [animationPhase, setAnimationPhase] = useState('waiting');
  const [showOverlay, setShowOverlay] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const [textWidth, setTextWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      
      // Phase 2: After 1.5s delay, start sliding overlay and logo to the left
      setTimeout(() => {
        setAnimationPhase('revealText');
      }, 1500);
      
      // Phase 3: Slide everything up after 4.5 seconds total
      setTimeout(() => {
        setAnimationPhase('slideUp');
      }, 4500);
      
      // Phase 4: Hide overlay and show page content
      setTimeout(() => {
        setShowOverlay(false);
        setContentVisible(true);
      }, 5500);
    } else {
      // Not first visit - immediately show content
      setShowOverlay(false);
      setContentVisible(true);
    }
  }, [mounted]);

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
            initial={{ y: '0%' }}
            animate={{ 
              y: animationPhase === 'slideUp' ? '-100%' : '0%'
            }}
            transition={{ 
              duration: 1.0, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
          >
            {/* Container for centering content with overflow hidden for slideUp */}
            <div className={`relative ${animationPhase === 'slideUp' ? 'overflow-hidden' : ''}`}>
              {/* Container for text sliding up */}
              <motion.div
                initial={{ y: '0%' }}
                animate={{ 
                  y: animationPhase === 'slideUp' ? '-150%' : '0%'
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                  {/* Container for logo and text */}
                  <div className="relative flex items-center gap-4">
                    {/* Logo - starts at right position immediately */}
                    <motion.div 
                      className="bg-[#243c36] w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center z-20"
                      initial={{ 
                        x: textWidth > 0 ? `${textWidth + 20}px` : 0
                      }}
                      animate={{ 
                        x: animationPhase === 'revealText' || animationPhase === 'slideUp' ? 0 : 
                           textWidth > 0 ? `${textWidth + 20}px` : 0
                      }}
                      transition={{ 
                        duration: 1.2,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                    >
                      <span className="text-[#faf6ed] font-bold text-2xl md:text-3xl">AM</span>
                    </motion.div>
                    
                    {/* Text */}
                    <h1 
                      ref={textRef}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#243c36] whitespace-nowrap"
                    >
                      AM Forest
                    </h1>
                    
                    {/* Overlay that covers the text initially, slides left */}
                    <motion.div 
                      className="absolute bg-gray-100 z-10"
                      style={{
                        top: '-10px',
                        bottom: '-10px',
                        left: '104px',
                        right: '-20px'
                      }}
                      initial={{ x: '0%' }}
                      animate={{ 
                        x: animationPhase === 'revealText' || animationPhase === 'slideUp' ? 
                          '-100%' : '0%'
                      }}
                      transition={{ 
                        duration: 1.2,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                    />
                  </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}