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
  ...props
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

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

  // Capture first frame and prepare video
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const captureFrame = () => {
      canvas.width = video.videoWidth || 1920;
      canvas.height = video.videoHeight || 1080;

      // Draw first frame at really shitty quality
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(video, 0, 0, 10, 10);
      ctx.drawImage(canvas, 0, 0, 10, 10, 0, 0, canvas.width, canvas.height);

      setVideoReady(true);
    };

    video.addEventListener('loadeddata', captureFrame);

    if (video.readyState >= 2) {
      captureFrame();
    }

    return () => {
      video.removeEventListener('loadeddata', captureFrame);
    };
  }, []);

  // Animate quality improvement when in view
  useEffect(() => {
    if (!isInView || !videoReady || animationDone) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');

    // Pixel steps from really shitty to good
    const pixelSteps = [10, 15, 20, 30, 40, 60, 80, 120, 200, 400, 800];
    let stepIndex = 0;

    const animate = () => {
      if (stepIndex >= pixelSteps.length) {
        // Final draw at full quality
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Hide canvas and show video
        setTimeout(() => {
          canvas.style.opacity = '0';
          video.style.opacity = '1';
          if (autoPlay) {
            video.play().catch(console.error);
          }
          setAnimationDone(true);
        }, 100);
        return;
      }

      const pixelSize = pixelSteps[stepIndex];

      // Clear and redraw
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw small
      ctx.drawImage(video, 0, 0, pixelSize, pixelSize);

      // Scale up pixelated
      ctx.drawImage(canvas, 0, 0, pixelSize, pixelSize, 0, 0, canvas.width, canvas.height);

      stepIndex++;
      setTimeout(animate, 100);
    };

    animate();
  }, [isInView, videoReady, animationDone, autoPlay]);

  return (
    <div ref={containerRef} className={`relative ${className}`} {...props}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          imageRendering: 'pixelated',
          zIndex: 2,
          opacity: 1,
          transition: 'opacity 0.3s ease-out'
        }}
      />

      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        style={{
          display: 'block',
          opacity: 0,
          transition: 'opacity 0.3s ease-out'
        }}
        loop={loop}
        muted={muted}
        playsInline
        preload="auto"
      />
    </div>
  );
}