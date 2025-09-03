"use client";
import { useEffect, useRef, useState } from "react";
import { usePageTransition } from '../../contexts/PageTransitionContext';

export default function LocomotiveScrollProvider({ children }) {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const { isTransitioning, animationsEnabled } = usePageTransition();

  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') return;
    
    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || !scrollRef.current) return;
    
    // Only import and initialize on client side
    const initLocomotiveScroll = async () => {
      try {
        // Double-check element exists before initializing
        if (!scrollRef.current) {
          console.warn('Scroll container not found, skipping Locomotive Scroll initialization');
          return;
        }

        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        await import("locomotive-scroll/dist/locomotive-scroll.css");
        
        // Add a small delay to ensure DOM is fully ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (!scrollRef.current) {
          console.warn('Scroll container lost during initialization');
          return;
        }
        
        locomotiveScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          smoothMobile: false,
          resetNativeScroll: true,
          lerp: 0.06,
          multiplier: 0.8,
          class: "is-reveal",
          smartphone: {
            smooth: false
          },
          tablet: {
            smooth: false
          }
        });

        if (typeof window !== 'undefined') {
          window.locomotiveScroll = locomotiveScrollRef.current;
        }
      } catch (error) {
        console.error('Failed to initialize Locomotive Scroll:', error);
      }
    };
    
    initLocomotiveScroll();

    const handleUpdate = () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.update();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleUpdate);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleUpdate);
      }
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, [isReady]);

  // Disable/enable locomotive scroll during transitions
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      if (isTransitioning) {
        // Stop locomotive scroll during transition
        locomotiveScrollRef.current.stop();
      } else if (animationsEnabled) {
        // Resume after transition completes
        setTimeout(() => {
          locomotiveScrollRef.current?.start();
          locomotiveScrollRef.current?.update();
        }, 100);
      }
    }
  }, [isTransitioning, animationsEnabled]);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
}