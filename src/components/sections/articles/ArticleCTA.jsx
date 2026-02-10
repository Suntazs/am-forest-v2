"use client";
import React from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';

const ArticleCTA = ({ heading, description, buttonText, imageSrc = "/image/beautiful-shot-forest-with-sunlight.png" }) => {
  const { openContactModal } = useContactModal();

  return (
    <section className="relative bg-[#243c36] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[400px] md:min-h-[450px]">
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-2/5 relative">
          <div className="absolute inset-0">
            <ProgressiveImage
              src={imageSrc}
              alt=""
              className="w-full h-full opacity-70"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 md:px-12 lg:px-16 py-16 md:py-20 relative z-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 md:mb-6">
              {heading}
            </h2>
            {description && (
              <p className="text-lg md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                {description}
              </p>
            )}
            <button 
              onClick={openContactModal}
              className="bg-[#dbf6a3] text-[#243c36] px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#c8e885] transition-colors duration-300 shadow-lg"
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* Mobile image */}
        <div className="lg:hidden w-full h-48 relative">
          <ProgressiveImage
            src={imageSrc}
            alt=""
            className="w-full h-full opacity-70"
          />
        </div>
      </div>
    </section>
  );
};

export default ArticleCTA;
