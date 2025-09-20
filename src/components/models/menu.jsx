"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from '@/lib/sanity.image';

export default function MenuModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [randomPost, setRandomPost] = useState(null);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => setHoveredIndex(null), 200);
  };

  const handleLinkMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleLinkMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => setHoveredIndex(null), 100);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch blog posts when modal opens
  useEffect(() => {
    if (isOpen && !randomPost) {
      const fetchPosts = async () => {
        try {
          // Use fetch API directly to avoid CORS issues
          const response = await fetch('/api/get-random-post');
          if (response.ok) {
            const post = await response.json();
            setRandomPost(post);
          }
        } catch (error) {
          console.error('Error fetching blog post:', error);
          // Silently fail - the blog section just won't show
        }
      };
      fetchPosts();
    }
  }, [isOpen, randomPost]);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
      // Start with closed state, then animate open
      setTimeout(() => setIsAnimating(true), 50);
    } else if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, hasBeenOpened]);


  // Don't render anything until mounted and has been opened at least once
  if (!isMounted || !hasBeenOpened) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-[10001] transition-opacity duration-600 ${
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[10002] h-auto sm:min-h-[500px] ${
          isAnimating ? 'menu-reveal-open' : 'menu-reveal-closed'
        }`}
        style={{
          transformOrigin: 'bottom right'
        }}
      >
        {/* Background - Split colors */}
        <div className="absolute inset-0 bg-[#f3ecda]"></div>
        
        {/* Black line at top - full width on desktop, shows on mobile too */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-neutral-900 z-10 transition-opacity duration-1100 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col pt-[2px]">
          {/* Header with close button - absolute on desktop, static on mobile */}
          <div className="sm:absolute sm:top-0 sm:right-0 sm:z-20 sm:p-6 bg-[#f3ecda] sm:bg-transparent border-b border-neutral-900 sm:border-0">
            <div className="flex justify-end">
              <button 
                onClick={onClose}
                className="text-neutral-900 sm:text-[#faf6ed] hover:text-[#243c36] sm:hover:text-[#dbf6a3] transition-colors p-4 sm:p-3 hover:bg-neutral-900/5 sm:hover:bg-[#faf6ed]/10 border-l border-neutral-900 sm:border-0 sm:rounded-lg"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Container - Responsive Layout */}
          <div className="flex-1 flex flex-col sm:flex-row overflow-y-auto sm:pt-0">
            {/* Left Side - Navigation Links - Full width on mobile, auto on desktop */}
            <div className="flex flex-col flex-shrink-0 w-full sm:w-auto">
              {/* Navigation Links - responsive columns */}
              <div 
                className="grid grid-cols-2 border-b border-neutral-900 sm:border-r relative overflow-hidden flex-1 w-full"
                onMouseLeave={handleLinkMouseLeave}
              >
                {/* Hover background effect for navigation */}
                {hoveredIndex !== null && hoveredIndex < 6 && (
                  <div
                    className={`absolute pointer-events-none z-0 transition-all ease-out ${isHovering ? 'opacity-100 duration-200' : 'opacity-0 duration-300'}`}
                    style={{
                      left: hoveredIndex >= 3 ? '50%' : '0%',
                      top: `${(hoveredIndex % 3) * 33.33}%`,
                      width: '50%',
                      height: '33.33%',
                      backgroundColor: '#dbf6a3'
                    }}
                  />
                )}

                {/* Left Column / First set of links */}
                <div className="border-r border-neutral-900 relative z-0">
                  <Link 
                    href="/" 
                    onMouseEnter={() => handleLinkMouseEnter(0)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    onMouseEnter={() => handleLinkMouseEnter(1)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    About
                  </Link>
                  <Link 
                    href="/services" 
                    onMouseEnter={() => handleLinkMouseEnter(2)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 text-center"
                    onClick={onClose}
                  >
                    Services
                  </Link>
                </div>

                {/* Right Column */}
                <div className="relative z-0">
                  <Link 
                    href="/perkam-mezu" 
                    onMouseEnter={() => handleLinkMouseEnter(3)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Pērkam mežu
                  </Link>
                  <Link 
                    href="/perkam-cirsmu" 
                    onMouseEnter={() => handleLinkMouseEnter(4)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Pērkam cirsmu
                  </Link>
                  <Link 
                    href="/contact" 
                    onMouseEnter={() => handleLinkMouseEnter(5)}
                    className="relative z-10 group block text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 text-center"
                    onClick={onClose}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Bottom button section */}
              <div className="sm:border-r border-b border-neutral-900 w-full">
                {/* Full width button */}
                <Link href="/blog" onClick={() => {
                      // Delay closing to allow transition to start
                      setTimeout(() => onClose(), 800);
                    }}>
                  <div className="flex items-center hover:bg-[#dbf6a3] transition-all group cursor-pointer">
                    <div
                      className="flex-1 text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 group-hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8 text-left"
                    >
                      Jaunumi
                    </div>
                    
                    {/* Plus sign on the right */}
                    <div 
                      className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 group-hover:text-[#243c36] transition-colors py-8 xs:py-8 sm:py-8 px-4 xs:px-5 sm:px-8"
                    >
                      +
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Side - Blog post preview with green background - fills remaining width */}
            <div className="flex-1 bg-[#384d3a] hidden lg:block relative overflow-hidden">
              {randomPost && (
                <Link href={`/blog/${randomPost.slug.current}`} onClick={onClose}>
                  <div className="p-8 lg:p-12 h-full flex flex-col group cursor-pointer">
                    {/* Label */}
                    <p className="text-[#dbf6a3] text-sm uppercase tracking-wider mb-3 opacity-80">
                      Jaunākais raksts
                    </p>

                    {/* Blog post image - uses all available height */}
                    {randomPost.mainImage && (
                      <div className="relative w-full flex-grow mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={urlFor(randomPost.mainImage).url()}
                          alt={randomPost.mainImage.alt || randomPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1200px) 50vw, 40vw"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#faf6ed] mb-2 line-clamp-2 group-hover:text-[#dbf6a3] transition-colors duration-300">
                      {randomPost.title}
                    </h3>

                    {/* Excerpt */}
                    {randomPost.excerpt && (
                      <p className="text-[#faf6ed]/80 mb-3 line-clamp-2 text-sm lg:text-base">
                        {randomPost.excerpt}
                      </p>
                    )}

                    {/* Read more button */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center text-[#dbf6a3] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Lasīt vairāk</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Angled Animation */}
      <style jsx>{`
        .menu-reveal-open {
          transform: translateY(0) skewY(0deg);
          opacity: 1;
          clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);
          transition: transform 1100ms cubic-bezier(0.4, 0, 0.2, 1),
                      clip-path 1100ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-reveal-closed {
          transform: translateY(120%) skewY(-3deg);
          opacity: 1;
          clip-path: polygon(0 45%, 100% 0%, 100% 100%, 0 100%);
          transition: transform 1100ms cubic-bezier(0.4, 0, 0.2, 1),
                      clip-path 1100ms cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1);
        }

      `}</style>
    </>
  );
}