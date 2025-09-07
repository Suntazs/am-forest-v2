"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../contexts/PageTransitionContext';

export default function SimplePageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(true);
  const previousPathname = useRef(pathname);
  const context = usePageTransition();
  const setGlobalTransitioning = context?.setIsTransitioning || (() => {});
  const setAnimationsEnabled = context?.setAnimationsEnabled || (() => {});
  const setTransitionComplete = context?.setTransitionComplete || (() => {});

  // Intercept navigation
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href === pathname) return;
      
      // Prevent default navigation
      e.preventDefault();
      
      // Show overlay and mark page as loading
      setShowOverlay(true);
      setPageLoaded(false);
      setGlobalTransitioning(true);
      setAnimationsEnabled(false);
      setTransitionComplete(false);
      
      // Navigate after a short delay for fade in
      setTimeout(() => {
        router.push(href);
      }, 200);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, router, setGlobalTransitioning, setAnimationsEnabled, setTransitionComplete]);

  // Detect when pathname changes (navigation happened)
  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      
      // Scroll to top when page changes
      window.scrollTo(0, 0);
      
      // Page has navigated, wait for it to load
      if (showOverlay && !pageLoaded) {
        // Check if page is ready
        const checkPageReady = () => {
          // Wait for next frame and all images to load
          requestAnimationFrame(() => {
            const images = document.querySelectorAll('img');
            const imagePromises = Array.from(images).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise(resolve => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
              });
            });
            
            Promise.all(imagePromises).then(() => {
              // Add small delay to ensure everything is rendered
              setTimeout(() => {
                setPageLoaded(true);
                setShowOverlay(false);
                setGlobalTransitioning(false);
                setAnimationsEnabled(true);
                // Mark transition complete after the fade out animation (200ms)
                setTimeout(() => {
                  setTransitionComplete(true);
                }, 200);
              }, 100);
            });
          });
        };
        
        // Start checking after a minimum time
        setTimeout(checkPageReady, 300);
      }
    }
  }, [pathname, showOverlay, pageLoaded, setGlobalTransitioning, setAnimationsEnabled, setTransitionComplete]);

  // Lock scroll during transition
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [showOverlay]);

  return (
    <>
      {children}
      
      {/* Simple white overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 bg-[#faf6ed] pointer-events-none"
            style={{ zIndex: 99999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.2, 
              ease: 'easeOut'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}