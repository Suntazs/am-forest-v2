import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ArticleHero from '@/components/sections/articles/ArticleHero';
import { 
  ArticleContentSection, 
  ArticleImageSection, 
  ArticleBulletSection,
  ArticleIntroSection
} from '@/components/sections/articles/ArticleSection';
import ArticleCTA from '@/components/sections/articles/ArticleCTA';

const KapecJakopjMezs = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('articles.forestMaintenance.meta.title')}</title>
        <meta name="description" content={t('articles.forestMaintenance.meta.description')} />
        <meta property="og:title" content={t('articles.forestMaintenance.meta.title')} />
        <meta property="og:description" content={t('articles.forestMaintenance.meta.description')} />
        <link rel="canonical" href="https://amforest.lv/info/kapec-jakopj-mezs" />
      </Head>

      <ArticleHero 
        title={t('articles.forestMaintenance.hero.title')}
        subtitle={t('articles.forestMaintenance.hero.subtitle')}
      />

      {/* Introduction - full width, bigger text */}
      <ArticleIntroSection
        text={t('articles.forestMaintenance.intro')}
        bgColor="#faf6ed"
      />

      {/* Agrotehniska kopsana */}
      <ArticleImageSection
        heading={t('articles.forestMaintenance.agrotechnical.heading')}
        paragraphs={[
          t('articles.forestMaintenance.agrotechnical.p1'),
          t('articles.forestMaintenance.agrotechnical.p2'),
          t('articles.forestMaintenance.agrotechnical.p3')
        ]}
        imageSrc="/image/kapec-jakopj-mezs-kopsana.jpg"
        imageAlt={t('articles.forestMaintenance.agrotechnical.imageAlt')}
        imagePosition="right"
        bgColor="#f3ecda"
      />

      {/* Jaunaudzu kopsana */}
      <ArticleImageSection
        heading={t('articles.forestMaintenance.youngStands.heading')}
        paragraphs={[
          t('articles.forestMaintenance.youngStands.p1'),
          t('articles.forestMaintenance.youngStands.p2'),
          t('articles.forestMaintenance.youngStands.p3')
        ]}
        imageSrc="/image/kapec-jakopj-mezs-jaunaudzes.webp"
        imageAlt={t('articles.forestMaintenance.youngStands.imageAlt')}
        imagePosition="left"
        bgColor="#faf6ed"
      />

      {/* Benefits */}
      <ArticleBulletSection
        heading={t('articles.forestMaintenance.benefits.heading')}
        bullets={t('articles.forestMaintenance.benefits.items', { returnObjects: true })}
        outro={t('articles.forestMaintenance.benefits.outro')}
        bgColor="#f3ecda"
      />

      {/* CTA */}
      <ArticleCTA
        heading={t('articles.forestMaintenance.cta.heading')}
        description={t('articles.forestMaintenance.cta.description')}
        buttonText={t('articles.forestMaintenance.cta.button')}
      />
    </>
  );
};

export default KapecJakopjMezs;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
