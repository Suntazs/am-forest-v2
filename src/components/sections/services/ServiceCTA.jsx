"use client";
import React, { useEffect, useRef } from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { useTranslation } from 'next-i18next';

const ServiceCTA = ({ 
  title,
  description,
  buttonText
}) => {
  const { openContactModal } = useContactModal();
  const { t } = useTranslation('common');
  const resolvedTitle = title || t('cta.heading');
  const resolvedDescription = description || t('cta.button');
  const resolvedButtonText = buttonText || t('cta.button');
  const flowerRef = useRef(null);

  useEffect(() => {
    if (flowerRef.current) {
      flowerRef.current.style.animation = 'spin 10s linear infinite';
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#243c36]">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="relative">
          <div className="py-20 md:py-32 text-center relative">
            {/* Floating flower - top right */}
            <div className="absolute top-8 right-8 hidden md:block">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="48" 
                height="48" 
                fill="none" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
                ref={flowerRef}
                className="w-12 h-12 opacity-30"
              >
                <g clipPath="url(#flower-cta)">
                  <path 
                    fill="#dbf6a3" 
                    d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"
                  />
                </g>
                <defs>
                  <clipPath id="flower-cta">
                    <path fill="#fff" d="M0 24h24V0H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#faf6ed] mb-6">
              {resolvedTitle}
            </h2>
            <p className="text-lg md:text-xl text-[#faf6ed]/80 mb-10 max-w-2xl mx-auto">
              {resolvedDescription}
            </p>
            
            <button 
              onClick={openContactModal}
              className="bg-[#faf6ed] text-[#243c36] px-8 py-4 font-semibold text-lg hover:text-[#243c36] transition-all duration-300 relative overflow-hidden group inline-block"
            >
              <span className="relative z-10">{resolvedButtonText}</span>
              {/* Green background that slides up from bottom on hover */}
              <span className="absolute bottom-0 left-0 w-full h-0 bg-[#dbf6a3] transition-all duration-300 ease-out group-hover:h-full"></span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default ServiceCTA;