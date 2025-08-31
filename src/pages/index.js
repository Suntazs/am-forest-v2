import HomeHero from "@/components/sections/heros/HomeHero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import Reviews from "@/components/sections/reviews";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import ImageLinks from "@/components/sections/ImageLinks";

const faqData = [
  {
    question: "Kādi meža apsaimniekošanas pakalpojumi tiek piedāvāti?",
    answer: "Mēs piedāvājam pilnu meža apsaimniekošanas ciklu: meža inventarizāciju, apsaimniekošanas plānu izstrādi, jaunaudžu kopšanu, meža stādīšanu, sanitāro ciršu veikšanu, kā arī konsultācijas par ilgtspējīgu meža apsaimniekošanu."
  },
  {
    question: "Vai piedāvājat kokmateriālu iepirkšanu?",
    answer: "Jā, mēs iepērkam kokmateriālus tieši no meža īpašniekiem. Nodrošinām konkurētspējīgas cenas, profesionālu novērtēšanu un ātru norēķinu. Strādājam ar dažādu sugu kokmateriāliem - priedi, egli, bērzu un citas koku sugas."
  },
  {
    question: "Kā notiek meža inventarizācija?",
    answer: "Meža inventarizācija ietver detalizētu meža resursu uzskaiti un novērtēšanu. Mūsu speciālisti izmanto mūsdienīgas tehnoloģijas un metodes, lai noteiktu koku sugu sastāvu, vecumu, augšanas apjomus un meža veselības stāvokli. Pēc inventarizācijas saņemsiet detalizētu atskaiti ar ieteikumiem."
  },
  {
    question: "Kādas ir meža atjaunošanas iespējas pēc ciršanas?",
    answer: "Piedāvājam vairākas meža atjaunošanas metodes: dabisko atjaunošanos, mākslīgo meža atjaunošanu ar stādīšanu vai sēšanu. Palīdzam izvēlēties piemērotākās koku sugas konkrētajiem augšanas apstākļiem un nodrošinām kvalitatīvu stādmateriālu."
  },
  {
    question: "Vai sniedzat konsultācijas par ES un valsts atbalsta programmām?",
    answer: "Jā, mūsu speciālisti sniedz konsultācijas par pieejamajiem ES fondiem un valsts atbalsta programmām meža īpašniekiem. Palīdzam sagatavot nepieciešamo dokumentāciju un pieteikumus, kā arī konsultējam par atbalsta saņemšanas nosacījumiem."
  },
  {
    question: "Kā tiek noteikta kokmateriālu cena?",
    answer: "Kokmateriālu cena tiek noteikta, ņemot vērā vairākus faktorus: koku sugu, kvalitāti, sortimentu struktūru, pievešanas attālumu un tirgus situāciju. Katram objektam veicam individuālu novērtēšanu un piedāvājam labāko iespējamo cenu."
  }
];

export default function Home() {
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
            Biežāk uzdotie jautājumi
          </h2>
          <FAQ faqData={faqData} />
        </div>
      </section>
      <CTA />
    </div>
  );
}