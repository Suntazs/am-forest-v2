"use client";
import React from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';
import { useTranslation } from 'next-i18next';

const ServiceDetails = ({ 
  title, 
  description, 
  bulletPoints = [], 
  imageUrl = null,
  imageAlt,
  reverse = false 
}) => {
  const { t } = useTranslation('common');
  const resolvedAlt = imageAlt || t('serviceSlug.noDescription');
  return (
    <section className=" py-20 md:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-700 mb-8">
              {title}
            </h2>
            <div className="space-y-6 text-lg text-neutral-600">
              <p className="leading-relaxed">
                {description}
              </p>
              {bulletPoints.length > 0 && (
                <ul className="space-y-4">
                  {bulletPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#243c36] mr-4 text-2xl flex-shrink-0">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className={`${reverse ? 'lg:order-1' : ''} relative`}>
            {imageUrl ? (
              <div className="aspect-[4/3] overflow-hidden">
                <ProgressiveImage
                  src={imageUrl}
                  alt={resolvedAlt}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="aspect-[4/3] bg-[#f3ecda] flex items-center justify-center">
                <p className="text-[#243c36] text-xl opacity-50">{resolvedAlt}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;