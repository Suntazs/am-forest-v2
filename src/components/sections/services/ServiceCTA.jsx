"use client";
import React from 'react';
import { useContactModal } from '@/contexts/ContactModalContext';

const ServiceCTA = ({ 
  title = "Nepieciešami mūsu pakalpojumi?",
  description = "Sazinieties ar mums, lai saņemtu individuālu piedāvājumu jūsu projektam.",
  buttonText = "Sazināties ar mums"
}) => {
  const { openContactModal } = useContactModal();

  return (
    <section className="bg-[#243c36] py-20 md:py-32 relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <button 
          onClick={openContactModal}
          className="bg-[#dbf6a3] text-[#243c36] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#c5e891] transition-colors duration-300"
        >
          {buttonText}
        </button>
      </div>
      
      {/* Decorative curve - top left */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-20">
        <svg 
          className="w-60 h-40 md:w-96 md:h-64" 
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path 
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="#dbf6a3"
            strokeWidth="30"
          />
        </svg>
      </div>
    </section>
  );
};

export default ServiceCTA;