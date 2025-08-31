"use client";
import React, { useState } from 'react';
import ServiceIcon from '@/components/ui/ServiceIcon';

const ServiceFeatures = ({ title, features }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) {
        setHoveredIndex(null);
      }
    }, 300);
  };

  return (
    <section className="bg-[#faf6ed] py-20 md:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {hoveredIndex !== null && (
            <div
              className={`absolute pointer-events-none z-0 transition-all ease-out ${
                isHovering ? 'opacity-100 duration-300' : 'opacity-0 duration-500'
              }`}
              style={{
                left: `${(hoveredIndex % 3) * 33.333}%`,
                top: `${Math.floor(hoveredIndex / 3) * 100}%`,
                width: '33.333%',
                height: '100%',
              }}
            >
              <div className="w-full h-full bg-[#dbf6a3]" />
            </div>
          )}
          
          {features.map((feature, index) => {
            const isLastCol = (index + 1) % 3 === 0;
            const isLastRow = index >= features.length - 3;
            
            return (
              <article
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`
                  relative flex flex-col items-start justify-start 
                  p-8 md:p-10 lg:p-12 z-10
                  ${!isLastRow ? 'border-b' : 'md:border-b-0'} border-[#243c36]
                  ${!isLastCol && index !== features.length - 1 ? 'md:border-r border-[#243c36]' : ''}
                  transition-all duration-300
                `}
              >
                {feature.iconPath && (
                  <div className="text-[#243c36] mb-6 opacity-70" aria-hidden="true">
                    <ServiceIcon iconPath={feature.iconPath} />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-semibold text-[#243c36] mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-base md:text-lg text-[#243c36] opacity-80 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;