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
  const [videoReady, setVideoReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const handleCanPlay = () => {
      setVideoReady(true);
    };

    const handleLoadedData = () => {
      setVideoReady(true);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    // Check if video is already loaded (cached)
    if (video.readyState >= 3) {
      setVideoReady(true);
    } else {
      // Force load if not loaded
      video.load();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [src]);

  // Handle playback based on animation state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (animationsEnabled && videoReady && autoPlay) {
      // Start or resume video playback
      setTimeout(() => {
        video.play().catch(() => {});
        setHasStarted(true);
      }, hasStarted ? 0 : 200);
    } else if (!animationsEnabled && hasStarted) {
      // Pause during transitions
      video.pause();
    }
  }, [animationsEnabled, autoPlay, hasStarted, videoReady]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      muted
      playsInline
      loop={loop}
      preload="auto"
      {...props}
    />
  );
}