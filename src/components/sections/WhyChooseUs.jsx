"use client";
import React from 'react';
import { useTranslation } from 'next-i18next';

const WhyChooseUs = () => {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 18v28M22 28l10-10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="32" cy="44" r="3" fill="currentColor"/>
        </svg>
      ),
      title: t('whyChooseUs.feature1.title'),
      description: t('whyChooseUs.feature1.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="20" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M20 32h24M20 40h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      title: t('whyChooseUs.feature2.title'),
      description: t('whyChooseUs.feature2.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 8v48M16 24h32M12 40h40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 32h8M48 32h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: t('whyChooseUs.feature3.title'),
      description: t('whyChooseUs.feature3.description'),
    },
    {
      icon: (
        <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 12L12 24v16l20 12 20-12V24L32 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M32 28v16M24 32l8 4 8-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: t('whyChooseUs.feature4.title'),
      description: t('whyChooseUs.feature4.description'),
    },
  ];

  return (
    <section className="relative bg-[#243c36] py-16 md:py-20 lg:py-24">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16 lg:mb-20">
          {t('whyChooseUs.heading')}
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="text-[#dbf6a3] mb-4 md:mb-6">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm md:text-base text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
