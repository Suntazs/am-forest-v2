import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Services from '@/components/sections/services';
import CTA from '@/components/sections/cta';

export default function ServicesPage() {
  const { t } = useTranslation('common');

  return (
    <>
      <section className="relative bg-[#243c36] overflow-hidden">
        <div className="min-h-[500px] max-h-[600px] flex items-center pt-20">
          <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24 w-full relative">
            {/* Vertical line on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#dbf6a3] opacity-30 hidden md:block"></div>
            
            <div className="max-w-7xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#faf6ed] leading-tight mb-8 md:mb-12">
                {t('servicesPage.heading')}
              </h1>
              
              {/* Description with offset */}
              <div className="ml-0 md:ml-24 lg:ml-32">
                <p className="text-lg md:text-xl text-[#faf6ed]/80 max-w-3xl leading-relaxed">
                  {t('servicesPage.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Services showHeader={false} showFullServices={true} />
      <CTA />
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}