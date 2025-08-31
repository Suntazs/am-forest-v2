"use client";
import React, { useState, useEffect, useRef } from 'react';

const ReviewsSection = () => {
  const [curvesInView, setCurvesInView] = useState(false);
  const sectionRef = useRef(null);

  const review = {
    text: "AM Forest palīdzēja mums pārdot mūsu meža īpašumu ātri un par taisnīgu cenu. Profesionāla pieeja un lieliska komunikācija visā procesā.",
    author: "Jānis Bērziņš",
    rating: 5
  };

  // Intersection observer for curve animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !curvesInView) {
          setCurvesInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [curvesInView]);

  const handleGoogleReview = () => {
    // Replace with your actual Google Business review link
    window.open('https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review', '_blank');
  };

  return (
    <section ref={sectionRef} className="relative bg-[#faf6ed] px-6 md:px-12 lg:px-20 py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Stars */}
        <div className="flex justify-center gap-2 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-8 h-8 md:w-10 md:h-10 text-[#bc9d6e]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review Text */}
        <div className="text-center mb-12">
          <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-700 leading-relaxed font-light italic">
            "{review.text}"
          </p>
        </div>

        {/* Author Name */}
        <p className="text-center text-xl md:text-2xl text-neutral-600 font-medium mb-12">
          — {review.author}
        </p>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleGoogleReview}
            className="inline-flex items-center gap-3 bg-[#243c36] text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold hover:bg-[#1a2b24] transition-colors duration-300 shadow-lg"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Atstāt atsauksmi Google
          </button>
        </div>
      </div>

      {/* Bottom right curve - visible on all screens */}
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <svg 
          className="w-72 h-48 md:w-[32rem] md:h-96 lg:w-[40rem] lg:h-[28rem]" 
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="#bc9d6e"
            strokeWidth="40"
            className="curve-path-bottom md:stroke-[30]"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: curvesInView ? 0 : 1000,
              transition: 'stroke-dashoffset 2.5s cubic-bezier(0.65, 0, 0.35, 1)',
              transitionDelay: curvesInView ? '0.3s' : '0s',
            }}
          />
        </svg>
      </div>

      {/* Top left curve - now visible on all screens */}
      <div className="absolute top-0 left-0 pointer-events-none">
        <svg 
          className="w-60 h-40 md:w-[32rem] md:h-96 lg:w-[40rem] lg:h-[28rem]" 
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="#f3ecda"
            strokeWidth="40"
            className="curve-path-top md:stroke-[30]"
            style={{
              strokeDasharray: 1000,
              strokeDashoffset: curvesInView ? 0 : 1000,
              transition: 'stroke-dashoffset 2.5s cubic-bezier(0.65, 0, 0.35, 1)',
              transitionDelay: curvesInView ? '0.6s' : '0s',
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default ReviewsSection;