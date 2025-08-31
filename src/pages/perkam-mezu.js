import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import PerkamMezuHero from '@/components/sections/heros/PerkamMezuHero';
import BuyingProcess from '@/components/sections/BuyingProcess';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQ from '@/components/sections/faq';

const faqData = [
  {
    question: "Kāda ir meža īpašuma cena par hektāru Latvijā 2024. gadā?",
    answer: "Meža īpašuma cena Latvijā 2024. gadā svārstās no 2000 līdz 8000 EUR par hektāru atkarībā no koku sugas, vecuma, bonitātes un atrašanās vietas. Priežu un egļu audzes ar labu pieejamību un 40-80 gadu vecumu sasniedz augstākās cenas. AM Forest piedāvā bezmaksas profesionālu novērtēšanu, lai noteiktu jūsu meža īpašuma precīzu tirgus vērtību."
  },
  {
    question: "Kā pārdot meža īpašumu Latvijā - soli pa solim?",
    answer: "Meža īpašuma pārdošanas process: 1) Sazinieties ar AM Forest bezmaksas konsultācijai, 2) Mūsu eksperti veic profesionālu meža inventarizāciju un novērtēšanu, 3) Saņemat taisnīgu cenas piedāvājumu 48 stundu laikā, 4) Noformējam visus dokumentus pie notāra, 5) Nauda tiek pārskaitīta nekavējoties pēc darījuma. Vidēji process aizņem 7-14 dienas."
  },
  {
    question: "Vai izdevīgāk pārdot mežu ar cirsmu vai pēc izstrādes?",
    answer: "AM Forest pērk meža īpašumus visos stāvokļos - gan ar gatavām cirsmām, gan pēc izstrādes. Neizstrādāts mežs ar pieaugušām audzēm (60-80 gadi) bieži ir vērtīgāks, jo pircējam ir lielāka izvēles brīvība. Izstrādāti īpašumi ar jaunaudzēm (5-20 gadi) arī ir pieprasīti ilgtermiņa investīcijām. Mēs nodrošinām konkurētspējīgu cenu neatkarīgi no meža stāvokļa."
  },
  {
    question: "Kādi dokumenti nepieciešami meža īpašuma pārdošanai?",
    answer: "Meža pārdošanai nepieciešami: zemesgrāmatas apliecība, meža inventarizācijas dati (ne vecāki par 10 gadiem), personas apliecinošs dokuments un nodokļu nomaksas apliecinājums. AM Forest palīdz sakārtot trūkstošos dokumentus, veic jaunu inventarizāciju bez maksas un nodrošina juridisku atbalstu visā darījuma procesā, ieskaitot komunikāciju ar Valsts meža dienestu."
  }
];

const PerkamMezu = () => {
  return (
    <>
      <PerkamMezuHero />
      <BuyingProcess />
      <ProcessSteps />
      <ReviewsSection />
      <section className="relative py-20 bg-[#f3ecda] overflow-hidden">
        <div className="flex flex-col px-6 md:px-12 lg:px-20">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-neutral-700 leading-tight mb-8 md:mb-12 lg:mb-16">
            Biežāk uzdotie jautājumi
          </h2>
          <FAQ faqData={faqData} />
        </div>
      </section>
    </>
  );
};

export default PerkamMezu;