import React from 'react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import PerkamCirsmuHero from '@/components/sections/heros/PerkamCirsmuHero';
import BuyingProcess from '@/components/sections/BuyingProcess';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ReviewsSection from '@/components/sections/ReviewsSection';
import FAQ from '@/components/sections/faq';

const faqData = [
  {
    question: "Kāda ir cirsmas cena par kubikmetru Latvijā 2024. gadā?",
    answer: "Cirsmas cena Latvijā 2024. gadā svārstās no 35 līdz 85 EUR par kubikmetru atkarībā no koku sugas, kvalitātes, diametra un pieejamības. Priežu un egļu cirsmas ar liela diametra kokiem un labu pieejamību sasniedz augstākās cenas. AM Forest piedāvā bezmaksas profesionālu novērtēšanu, lai noteiktu jūsu cirsmas precīzu tirgus vērtību."
  },
  {
    question: "Kā pārdot cirsmu Latvijā - soli pa solim?",
    answer: "Cirsmas pārdošanas process: 1) Sazinieties ar AM Forest bezmaksas konsultācijai, 2) Mūsu eksperti veic profesionālu cirsmas uzmērīšanu un novērtēšanu, 3) Saņemat taisnīgu cenas piedāvājumu 24 stundu laikā, 4) Noformējam cirsmas pirkuma līgumu, 5) Nauda tiek pārskaitīta nekavējoties pēc līguma parakstīšanas. Vidēji process aizņem 3-7 dienas."
  },
  {
    question: "Vai izdevīgāk pārdot cirsmu uz celma vai izcirstu kokmateriālu?",
    answer: "AM Forest pērk cirsmas visos veidos - gan uz celma, gan jau izcirstus kokmateriālus. Cirsma uz celma ir ērtāka meža īpašniekam, jo visu darbu veic pircējs. Izcirsti kokmateriāli var dot lielāku peļņu, bet prasa papildu ieguldījumus un risku. Mēs nodrošinām konkurētspējīgu cenu abos gadījumos un varam palīdzēt izvēlēties izdevīgāko variantu."
  },
  {
    question: "Kādi faktori ietekmē cirsmas vērtību?",
    answer: "Galvenie faktori: koku suga (priede, egle, bērzs), koku diametrs un augstums, kokmateriālu kvalitāte (taisnums, zaru daudzums), pieejamība (ceļu kvalitāte, attālums), cirsmas lielums un koncentrācija. AM Forest eksperti novērtē visus šos faktorus, lai piedāvātu maksimāli izdevīgu cenu par jūsu cirsmu."
  }
];

const PerkamCirsmu = () => {
  return (
    <>
      <PerkamCirsmuHero />
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

export default PerkamCirsmu;