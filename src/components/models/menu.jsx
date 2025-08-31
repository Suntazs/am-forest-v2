"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MenuModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
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

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);


  // Don't render anything until mounted to prevent flash
  if (!isMounted || !hasBeenOpened) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/30 z-[10001] transition-opacity duration-600 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[10002] h-[650px] sm:h-auto sm:min-h-[500px] ${
          isOpen ? 'menu-reveal-open' : 'menu-reveal-closed'
        }`}
        style={{
          transformOrigin: 'bottom right'
        }}
      >
        {/* Background - Split colors */}
        <div className="absolute inset-0 bg-[#f3ecda]"></div>
        
        {/* Black line at top - full width */}
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-neutral-900 z-10 transition-opacity duration-1100 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Menu Content */}
        <div className="relative h-full flex flex-col pt-[2px]">
          {/* Header with close button - sticky at top */}
          <div className="absolute sm:absolute top-0 right-0 z-20 p-4 sm:p-6 bg-[#f3ecda] sm:bg-transparent">
            <button 
              onClick={onClose}
              className="text-neutral-900 sm:text-[#faf6ed] hover:text-[#dbf6a3] transition-colors p-3 hover:bg-[#faf6ed]/10 rounded-lg"
            >
              <svg className="w-8 h-8 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Container - Responsive Layout */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-y-auto pt-20 sm:pt-0">
            {/* Left Side - Navigation Links */}
            <div className="flex flex-col">
              {/* Navigation Links - responsive columns */}
              <div 
                className="grid grid-cols-2 border-b border-neutral-900 sm:border-r relative overflow-hidden flex-1"
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
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    onMouseEnter={() => handleLinkMouseEnter(1)}
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    About
                  </Link>
                  <Link 
                    href="/services" 
                    onMouseEnter={() => handleLinkMouseEnter(2)}
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 text-center"
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
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Pērkam mežu
                  </Link>
                  <Link 
                    href="/perkam-cirsmu" 
                    onMouseEnter={() => handleLinkMouseEnter(4)}
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 border-b border-neutral-900 text-center"
                    onClick={onClose}
                  >
                    Pērkam cirsmu
                  </Link>
                  <Link 
                    href="/contact" 
                    onMouseEnter={() => handleLinkMouseEnter(5)}
                    className="relative z-10 group block text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 text-center"
                    onClick={onClose}
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Bottom button section */}
              <div className="sm:border-r border-b border-neutral-900">
                {/* Full width button */}
                <div className="flex items-center hover:bg-[#dbf6a3] transition-all group cursor-pointer" onClick={() => {
                      // Delay closing to allow transition to start
                      setTimeout(() => onClose(), 800);
                    }}>
                  <div
                    className="flex-1 text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 group-hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8 text-left"
                  >
                    Get Consultation
                  </div>
                  
                  {/* Plus sign on the right */}
                  <div 
                    className="text-3xl sm:text-4xl lg:text-6xl font-light text-neutral-900 group-hover:text-[#243c36] transition-colors py-6 sm:py-8 px-4 sm:px-8"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Blog Content Centered - Mobile: Bottom */}
            <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-[#f3ecda] lg:bg-[#384d3a] min-h-[300px] lg:min-h-0">
              <div className="w-full max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-medium text-neutral-900 lg:text-[#faf6ed] mb-3 sm:mb-4">Latest News</h3>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm sm:text-base text-neutral-600 lg:text-[#faf6ed]/80">Dec 15, 2024</span>
                  <span className="text-sm bg-neutral-200 lg:bg-[#dbf6a3] px-3 py-1 rounded text-neutral-700 lg:text-[#243c36]">Updates</span>
                </div>
                <p className="text-base sm:text-lg text-neutral-700 lg:text-[#faf6ed]/90 mb-4 sm:mb-6 leading-relaxed">
                  Discover our latest forest management solutions and sustainable practices that help preserve natural ecosystems.
                </p>
                <div className="flex items-center justify-between">
                  <a href="#learn-more" className="text-sm sm:text-base text-[#243c36] lg:text-[#dbf6a3] hover:text-neutral-900 lg:hover:text-[#faf6ed] transition-colors underline decoration-current">
                    Learn more
                  </a>
                  <span className="text-sm text-neutral-500 lg:text-[#faf6ed]/60">Dec 15</span>
                </div>
              </div>
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