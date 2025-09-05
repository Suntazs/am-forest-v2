"use client";
import React from 'react';
import SplitText from '@/components/anim/split-text';
const ServiceHero = ({ title, description }) => {
  return (
    <section className="relative bg-[#243c36] overflow-hidden">
      <div className="min-h-[500px] lg:min-h-[600px] flex items-center">
        <div className="px-6 md:px-12 lg:px-20 pt-32 pb-20 md:py-32 w-full">
          <div className="max-w-5xl">

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#faf6ed] leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-[#faf6ed]/80 max-w-3xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom curve - similar to AboutHero */}
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
            stroke="#dbf6a3"
            strokeWidth="30"
            className="opacity-30"
          />
        </svg>
      </div>
    </section>
  );
};

export default ServiceHero;