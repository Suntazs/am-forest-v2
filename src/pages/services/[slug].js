import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ServiceHero from '@/components/sections/services/ServiceHero';
import ServiceFeatures from '@/components/sections/services/ServiceFeatures';
import ServiceDetails from '@/components/sections/services/ServiceDetails';
import FAQ from '@/components/sections/faq';
import ServiceCTA from '@/components/sections/services/ServiceCTA';
import servicesData from '@/data/servicesData';

// Remove the inline data as we're now using the external file
/*
const servicesDataTemp = {
  'treilera-pakalpojumi': {
    meta: {
      title: "Treilera pakalpojumi | AM Forest",
      description: "Profesionāli treilera pakalpojumi meža un kokmateriālu transportēšanai Latvijā. Droša un efektīva kravu pārvietošana.",
      keywords: "treilera pakalpojumi, kokmateriālu transportēšana, meža tehnika"
    },
    hero: {
      title: "Treilera pakalpojumi",
      description: "Profesionāli treilera pakalpojumi meža un kokmateriālu transportēšanai. Mūsu specializētā tehnika nodrošina drošu un efektīvu kravu pārvietošanu."
    },
    features: {
      title: "Galvenās priekšrocības",
      items: [
        {
          title: "Liela kravnesība",
          description: "Mūsu treileri spēj pārvadāt līdz 25 tonnām kravas, nodrošinot efektīvu kokmateriālu transportēšanu.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="25" y="35" width="50" height="30" />
              <circle cx="35" cy="70" r="8" />
              <circle cx="65" cy="70" r="8" />
            </svg>
          )
        },
        {
          title: "Visa veida ceļi",
          description: "Specializētā tehnika ļauj strādāt gan meža ceļos, gan sarežģītās reljefa vietās.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 50 Q35 30, 50 50 T80 50" />
              <path d="M20 60 Q35 40, 50 60 T80 60" />
            </svg>
          )
        },
        {
          title: "Pieredzējuši operatori",
          description: "Mūsu komanda nodrošina profesionālu un drošu kravu pārvadāšanu jebkuros apstākļos.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="35" r="10" />
              <path d="M35 55 Q50 45, 65 55 L65 75 L35 75 Z" />
            </svg>
          )
        }
      ]
    },
    details: {
      title: "Pakalpojuma apraksts",
      description: "Mūsu treilera pakalpojumi ietver pilnu kokmateriālu transportēšanas ciklu no meža līdz gala punktam. Specializētā tehnika un pieredzējuši operatori garantē kvalitatīvu un savlaicīgu pakalpojuma izpildi.",
      bulletPoints: [
        "Kokmateriālu iekraušana un izkraušana",
        "Transportēšana pa meža ceļiem",
        "Kravu nostiprināšana un drošība",
        "Dokumentācijas noformēšana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kāda ir maksimālā kravnesība?",
        answer: "Mūsu treileri var pārvadāt kravas līdz 25 tonnām, atkarībā no konkrētā transportlīdzekļa specifikācijas un ceļa apstākļiem."
      },
      {
        question: "Vai strādājat visos laika apstākļos?",
        answer: "Jā, mūsu tehnika ir piemērota darbam dažādos laika apstākļos. Tomēr ekstremālos apstākļos mēs izvērtējam drošības riskus."
      },
      {
        question: "Kā tiek aprēķināta pakalpojuma cena?",
        answer: "Cena tiek aprēķināta, ņemot vērā attālumu, kravas apjomu, ceļa apstākļus un darba specifiku. Katram projektam tiek sagatavots individuāls piedāvājums."
      }
    ],
    cta: {
      title: "Nepieciešami treilera pakalpojumi?",
      description: "Sazinieties ar mums, lai saņemtu individuālu piedāvājumu jūsu projektam.",
      buttonText: "Pieprasīt piedāvājumu"
    }
  },
  'mezizvedeja-traktora-pakalpojumi': {
    meta: {
      title: "Mežizvedēja traktora pakalpojumi | AM Forest",
      description: "Specializēti mežizvedēja traktora pakalpojumi kokmateriālu savākšanai un transportēšanai sarežģītos meža apstākļos.",
      keywords: "mežizvedēja traktors, kokmateriālu izvešana, meža darbi"
    },
    hero: {
      title: "Mežizvedēja traktora pakalpojumi",
      description: "Specializēti mežizvedēja traktora pakalpojumi kokmateriālu savākšanai un transportēšanai sarežģītos meža apstākļos."
    },
    features: {
      title: "Tehnikas priekšrocības",
      items: [
        {
          title: "Augsta caurejamība",
          description: "Mežizvedēja traktors spēj strādāt mitrās un sarežģītās vietās, kur cita tehnika nevar piekļūt.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="30" y="40" width="40" height="25" />
              <path d="M25 65 L30 40 L70 40 L75 65" />
              <circle cx="35" cy="70" r="6" />
              <circle cx="65" cy="70" r="6" />
            </svg>
          )
        },
        {
          title: "Saudzē mežu",
          description: "Minimāls spiediens uz augsni un precīza manevrēšana samazina bojājumus mežam.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="60" r="15" />
              <path d="M50 45 L50 30 M40 35 L50 30 L60 35" />
            </svg>
          )
        },
        {
          title: "Efektīva iekraušana",
          description: "Jaudīgais hidrauliskais manipulators nodrošina ātru un precīzu kokmateriālu iekraušanu.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M30 60 L50 40 L70 60" />
              <rect x="45" y="60" width="10" height="20" />
            </svg>
          )
        }
      ]
    },
    details: {
      title: "Ko ietver pakalpojums",
      description: "Mežizvedēja traktora pakalpojumi nodrošina pilnu kokmateriālu izvešanas ciklu no cirsmas līdz krautuvei pie ceļa. Mūsu tehnika ir aprīkota ar modernām sistēmām efektīvam darbam.",
      bulletPoints: [
        "Kokmateriālu savākšana cirsmā",
        "Transportēšana līdz krautuvei",
        "Sortimentu šķirošana",
        "Krautuves iekārtošana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādās vietās var strādāt mežizvedēja traktors?",
        answer: "Mežizvedēja traktors ir piemērots darbam mitrās, purvainās un stāvās nogāzēs, kur parasta tehnika nevar piekļūt."
      },
      {
        question: "Cik daudz kokmateriālu var pārvadāt vienā reizē?",
        answer: "Atkarībā no traktora modeļa, vienā reisā var pārvadāt 10-15 kubikmetrus kokmateriālu."
      },
      {
        question: "Vai tehnika bojā meža augsni?",
        answer: "Mūsu mežizvedēja traktori ir aprīkoti ar platām riepām vai kāpurķēdēm, kas minimizē spiedienu uz augsni un samazina bojājumus."
      }
    ],
    cta: {
      title: "Vajadzīga kokmateriālu izvešana?",
      description: "Mūsu profesionālā komanda nodrošinās kvalitatīvu un savlaicīgu pakalpojumu.",
      buttonText: "Sazināties ar mums"
    }
  },
  // Add more services here following the same pattern...
  'universala-ritenu-traktora-pakalpojumi': {
    meta: {
      title: "Universālā riteņu traktora pakalpojumi | AM Forest",
      description: "9 tonnu universālā riteņu traktora pakalpojumi dažādiem meža darbiem. Profesionāla tehnika un operatori.",
      keywords: "universālais traktors, riteņu traktors, meža tehnika, 9 tonnas"
    },
    hero: {
      title: "Universālā riteņu traktora pakalpojumi",
      description: "9 tonnu universālā riteņu traktora pakalpojumi dažādiem meža un lauksaimniecības darbiem. Daudzfunkcionāla tehnika profesionāliem risinājumiem."
    },
    features: {
      title: "Traktora iespējas",
      items: [
        {
          title: "9 tonnu jauda",
          description: "Spēcīgs 9 tonnu traktors, kas piemērots smagiem darbiem un lielām slodzēm.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="25" y="40" width="50" height="20" />
              <circle cx="30" cy="70" r="8" />
              <circle cx="50" cy="70" r="8" />
              <circle cx="70" cy="70" r="8" />
            </svg>
          )
        },
        {
          title: "Universāls pielietojums",
          description: "Piemērots gan meža darbiem, gan lauksaimniecībai, gan celtniecības projektiem.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="50" cy="50" r="20" />
              <path d="M50 30 L50 50 L65 65" />
            </svg>
          )
        },
        {
          title: "Dažādi agregāti",
          description: "Iespējams aprīkot ar dažādiem darba agregātiem atbilstoši konkrētajam uzdevumam.",
          icon: (
            <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="40" y="30" width="20" height="40" />
              <path d="M30 40 L40 40 M60 40 L70 40" />
              <path d="M30 60 L40 60 M60 60 L70 60" />
            </svg>
          )
        }
      ]
    },
    details: {
      title: "Pakalpojuma piedāvājums",
      description: "Universālā riteņu traktora pakalpojumi aptver plašu darbu spektru - no meža kopšanas līdz ceļu uzturēšanai. Mūsu 9 tonnu traktors ir aprīkots ar nepieciešamajiem agregātiem kvalitatīvai darbu izpildei.",
      bulletPoints: [
        "Meža ceļu būve un uzturēšana",
        "Kravu pārvietošana un transportēšana",
        "Zemes planēšanas darbi",
        "Sniega tīrīšana ziemā",
        "Dažādi palīgdarbi būvniecībā"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādus darbus var veikt ar universālo traktoru?",
        answer: "Universālais traktors ir piemērots ceļu būvei, kravu pārvietošanai, zemes planēšanai, sniega tīrīšanai un citiem darbiem, kur nepieciešama spēcīga un daudzfunkcionāla tehnika."
      },
      {
        question: "Kāda ir traktora celtspēja?",
        answer: "Mūsu 9 tonnu universālais traktors var droši strādāt ar kravām līdz 9 tonnām, nodrošinot stabilu un drošu darbu."
      },
      {
        question: "Vai traktoru var izmantot lauksaimniecībā?",
        answer: "Jā, universālais traktors ir piemērots arī lauksaimniecības darbiem - augsnes apstrādei, sējai, ražas novākšanai un citiem darbiem."
      }
    ],
    cta: {
      title: "Nepieciešams universālais traktors?",
      description: "Profesionāla tehnika un pieredzējuši operatori jūsu projektu realizācijai.",
      buttonText: "Pieprasīt pakalpojumu"
    }
  }
  // Add remaining services data here...
};
*/

export async function getStaticPaths() {
  const paths = Object.keys(servicesData).map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const serviceData = servicesData[params.slug];
  
  if (!serviceData) {
    return { notFound: true };
  }

  return {
    props: {
      slug: params.slug,
      serviceData,
    },
  };
}

const ServicePage = ({ slug, serviceData }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!serviceData) {
    return <div>Service not found</div>;
  }

  const { meta, hero, features, details, faq, cta } = serviceData;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://amforest.lv/services/${slug}`} />
      </Head>

      <ServiceHero 
        title={hero.title}
        description={hero.description}
      />
      
      <ServiceFeatures 
        title={features.title}
        features={features.items}
      />
      
      <ServiceDetails 
        title={details.title}
        description={details.description}
        bulletPoints={details.bulletPoints}
        imageUrl={details.imageUrl}
      />

      {faq && faq.length > 0 && (
        <section className="relative py-20 bg-[#faf6ed] overflow-hidden">
          <div className="flex flex-col px-6 md:px-12 lg:px-20">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight mb-8 md:mb-12 lg:mb-16">
              Biežāk uzdotie jautājumi
            </h2>
            <FAQ faqData={faq} />
          </div>
        </section>
      )}
      
      <ServiceCTA 
        title={cta.title}
        description={cta.description}
        buttonText={cta.buttonText}
      />
    </>
  );
};

export default ServicePage;