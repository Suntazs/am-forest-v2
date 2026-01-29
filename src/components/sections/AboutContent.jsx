"use client";
import React from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';
import { useTranslation } from 'next-i18next';

export default function AboutContent() {
  const { t } = useTranslation('common');
  return (
    <section className="relative bg-[#faf6ed] py-16 md:py-24 lg:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Image on the left */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <ProgressiveImage
                src="/image/beautiful-shot-forest-with-sunlight.png"
                alt={t('aboutContent.imageAlt')}
                className="w-full h-full"
              />
            </div>

            {/* Text on the right */}
            <div className="lg:pl-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6">
                {t('aboutContent.heading')}
              </h2>
              <p className="text-lg md:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
                {t('aboutContent.p1')}
              </p>
              <p className="text-lg md:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
                {t('aboutContent.p2')}
              </p>
              <p className="text-lg md:text-xl text-[#243c36]/80 leading-relaxed">
                {t('aboutContent.p3')}
              </p>
              
              {/* Optional CTA or stats */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">{t('aboutContent.stat1Value')}</p>
                  <p className="text-[#243c36]/70">{t('aboutContent.stat1Label')}</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">{t('aboutContent.stat2Value')}</p>
                  <p className="text-[#243c36]/70">{t('aboutContent.stat2Label')}</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">{t('aboutContent.stat3Value')}</p>
                  <p className="text-[#243c36]/70">{t('aboutContent.stat3Label')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}