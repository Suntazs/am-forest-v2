"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../contexts/PageTransitionContext';

export default function ProperPageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [frozenPage, setFrozenPage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const [newPageReady, setNewPageReady] = useState(false);
  const previousChildren = useRef(children);
  const previousPath = useRef(pathname);
  const scrollPositionRef = useRef(0);
  const { setIsTransitioning: setGlobalTransitioning, setAnimationsEnabled } = usePageTransition();

  // Update previous children when path matches and not transitioning
  useEffect(() => {
    if (pathname === previousPath.current && !isTransitioning) {
      previousChildren.current = children;
    }
  }, [children, pathname, isTransitioning]);

  // Check when new page content is ready after navigation
  useEffect(() => {
    if (pathname === nextPath && nextPath !== null) {
      // New page content has arrived, now start the reveal animation
      // Wait for next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Give time for images and videos to initialize
        setTimeout(() => {
          setNewPageReady(true);
        }, 400); // Slightly longer delay to prevent flash
      });
    }
  }, [pathname, nextPath]);

  // Intercept navigation
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href === pathname) return;
      
      // Prevent default navigation
      e.preventDefault();
      
      // Save current scroll position
      scrollPositionRef.current = window.scrollY;
      
      // Freeze current page (it will stay until animation completes)
      setFrozenPage(previousChildren.current);
      setNextPath(href);
      setIsTransitioning(true);
      setGlobalTransitioning(true);
      setAnimationsEnabled(false);
      setNewPageReady(false);
      
      // Navigate immediately to start loading the new page
      router.push(href);
      previousPath.current = href;
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, router]);

  // Clean up after animation completes
  useEffect(() => {
    if (newPageReady) {
      // Animation has started, clean up after it completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setGlobalTransitioning(false);
        setFrozenPage(null);
        setNextPath(null);
        setNewPageReady(false);
        // Re-enable animations after transition completes
        setTimeout(() => {
          setAnimationsEnabled(true);
        }, 100);
      }, 1200); // Duration of the slide animation
      
      return () => clearTimeout(timer);
    }
  }, [newPageReady, setGlobalTransitioning, setAnimationsEnabled]);

  // Prevent ALL scrolling during transition
  useEffect(() => {
    if (isTransitioning) {
      const scrollY = scrollPositionRef.current;
      
      // Create style element for aggressive scroll blocking
      const style = document.createElement('style');
      style.id = 'transition-scroll-lock';
      style.textContent = `
        * {
          overflow: hidden !important;
        }
        html, body {
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          touch-action: none !important;
          -webkit-overflow-scrolling: touch !important;
          overscroll-behavior: none !important;
        }
        body {
          top: -${scrollY}px !important;
        }
      `;
      document.head.appendChild(style);
      
      // Multiple prevention methods
      const preventAll = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      };
      
      // Block all scroll-related events
      const events = ['wheel', 'touchmove', 'scroll', 'mousewheel', 'DOMMouseScroll', 'keydown'];
      
      const keyHandler = (e) => {
        // Block arrow keys, page up/down, home/end, spacebar
        if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
          e.preventDefault();
          return false;
        }
      };
      
      events.forEach(event => {
        if (event === 'keydown') {
          document.addEventListener(event, keyHandler, { passive: false, capture: true });
        } else {
          document.addEventListener(event, preventAll, { passive: false, capture: true });
        }
      });
      
      // Store original scroll position
      window.scrollTo(0, scrollY);
      
      return () => {
        // Remove style element
        const styleEl = document.getElementById('transition-scroll-lock');
        if (styleEl) styleEl.remove();
        
        // Remove all event listeners
        events.forEach(event => {
          if (event === 'keydown') {
            document.removeEventListener(event, keyHandler, { capture: true });
          } else {
            document.removeEventListener(event, preventAll, { capture: true });
          }
        });
      };
    } else {
      // Restore normal scrolling
      document.documentElement.style.cssText = '';
      document.body.style.cssText = '';
      
      // Reset to top for new page
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [isTransitioning]);

  // When transitioning: keep showing frozen page until animation is done
  if (isTransitioning || frozenPage) {
    return (
      <>
        {/* Invisible scroll-blocking overlay */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            background: 'transparent',
            touchAction: 'none',
            pointerEvents: 'auto',
            cursor: 'default'
          }}
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
          onScroll={(e) => e.preventDefault()}
        />
        
        {/* White background to prevent any black flash */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10002,
          background: '#faf6ed'
        }} />
        
        {/* Frozen old page - stays visible the entire time */}
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10003,
          overflow: 'hidden',
          background: '#faf6ed'
        }}>
          <div style={{
            position: 'absolute',
            top: `-${scrollPositionRef.current}px`,
            left: 0,
            right: 0,
            minHeight: '100vh'
          }}>
            {frozenPage}
          </div>
        </div>

        {/* Hidden new content to preload without flash */}
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: '-9999px',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          opacity: 0,
          visibility: 'hidden'
        }}>
          {children}
        </div>

        {/* New page sliding in - only starts when content is ready */}
        <AnimatePresence>
          {newPageReady && (
            <>
              {/* Solid background that slides in first to cover everything */}
              <motion.div
                className="fixed inset-0"
                style={{
                  zIndex: 10004,
                  background: '#faf6ed',
                }}
                initial={{
                  y: '100%',
                }}
                animate={{
                  y: '0%',
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.4, 0, 0.2, 1]
                }}
              />
              
              {/* Actual content sliding in on top */}
              <motion.div
                className="fixed inset-0"
                style={{
                  zIndex: 10005,
                  transformOrigin: 'bottom right',
                  background: '#faf6ed',
                  overflow: 'hidden'
                }}
                initial={{
                  y: '120%',
                  skewY: -3,
                  clipPath: 'polygon(0 45%, 100% 0%, 100% 100%, 0 100%)',
                }}
                animate={{
                  y: '0%',
                  skewY: 0,
                  clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div style={{ 
                  width: '100%', 
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  background: '#faf6ed'
                }}>
                  {/* Show the loaded page content */}
                  {children}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Normal render when not transitioning
  return children;
}