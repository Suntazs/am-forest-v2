"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar({ onMenuToggle, isMenuOpen, setIsMenuOpen }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let locomotiveScroll;
    let normalScrollHandler;
    
    // Handler for Locomotive Scroll
    const handleLocomotiveScroll = (obj) => {
      const currentScrollY = obj.scroll.y;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Fallback handler for normal scroll
    normalScrollHandler = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Try to use Locomotive Scroll first, with fallback to normal scroll
    const initScrollListener = () => {
      // Clear any existing listeners
      if (locomotiveScroll) {
        locomotiveScroll.off('scroll', handleLocomotiveScroll);
      }
      window.removeEventListener('scroll', normalScrollHandler);

      // Check for Locomotive Scroll
      if (window.locomotiveScroll) {
        locomotiveScroll = window.locomotiveScroll;
        locomotiveScroll.on('scroll', handleLocomotiveScroll);
      } else {
        // Use normal scroll as fallback
        window.addEventListener('scroll', normalScrollHandler);
      }
    };

    // Initialize on mount and route change
    initScrollListener();

    // Re-initialize after a small delay to ensure DOM is ready
    const reinitTimer = setTimeout(() => {
      initScrollListener();
    }, 500);

    // Check periodically for Locomotive Scroll (in case it loads later)
    const checkInterval = setInterval(() => {
      if (window.locomotiveScroll && !locomotiveScroll) {
        initScrollListener();
        clearInterval(checkInterval);
      }
    }, 1000);

    // Clear check interval after 5 seconds (stop checking)
    const clearCheckTimeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 5000);

    return () => {
      clearTimeout(reinitTimer);
      clearTimeout(clearCheckTimeout);
      clearInterval(checkInterval);
      if (locomotiveScroll) {
        locomotiveScroll.off('scroll', handleLocomotiveScroll);
      }
      window.removeEventListener('scroll', normalScrollHandler);
    };
  }, [lastScrollY, router.pathname]); // Re-run when route changes

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    if (onMenuToggle) onMenuToggle(false);
  };

  return (
    <>
    <nav className={`bg-[#243c36] fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0.0,0.2,1)] ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-95'
    }`}
    style={{ top: 0 }}>
      <div className="w-full px-4 sm:px-6 md:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Logo, company name, and contact information */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {/* Logo and company name */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#faf6ed] rounded-lg flex items-center justify-center flex-shrink-0">
                {/* Logo placeholder */}
                <span className="text-[#243c36] font-bold text-lg md:text-xl lg:text-2xl">AM</span>
              </div>
              <div className="text-neutral-200 font-semibold text-lg md:text-xl lg:text-2xl whitespace-nowrap">
                AM Forest
              </div>
            </div>

            {/* Contact links - responsive sizing */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8">
              {/* Email */}
              <a 
                href="mailto:info@amforest.lv" 
                className="flex items-center gap-1.5 md:gap-2 text-neutral-200 hover:text-[#dbf6a3] transition-colors"
              >
                <svg 
                  className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-sm lg:text-base xl:text-lg whitespace-nowrap">info@amforest.lv</span>
              </a>

              {/* Phone */}
              <a 
                href="tel:+37129123456" 
                className="flex items-center gap-1.5 md:gap-2 text-neutral-200 hover:text-[#dbf6a3] transition-colors"
              >
                <svg 
                  className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span className="text-sm lg:text-base xl:text-lg whitespace-nowrap">+371 29 123 456</span>
              </a>

              {/* Address */}
              <a 
                href="https://maps.google.com/?q=Riga,Latvia" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 md:gap-2 text-neutral-200 hover:text-[#dbf6a3] transition-colors"
              >
                <svg 
                  className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span className="text-sm lg:text-base xl:text-lg whitespace-nowrap">Riga, Latvia</span>
              </a>
            </div>
          </div>

          {/* Right side - Unique hamburger menu button */}
          <button 
            onClick={toggleMenu}
            className="relative group p-3 hover:bg-[#faf6ed]/10 rounded-lg transition-colors"
          >
            <div className="flex flex-col gap-1.5">
              <div className="w-8 h-0.5 bg-[#faf6ed] rounded-full transform group-hover:translate-x-1 transition-transform duration-300"></div>
              <div className="w-6 h-0.5 bg-[#faf6ed] rounded-full ml-1 group-hover:w-8 group-hover:ml-0 transition-all duration-300"></div>
              <div className="w-7 h-0.5 bg-[#faf6ed] rounded-full group-hover:translate-x-1 transition-transform duration-300"></div>
            </div>
            
            {/* Decorative dots */}
            <div className="absolute -right-1 -top-1 w-2 h-2 bg-[#dbf6a3] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -left-1 -bottom-1 w-1.5 h-1.5 bg-[#faf6ed] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"></div>
          </button>
        </div>
      </div>
      
      {/* Bottom border line */}
      <div className="w-full h-px bg-[#c7dccd]"></div>
    </nav>
    
    </>
  );
}