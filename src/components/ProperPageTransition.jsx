"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProperPageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [frozenPage, setFrozenPage] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const [newPageReady, setNewPageReady] = useState(false);
  const previousChildren = useRef(children);
  const previousPath = useRef(pathname);

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
      setTimeout(() => {
        setNewPageReady(true);
      }, 100); // Small delay to ensure content is rendered
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
      
      // Freeze current page (it will stay until animation completes)
      setFrozenPage(previousChildren.current);
      setNextPath(href);
      setIsTransitioning(true);
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
        setFrozenPage(null);
        setNextPath(null);
        setNewPageReady(false);
      }, 1200); // Duration of the slide animation
      
      return () => clearTimeout(timer);
    }
  }, [newPageReady]);

  // When transitioning: keep showing frozen page until animation is done
  if (isTransitioning || frozenPage) {
    return (
      <>
        {/* Frozen old page - stays visible the entire time */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {frozenPage}
        </div>

        {/* New page sliding in - only starts when content is ready */}
        <AnimatePresence>
          {newPageReady && (
            <motion.div
              className="fixed inset-0"
              style={{
                zIndex: 90,
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
                overflowX: 'hidden'
              }}>
                {/* Show the loaded page content */}
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Normal render when not transitioning
  return children;
}