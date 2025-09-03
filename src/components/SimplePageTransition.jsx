"use client";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '../contexts/PageTransitionContext';

export default function SimplePageTransition({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const context = usePageTransition();
  const setGlobalTransitioning = context?.setIsTransitioning || (() => {});
  const setAnimationsEnabled = context?.setAnimationsEnabled || (() => {});

  // Intercept navigation
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href === pathname) return;
      
      // Prevent default navigation
      e.preventDefault();
      
      // Show overlay
      setShowOverlay(true);
      setGlobalTransitioning(true);
      setAnimationsEnabled(false);
      
      // Navigate after a short delay
      setTimeout(() => {
        router.push(href);
      }, 400);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, router, setGlobalTransitioning, setAnimationsEnabled]);

  // Hide overlay when pathname changes (navigation complete)
  useEffect(() => {
    if (showOverlay) {
      // Give time for new page to render
      const timer = setTimeout(() => {
        setShowOverlay(false);
        setGlobalTransitioning(false);
        setAnimationsEnabled(true);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, showOverlay, setGlobalTransitioning, setAnimationsEnabled]);

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
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}