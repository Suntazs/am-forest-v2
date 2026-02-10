import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ArticleHero from '@/components/sections/articles/ArticleHero';
import { 
  ArticleContentSection, 
  ArticleFactorsSection,
  ArticleImageSection,
  ArticleIntroSection
} from '@/components/sections/articles/ArticleSection';
import ArticleCTA from '@/components/sections/articles/ArticleCTA';

const KasJazinaPirmsCirsanas = () => {
  const { t } = useTranslation('common');

  const factors = t('articles.beforeLogging.factors', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('articles.beforeLogging.meta.title')}</title>
        <meta name="description" content={t('articles.beforeLogging.meta.description')} />
        <meta property="og:title" content={t('articles.beforeLogging.meta.title')} />
        <meta property="og:description" content={t('articles.beforeLogging.meta.description')} />
        <link rel="canonical" href="https://amforest.lv/info/kas-jazina-pirms-cirsanas" />
      </Head>

      <ArticleHero 
        title={t('articles.beforeLogging.hero.title')}
        subtitle={t('articles.beforeLogging.hero.subtitle')}
      />

      {/* Introduction - full width, bigger text */}
      <ArticleIntroSection
        text={t('articles.beforeLogging.intro')}
        bgColor="#faf6ed"
      />

      {/* Key factors - 6 points */}
      <ArticleFactorsSection
        factors={Array.isArray(factors) ? factors : []}
        bgColor="#f3ecda"
      />

      {/* Image section */}
      <ArticleImageSection
        paragraphs={[t('articles.beforeLogging.conclusion')]}
        imageSrc="/image/kas-jazina-pirms-cirsanas-mezizstrade.jpg"
        imageAlt={t('articles.beforeLogging.imageAlt')}
        imagePosition="right"
        bgColor="#faf6ed"
      />

      {/* CTA */}
      <ArticleCTA
        heading={t('articles.beforeLogging.cta.heading')}
        description={t('articles.beforeLogging.cta.description')}
        buttonText={t('articles.beforeLogging.cta.button')}
      />
    </>
  );
};

export default KasJazinaPirmsCirsanas;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
