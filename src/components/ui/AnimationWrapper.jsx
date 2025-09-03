import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePageTransition } from '../../contexts/PageTransitionContext';

export function AnimationWrapper({ 
  children, 
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  delay = 0,
  className = '',
  ...props 
}) {
  const { animationsEnabled } = usePageTransition();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (animationsEnabled) {
      // Add a small delay to ensure smooth start after transition
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay * 1000 + 100);
      
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
    }
  }, [animationsEnabled, delay]);

  if (!shouldAnimate) {
    // Return children without animation during transition
    return (
      <div className={className} style={{ opacity: 0 }} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={{ ...transition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ImageWrapper({ src, alt, className = '', ...props }) {
  const { animationsEnabled } = usePageTransition();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  useEffect(() => {
    if (animationsEnabled && imageLoaded) {
      setShouldShow(true);
    } else if (!animationsEnabled) {
      setShouldShow(false);
    }
  }, [animationsEnabled, imageLoaded]);

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    />
  );
}

export function VideoWrapper({ src, className = '', autoPlay = true, loop = false, ...props }) {
  const { animationsEnabled } = usePageTransition();
  const videoRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (animationsEnabled && !hasStarted && autoPlay) {
        // Start video playback only once after first transition
        setTimeout(() => {
          videoRef.current.play().catch(() => {});
          setHasStarted(true);
        }, 200);
      } else if (!animationsEnabled && hasStarted) {
        // Don't reset, just pause temporarily
        videoRef.current.pause();
      } else if (animationsEnabled && hasStarted) {
        // Resume if it was already playing
        videoRef.current.play().catch(() => {});
      }
    }
  }, [animationsEnabled, autoPlay, hasStarted]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      loop={loop}
      {...props}
    />
  );
}