import React from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PerkamCirsmuHero from '@/components/sections/heros/PerkamCirsmuHero';
import BuyingProcess from '@/components/sections/BuyingProcess';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQ from '@/components/sections/faq';

const PerkamCirsmu = () => {
  const { t } = useTranslation('common');
  const faqData = t('perkamCirsmuFaq', { returnObjects: true });

  return (
    <>
      <PerkamCirsmuHero />
      <BuyingProcess />
      <ProcessSteps />
      <ReviewsSection />
      <section className="relative py-20 bg-[#f3ecda] overflow-hidden">
        <div className="flex flex-col px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight mb-8 md:mb-12 lg:mb-16">
            {t('faq.heading')}
          </h2>
          <FAQ faqData={faqData} />
        </div>
      </section>
    </>
  );
};

export default PerkamCirsmu;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}