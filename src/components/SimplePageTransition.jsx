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
        let hasCompleted = false;

        // Force complete after 1 second maximum
        const forceCompleteTimeout = setTimeout(() => {
          if (!hasCompleted) {
            console.log('Force completing page transition after 1s');
            hasCompleted = true;
            setPageLoaded(true);
            setShowOverlay(false);
            setGlobalTransitioning(false);
            setAnimationsEnabled(true);
            setTimeout(() => {
              setTransitionComplete(true);
            }, 200);
          }
        }, 1000); // 1 second maximum

        // Check if page is ready
        const checkPageReady = () => {
          // Skip image loading on mobile for better performance
          const isMobile = window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

          if (isMobile || hasCompleted) {
            // On mobile, immediately complete
            if (!hasCompleted) {
              clearTimeout(forceCompleteTimeout);
              hasCompleted = true;
              setPageLoaded(true);
              setShowOverlay(false);
              setGlobalTransitioning(false);
              setAnimationsEnabled(true);
              setTimeout(() => {
                setTransitionComplete(true);
              }, 200);
            }
            return;
          }

          // Desktop: wait for images but with timeout
          requestAnimationFrame(() => {
            const images = document.querySelectorAll('img');
            const imagePromises = Array.from(images).slice(0, 5).map(img => { // Only check first 5 images
              if (img.complete) return Promise.resolve();
              return new Promise(resolve => {
                const timer = setTimeout(resolve, 500); // 500ms timeout per image
                img.addEventListener('load', () => {
                  clearTimeout(timer);
                  resolve();
                }, { once: true });
                img.addEventListener('error', () => {
                  clearTimeout(timer);
                  resolve();
                }, { once: true });
              });
            });

            Promise.all(imagePromises).then(() => {
              if (!hasCompleted) {
                clearTimeout(forceCompleteTimeout);
                hasCompleted = true;
                setTimeout(() => {
                  setPageLoaded(true);
                  setShowOverlay(false);
                  setGlobalTransitioning(false);
                  setAnimationsEnabled(true);
                  setTimeout(() => {
                    setTransitionComplete(true);
                  }, 200);
                }, 100);
              }
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

      {/* Simple white overlay for page transitions */}
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