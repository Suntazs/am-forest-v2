"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

export default function Navbar({ onMenuToggle, isMenuOpen, setIsMenuOpen }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(true); // Default TRUE to prevent hiding on mobile before detection
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isMobileRef = useRef(true); // Ref for IMMEDIATE access in scroll handler
  const router = useRouter();
  const { t } = useTranslation('common');

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || 
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      isMobileRef.current = mobile; // Update ref FIRST (synchronous)
      setIsMobile(mobile);
      
      // Force visible on mobile
      if (mobile) {
        setIsVisible(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll handling - check ref INSIDE handler for immediate mobile detection
  useEffect(() => {
    const updateNavbar = () => {
      // CRITICAL: Check ref, not state, for immediate mobile detection
      if (isMobileRef.current) {
        setIsVisible(true);
        ticking.current = false;
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        // Always show at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        // Scrolling down - hide (added threshold to prevent jitter)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        // Scrolling up - show
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    // Initialize scroll position
    lastScrollY.current = window.scrollY;
    
    // DO NOT set isVisible(false) here - this was causing the mobile bug!
    // Let scroll events handle visibility changes naturally

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty deps - we use refs for immediate state

  const toggleMenu = useCallback(() => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  }, [isMenuOpen, setIsMenuOpen, onMenuToggle]);

  return (
    <>
    <nav className={`bg-[#243c36] fixed top-0 left-0 right-0 w-full z-[50] transition-transform duration-300 ease-out ${
      isVisible || isMobile ? 'translate-y-0' : '-translate-y-full'
    }`}
    style={{
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
    }}>
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
                Forest
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
                <span className="text-sm lg:text-base xl:text-lg whitespace-nowrap">{t('nav.address')}</span>
              </a>
            </div>
          </div>

          {/* Right side - Language switcher + hamburger menu button */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => {
                const newLocale = router.locale === 'lv' ? 'en' : 'lv';
                router.push(router.asPath, router.asPath, { locale: newLocale });
              }}
              className="text-neutral-200 hover:text-[#dbf6a3] transition-colors text-sm md:text-base font-medium px-2 py-1 rounded border border-neutral-200/30 hover:border-[#dbf6a3]/50"
              aria-label="Switch language"
            >
              {router.locale === 'lv' ? 'EN' : 'LV'}
            </button>

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
      </div>

      {/* Bottom border line */}
      <div className="w-full h-px bg-[#c7dccd]"></div>
    </nav>

    </>
  );
}