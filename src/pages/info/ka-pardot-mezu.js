import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ArticleHero from '@/components/sections/articles/ArticleHero';
import { 
  ArticleContentSection, 
  ArticleImageSection, 
  ArticleBulletSection,
  ArticleFactorsSection,
  ArticleIntroSection,
  ArticleTwoColumnSection,
  ArticleTextChecklistSection
} from '@/components/sections/articles/ArticleSection';
import ArticleCTA from '@/components/sections/articles/ArticleCTA';

const KaPardotMezu = () => {
  const { t } = useTranslation('common');

  const priceFactors = t('articles.sellForest.priceFactors.items', { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t('articles.sellForest.meta.title')}</title>
        <meta name="description" content={t('articles.sellForest.meta.description')} />
        <meta property="og:title" content={t('articles.sellForest.meta.title')} />
        <meta property="og:description" content={t('articles.sellForest.meta.description')} />
        <link rel="canonical" href="https://amforest.lv/info/ka-pardot-mezu" />
      </Head>

      <ArticleHero 
        title={t('articles.sellForest.hero.title')}
        subtitle={t('articles.sellForest.hero.subtitle')}
      />

      {/* Introduction - full width, bigger text */}
      <ArticleIntroSection
        text={t('articles.sellForest.intro')}
        bgColor="#faf6ed"
      />

      {/* When to consider selling */}
      <ArticleImageSection
        heading={t('articles.sellForest.whenToSell.heading')}
        paragraphs={[
          t('articles.sellForest.whenToSell.p1'),
          t('articles.sellForest.whenToSell.p2')
        ]}
        imageSrc="/image/beautiful-shot-forest-with-sunlight.png"
        imageAlt={t('articles.sellForest.whenToSell.imageAlt')}
        imagePosition="right"
        bgColor="#f3ecda"
      />

      {/* Two columns: Price factors + Ways to sell */}
      <ArticleTwoColumnSection
        leftColumn={{
          heading: t('articles.sellForest.priceFactors.heading'),
          intro: t('articles.sellForest.priceFactors.intro'),
          bullets: Array.isArray(priceFactors) ? priceFactors : [],
          outro: t('articles.sellForest.priceFactors.outro')
        }}
        rightColumn={{
          heading: t('articles.sellForest.waysToSell.heading'),
          paragraphs: [t('articles.sellForest.waysToSell.p1')]
        }}
        bgColor="#faf6ed"
      />

      {/* How to prepare - image on left, heading + checklist on right */}
      <ArticleImageSection
        heading={t('articles.sellForest.preparation.heading')}
        paragraphs={[t('articles.sellForest.preparation.intro')]}
        bullets={t('articles.sellForest.preparation.items', { returnObjects: true })}
        outro={t('articles.sellForest.preparation.outro')}
        imageSrc="/image/amforest-Forwarder.jpg"
        imageAlt={t('articles.sellForest.preparation.imageAlt')}
        imagePosition="left"
        bgColor="#f3ecda"
      />

      {/* How AM Forest helps */}
      <ArticleContentSection
        heading={t('articles.sellForest.howWeHelp.heading')}
        paragraphs={[
          t('articles.sellForest.howWeHelp.p1'),
          t('articles.sellForest.howWeHelp.p2')
        ]}
        bgColor="#f3ecda"
      />

      {/* CTA */}
      <ArticleCTA
        heading={t('articles.sellForest.cta.heading')}
        description={t('articles.sellForest.cta.description')}
        buttonText={t('articles.sellForest.cta.button')}
      />
    </>
  );
};

export default KaPardotMezu;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
