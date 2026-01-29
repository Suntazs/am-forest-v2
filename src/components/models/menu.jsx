"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from 'next-i18next';

export default function MenuModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { t } = useTranslation('common');
  
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
      // Start with closed state, then animate open
      setTimeout(() => setIsAnimating(true), 50);
    } else if (isOpen) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, hasBeenOpened]);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Prevent scroll on mobile
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Also prevent touch scrolling
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';

      return () => {
        // Restore scroll
        const savedScrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';

        window.scrollTo(0, parseInt(savedScrollY || '0', 10) * -1);
      };
    }
  }, [isOpen]);


  // Don't render anything until mounted and has been opened at least once
  if (!isMounted || !hasBeenOpened) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 z-[19998] transition-opacity duration-300 md:duration-600 ${
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'none' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[19999] h-auto ${
          isAnimating ? 'menu-reveal-open' : 'menu-reveal-closed'
        }`}
        style={{
          transformOrigin: 'bottom right',
          willChange: 'transform'
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
          <div className="sm:absolute sm:top-0 sm:right-0 sm:z-20 sm:p-4 bg-[#f3ecda] sm:bg-transparent border-b border-neutral-900 sm:border-0">
            <div className="flex justify-end">
              <button 
                onClick={onClose}
                className="text-neutral-900 hover:text-[#243c36] transition-colors p-4 sm:p-2 hover:bg-neutral-900/5 border-l border-neutral-900 sm:border sm:border-neutral-900 sm:rounded-lg"
              >
                <svg className="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Container - Responsive Layout */}
          <div className="flex-1 flex flex-col overflow-y-auto sm:overflow-visible sm:pt-0" style={{ WebkitOverflowScrolling: 'touch' }}>
            {/* Navigation Links - Full width */}
            <div 
              className="flex flex-col sm:grid sm:grid-cols-2 w-full relative"
              onMouseLeave={handleLinkMouseLeave}
            >
              {/* Hover background effect for desktop */}
              {hoveredIndex !== null && hoveredIndex < 6 && (
                <div
                  className={`absolute pointer-events-none z-0 transition-all ease-out hidden sm:block ${isHovering ? 'opacity-100 duration-200' : 'opacity-0 duration-300'}`}
                  style={{
                    left: hoveredIndex >= 3 ? '50%' : '0%',
                    top: `${(hoveredIndex % 3) * 33.33}%`,
                    width: '50%',
                    height: '33.33%',
                    backgroundColor: '#dbf6a3'
                  }}
                />
              )}

              {/* Left Column on desktop / All links stacked on mobile */}
              <div className="sm:border-r border-neutral-900 relative z-0">
                <Link 
                  href="/" 
                  onMouseEnter={() => handleLinkMouseEnter(0)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 border-b border-neutral-900 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.home')}
                </Link>
                <Link 
                  href="/about" 
                  onMouseEnter={() => handleLinkMouseEnter(1)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 border-b border-neutral-900 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.about')}
                </Link>
                <Link 
                  href="/services" 
                  onMouseEnter={() => handleLinkMouseEnter(2)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 border-b sm:border-b-0 border-neutral-900 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.services')}
                </Link>
              </div>

              {/* Right Column on desktop / Continues stack on mobile */}
              <div className="relative z-0">
                <Link 
                  href="/perkam-mezu" 
                  onMouseEnter={() => handleLinkMouseEnter(3)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 border-b border-neutral-900 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.perkamMezu')}
                </Link>
                <Link 
                  href="/perkam-cirsmu" 
                  onMouseEnter={() => handleLinkMouseEnter(4)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 border-b border-neutral-900 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.perkamCirsmu')}
                </Link>
                <Link 
                  href="/contact" 
                  onMouseEnter={() => handleLinkMouseEnter(5)}
                  className="relative z-10 group block text-2xl sm:text-3xl lg:text-5xl font-light text-neutral-900 hover:text-[#243c36] hover:bg-[#dbf6a3] sm:hover:bg-transparent transition-colors py-4 sm:py-5 lg:py-6 px-6 sm:px-8 text-left sm:text-center"
                  onClick={onClose}
                >
                  {t('menu.contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Angled Animation */}
      <style jsx>{`
        @media (max-width: 768px) {
          .menu-reveal-open {
            transform: translateY(0) translateZ(0);
            opacity: 1;
            transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1),
                        opacity 300ms ease-out;
            -webkit-transform: translateY(0) translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          .menu-reveal-closed {
            transform: translateY(100%) translateZ(0);
            opacity: 0;
            transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1),
                        opacity 300ms ease-out;
            -webkit-transform: translateY(100%) translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
        }

        @media (min-width: 769px) {
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
        }
      `}</style>
    </>
  );
}