import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomeHero from "@/components/sections/heros/HomeHero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Reviews from "@/components/sections/reviews";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import ImageLinks from "@/components/sections/ImageLinks";

export default function Home() {
  const { t } = useTranslation('common');

  const faqData = t('homeFaq', { returnObjects: true });

  return (
    <div className="">
      <HomeHero />
      <Services />
      <About />
      <Reviews />
      <ImageLinks />
      <section className="relative py-20 bg-[#faf6ed] overflow-hidden">
        <div className="flex flex-col px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight mb-8 md:mb-12 lg:mb-16">
            {t('faq.heading')}
          </h2>
          <FAQ faqData={faqData} />
        </div>
      </section>
      <CTA />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}