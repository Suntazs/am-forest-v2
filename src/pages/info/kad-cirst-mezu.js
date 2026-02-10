import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ArticleHero from '@/components/sections/articles/ArticleHero';
import { 
  ArticleContentSection, 
  ArticleFactorsSection,
  ArticleIntroSection
} from '@/components/sections/articles/ArticleSection';
import ArticleCTA from '@/components/sections/articles/ArticleCTA';

const KadCirstMezu = () => {
  const { t } = useTranslation('common');

  const factors = t('articles.whenToHarvest.factors', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('articles.whenToHarvest.meta.title')}</title>
        <meta name="description" content={t('articles.whenToHarvest.meta.description')} />
        <meta property="og:title" content={t('articles.whenToHarvest.meta.title')} />
        <meta property="og:description" content={t('articles.whenToHarvest.meta.description')} />
        <link rel="canonical" href="https://amforest.lv/info/kad-cirst-mezu" />
      </Head>

      <ArticleHero 
        title={t('articles.whenToHarvest.hero.title')}
        subtitle={t('articles.whenToHarvest.hero.subtitle')}
      />

      {/* Introduction - full width, bigger text */}
      <ArticleIntroSection
        text={t('articles.whenToHarvest.intro')}
        bgColor="#faf6ed"
      />

      {/* Key factors */}
      <ArticleFactorsSection
        heading={t('articles.whenToHarvest.factorsHeading')}
        factors={Array.isArray(factors) ? factors : []}
        bgColor="#f3ecda"
      />

      {/* Conclusion */}
      <ArticleContentSection
        paragraphs={[t('articles.whenToHarvest.conclusion')]}
        bgColor="#faf6ed"
      />

      {/* CTA */}
      <ArticleCTA
        heading={t('articles.whenToHarvest.cta.heading')}
        description={t('articles.whenToHarvest.cta.description')}
        buttonText={t('articles.whenToHarvest.cta.button')}
      />
    </>
  );
};

export default KadCirstMezu;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
