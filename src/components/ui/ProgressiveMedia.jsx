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

  // Intersection Observer for lazy loading
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

  // Handle video loading and autoplay
  useEffect(() => {
    if (!videoRef.current || !isInView) return;

    const video = videoRef.current;

    // Set up video attributes
    if (poster) video.poster = poster;

    // On desktop, try to autoplay when in view
    if (!isMobile && autoPlay) {
      video.play().catch(() => {
        // Autoplay blocked, that's ok
        console.log('Autoplay blocked');
      });
    }
  }, [isInView, isMobile, autoPlay, poster]);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        className="w-full h-full object-cover"
        loop={loop}
        muted={muted}
        playsInline
        preload={isMobile ? 'none' : 'metadata'}
        poster={poster}
        autoPlay={!isMobile && autoPlay}
        controls={isMobile}
      />
    </div>
  );
}