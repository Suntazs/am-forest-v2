"use client";
import React, { useEffect, useState, useRef } from 'react';

export function ProgressiveImage({
  src,
  alt,
  className = '',
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const element = containerRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Load and render image
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      imgRef.current = img;
      setIsLoaded(true);

      // Draw initial pixelated version
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Initial really shitty quality
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, 10, 10);
        ctx.drawImage(canvas, 0, 0, 10, 10, 0, 0, canvas.width, canvas.height);
      }
    };

    img.src = src;
  }, [src]);

  // Animation effect
  useEffect(() => {
    if (!isLoaded || !isInView || animationStarted) return;

    setAnimationStarted(true);

    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');

    // Pixel steps from really shitty to good
    const pixelSteps = [10, 15, 20, 30, 40, 60, 80, 120, 200, 400, 800];
    let stepIndex = 0;

    const animate = () => {
      if (stepIndex >= pixelSteps.length) {
        // Final draw at full quality
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        return;
      }

      const pixelSize = pixelSteps[stepIndex];

      // Clear and redraw
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw small
      ctx.drawImage(img, 0, 0, pixelSize, pixelSize);

      // Scale up pixelated
      ctx.drawImage(canvas, 0, 0, pixelSize, pixelSize, 0, 0, canvas.width, canvas.height);

      stepIndex++;
      setTimeout(animate, 100);
    };

    animate();
  }, [isLoaded, isInView, animationStarted]);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          imageRendering: 'pixelated',
          display: 'block'
        }}
      />
    </div>
  );
}

export function ProgressiveVideo({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  poster = null,
  ...props
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const hasTriedPlay = useRef(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection Observer for lazy loading with immediate check
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Immediately check if element is in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isVisible = (
        rect.top < window.innerHeight + 50 &&
        rect.bottom > -50 &&
        rect.left < window.innerWidth + 50 &&
        rect.right > -50
      );
      if (isVisible) {
        setIsInView(true);
      }
    };

    // Check immediately after mount
    checkInitialVisibility();

    // Also use IntersectionObserver for scroll-based visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  // Handle video loading and autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    // Reset play attempt flag when isInView changes
    hasTriedPlay.current = false;

    // Set up video attributes
    if (poster) video.poster = poster;

    // Function to try playing the video
    const tryPlay = () => {
      if (hasTriedPlay.current) return;
      hasTriedPlay.current = true;
      
      if (autoPlay && muted) {
        // Ensure video is ready before playing
        if (video.readyState >= 3) {
          video.play().catch(() => {
            // Autoplay blocked, that's ok
            console.log('Autoplay blocked');
          });
        } else {
          // Wait for enough data to play
          video.load();
        }
      }
    };

    // Handle video load
    const handleLoadedData = () => {
      setVideoLoaded(true);
      tryPlay();
    };

    // Handle canplay event as fallback
    const handleCanPlay = () => {
      tryPlay();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);

    // If video is already loaded (cached), try to play immediately
    if (video.readyState >= 3) {
      setVideoLoaded(true);
      tryPlay();
    } else if (video.readyState === 0) {
      // Video hasn't started loading, trigger load
      video.load();
    }

    // Limit video to 9 seconds maximum for all devices
    const handleTimeUpdate = () => {
      if (video.currentTime > 9) {
        video.currentTime = 0; // Loop back to start after 9 seconds
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isInView, autoPlay, muted, poster]);

  // Force reload video when src changes or component remounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Reset states for new source
    setVideoLoaded(false);
    hasTriedPlay.current = false;

    // Force video to reload if it's in view
    if (isInView) {
      video.load();
    }
  }, [src]);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop={loop}
        muted={muted}
        playsInline
        preload={isInView ? "auto" : "metadata"}
        poster={poster}
        autoPlay={autoPlay && muted && isInView}
        controls={false}
        style={{
          // Optimize rendering for performance
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}