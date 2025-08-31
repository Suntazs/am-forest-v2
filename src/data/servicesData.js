// Don't import React here since this will be used in getStaticProps
const servicesData = {
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
          iconPath: [
            { type: 'rect', x: 25, y: 35, width: 50, height: 30 },
            { type: 'circle', cx: 35, cy: 70, r: 8 },
            { type: 'circle', cx: 65, cy: 70, r: 8 }
          ]
        },
        {
          title: "Visa veida ceļi",
          description: "Specializētā tehnika ļauj strādāt gan meža ceļos, gan sarežģītās reljefa vietās.",
          iconPath: [
            { type: 'path', d: 'M20 50 Q35 30, 50 50 T80 50' },
            { type: 'path', d: 'M20 60 Q35 40, 50 60 T80 60' }
          ]
        },
        {
          title: "Pieredzējuši operatori",
          description: "Mūsu komanda nodrošina profesionālu un drošu kravu pārvadāšanu jebkuros apstākļos.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 35, r: 10 },
            { type: 'path', d: 'M35 55 Q50 45, 65 55 L65 75 L35 75 Z' }
          ]
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
          iconPath: [
            { type: 'circle', cx: 30, cy: 70, r: 12 },
            { type: 'circle', cx: 70, cy: 70, r: 12 },
            { type: 'rect', x: 20, y: 30, width: 60, height: 25, rx: 5 },
            { type: 'path', d: 'M25 40 L35 25 L65 25 L75 40' }
          ]
        },
        {
          title: "Saudzē mežu",
          description: "Minimāls spiediens uz augsni un precīza manevrēšana samazina bojājumus mežam.",
          iconPath: [
            { type: 'path', d: 'M50 20 L60 40 L45 35 L55 50 L40 45 L50 60 L35 55 L45 70' },
            { type: 'circle', cx: 50, cy: 75, r: 20, strokeDasharray: '5,5' }
          ]
        },
        {
          title: "Efektīva iekraušana",
          description: "Jaudīgais hidrauliskais manipulators nodrošina ātru un precīzu kokmateriālu iekraušanu.",
          iconPath: [
            { type: 'rect', x: 20, y: 50, width: 30, height: 30 },
            { type: 'path', d: 'M50 50 L65 35 L80 50' },
            { type: 'circle', cx: 75, cy: 25, r: 5 },
            { type: 'path', d: 'M70 30 L75 25 L80 30' }
          ]
        }
      ]
    },
    details: {
      title: "Ko ietver pakalpojums",
      description: "Mežizvedēja traktora pakalpojumi nodrošina pilnu kokmateriālu izvešanas ciklu no cirsmas līdz krautuvei pie ceļa.",
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
      }
    ],
    cta: {
      title: "Vajadzīga kokmateriālu izvešana?",
      description: "Mūsu profesionālā komanda nodrošinās kvalitatīvu un savlaicīgu pakalpojumu.",
      buttonText: "Sazināties ar mums"
    }
  },

  'universala-ritenu-traktora-pakalpojumi': {
    meta: {
      title: "Universālā riteņu traktora pakalpojumi | AM Forest",
      description: "9 tonnu universālā riteņu traktora pakalpojumi dažādiem meža darbiem. Profesionāla tehnika un operatori.",
      keywords: "universālais traktors, riteņu traktors, meža tehnika, 9 tonnas"
    },
    hero: {
      title: "Universālā riteņu traktora pakalpojumi",
      description: "9 tonnu universālā riteņu traktora pakalpojumi dažādiem meža un lauksaimniecības darbiem."
    },
    features: {
      title: "Traktora iespējas",
      items: [
        {
          title: "9 tonnu jauda",
          description: "Spēcīgs 9 tonnu traktors, kas piemērots smagiem darbiem un lielām slodzēm.",
          iconPath: [
            { type: 'rect', x: 15, y: 45, width: 70, height: 25, rx: 5 },
            { type: 'circle', cx: 25, cy: 75, r: 10 },
            { type: 'circle', cx: 75, cy: 75, r: 10 },
            { type: 'rect', x: 30, y: 25, width: 40, height: 20, rx: 3 },
            { type: 'text', x: 50, y: 58, textAnchor: 'middle', fontSize: 8, fill: 'currentColor', content: '9T' }
          ]
        },
        {
          title: "Universāls pielietojums",
          description: "Piemērots gan meža darbiem, gan lauksaimniecībai, gan celtniecības projektiem.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 35 },
            { type: 'path', d: 'M30 30 L50 50 L70 30' },
            { type: 'path', d: 'M70 70 L50 50 L30 70' },
            { type: 'path', d: 'M30 70 L50 50 L70 70', strokeDasharray: '3,3' }
          ]
        },
        {
          title: "Dažādi agregāti",
          description: "Iespējams aprīkot ar dažādiem darba agregātiem atbilstoši konkrētajam uzdevumam.",
          iconPath: [
            { type: 'rect', x: 20, y: 40, width: 15, height: 20 },
            { type: 'rect', x: 40, y: 35, width: 15, height: 25 },
            { type: 'rect', x: 60, y: 45, width: 15, height: 15 },
            { type: 'path', d: 'M27 60 L47 60 L67 60', strokeWidth: 3 }
          ]
        }
      ]
    },
    details: {
      title: "Pakalpojuma piedāvājums",
      description: "Universālā riteņu traktora pakalpojumi aptver plašu darbu spektru - no meža kopšanas līdz ceļu uzturēšanai.",
      bulletPoints: [
        "Meža ceļu būve un uzturēšana",
        "Kravu pārvietošana un transportēšana",
        "Zemes planēšanas darbi",
        "Sniega tīrīšana ziemā"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādus darbus var veikt ar universālo traktoru?",
        answer: "Universālais traktors ir piemērots ceļu būvei, kravu pārvietošanai, zemes planēšanai un citiem darbiem."
      },
      {
        question: "Kāda ir traktora celtspēja?",
        answer: "Mūsu 9 tonnu universālais traktors var droši strādāt ar kravām līdz 9 tonnām."
      }
    ],
    cta: {
      title: "Nepieciešams universālais traktors?",
      description: "Profesionāla tehnika un pieredzējuši operatori jūsu projektu realizācijai.",
      buttonText: "Pieprasīt pakalpojumu"
    }
  },

  'kezu-ekskavatora-pakalpojumi': {
    meta: {
      title: "Ķēžu ekskavatora pakalpojumi | AM Forest",
      description: "20 tonnu ķēžu ekskavatora pakalpojumi celmu raušanai, grāvju rakšanai un zemes darbiem.",
      keywords: "ķēžu ekskavators, celmu raušana, grāvju rakšana, 20 tonnas"
    },
    hero: {
      title: "Ķēžu ekskavatora pakalpojumi",
      description: "20 tonnu ķēžu ekskavatora pakalpojumi celmu raušanai un grāvju rakšanai. Precīzi un efektīvi zemes darbi."
    },
    features: {
      title: "Ekskavatora priekšrocības",
      items: [
        {
          title: "20 tonnu jauda",
          description: "Jaudīgs 20 tonnu ekskavators smagiem zemes darbiem un celmu raušanai.",
          iconPath: [
            { type: 'rect', x: 30, y: 60, width: 40, height: 20, rx: 5 },
            { type: 'path', d: 'M20 30 L40 50 L60 30 L70 40', strokeWidth: 3 },
            { type: 'circle', cx: 75, cy: 25, r: 8 },
            { type: 'text', x: 50, y: 72, textAnchor: 'middle', fontSize: 6, fill: 'currentColor', content: '20T' }
          ]
        },
        {
          title: "Stabilitāte",
          description: "Ķēžu šasija nodrošina lielisku stabilitāti un caurejamību sarežģītā reljefā.",
          iconPath: [
            { type: 'rect', x: 15, y: 65, width: 70, height: 15, rx: 7 },
            { type: 'rect', x: 20, y: 68, width: 8, height: 9 },
            { type: 'rect', x: 32, y: 68, width: 8, height: 9 },
            { type: 'rect', x: 44, y: 68, width: 8, height: 9 },
            { type: 'rect', x: 56, y: 68, width: 8, height: 9 },
            { type: 'rect', x: 68, y: 68, width: 8, height: 9 }
          ]
        },
        {
          title: "Precizitāte",
          description: "Modernā hidraulika ļauj veikt ļoti precīzus darbus pat ierobežotās vietās.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 30 },
            { type: 'circle', cx: 50, cy: 50, r: 15 },
            { type: 'circle', cx: 50, cy: 50, r: 5 },
            { type: 'path', d: 'M50 20 L50 35' }
          ]
        }
      ]
    },
    details: {
      title: "Pakalpojumu klāsts",
      description: "Ķēžu ekskavatora pakalpojumi aptver plašu zemes darbu spektru meža teritorijās un būvlaukumos.",
      bulletPoints: [
        "Celmu raušana un sakņu izņemšana",
        "Grāvju un meliorācijas sistēmu rakšana",
        "Dīķu un ūdenskrātuvju rakšana",
        "Ceļu klātnes sagatavošana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Cik lielu celmu var izraut?",
        answer: "Mūsu 20 tonnu ekskavators spēj izraut celmus ar diametru līdz 1.5 metriem."
      },
      {
        question: "Kāds ir maksimālais rakšanas dziļums?",
        answer: "Ekskavators var rakt līdz 6 metru dziļumam atkarībā no darba apstākļiem."
      }
    ],
    cta: {
      title: "Nepieciešami ekskavatora pakalpojumi?",
      description: "Kvalitatīvi zemes darbi ar profesionālu tehniku.",
      buttonText: "Saņemt piedāvājumu"
    }
  },

  'kniebeja-ekskavatora-pakalpojumi': {
    meta: {
      title: "Kniebēja ekskavatora pakalpojumi | AM Forest",
      description: "Kniebēja ekskavatora pakalpojumi precīziem zemes darbiem. Manevrētspējīga tehnika šaurās vietās.",
      keywords: "kniebējs ekskavators, riteņu ekskavators, precīzi zemes darbi"
    },
    hero: {
      title: "Kniebēja ekskavatora pakalpojumi",
      description: "Kniebēja ekskavatora pakalpojumi precīziem zemes darbiem. Ideāli piemērots darbam ierobežotās teritorijās."
    },
    features: {
      title: "Ekskavatora īpašības",
      items: [
        {
          title: "Manevrētspēja",
          description: "Riteņu šasija ļauj ātri pārvietoties un strādāt šaurās vietās.",
          iconPath: [
            { type: 'circle', cx: 35, cy: 65, r: 15 },
            { type: 'circle', cx: 65, cy: 65, r: 15 },
            { type: 'rect', x: 25, y: 40, width: 50, height: 20, rx: 10 },
            { type: 'path', d: 'M40 30 Q50 20 60 30' }
          ]
        },
        {
          title: "Daudzpusība",
          description: "Piemērots gan rakšanas darbiem, gan kraušanas operācijām.",
          iconPath: [
            { type: 'path', d: 'M20 50 L40 30 L60 50 L80 30' },
            { type: 'path', d: 'M20 70 L40 50 L60 70 L80 50' },
            { type: 'circle', cx: 50, cy: 50, r: 8 }
          ]
        },
        {
          title: "Ātrums",
          description: "Spēj ātri pārvietoties starp darba vietām bez papildu transporta.",
          iconPath: [
            { type: 'path', d: 'M20 50 L80 50', strokeWidth: 3 },
            { type: 'path', d: 'M60 35 L80 50 L60 65', strokeWidth: 3 },
            { type: 'path', d: 'M25 40 L35 50 L25 60', strokeWidth: 2 }
          ]
        }
      ]
    },
    details: {
      title: "Ko varam paveikt",
      description: "Kniebēja ekskavatora pakalpojumi ir ideāli precīziem darbiem pilsētās un ierobežotās teritorijās.",
      bulletPoints: [
        "Precīzi rakšanas darbi",
        "Komunikāciju izbūve",
        "Ainavu veidošana",
        "Būvgruži un attīrīšanas darbi"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādās vietās var strādāt kniebējs ekskavators?",
        answer: "Kniebējs ekskavators ir ideāls darbam pilsētās, šaurās ielās un vietās ar ierobežotu piekļuvi."
      },
      {
        question: "Vai var pārvietoties pa koplietošanas ceļiem?",
        answer: "Jā, riteņu ekskavators var pārvietoties pa asfaltētiem ceļiem bez to bojāšanas."
      }
    ],
    cta: {
      title: "Vajadzīgi precīzi zemes darbi?",
      description: "Mūsu kniebēja ekskavatora operatori nodrošinās kvalitatīvu darbu izpildi.",
      buttonText: "Pieteikt pakalpojumu"
    }
  },

  'kokvedeja-pakalpojumi': {
    meta: {
      title: "Kokvedēja pakalpojumi | AM Forest",
      description: "Kokvedēja pakalpojumi kokmateriālu transportēšanai lielos apjomos. Droša un efektīva loģistika.",
      keywords: "kokvedējs, kokmateriālu transports, meža loģistika"
    },
    hero: {
      title: "Kokvedēja pakalpojumi",
      description: "Kokvedēja pakalpojumi kokmateriālu transportēšanai lielos apjomos. Mūsu autoparks nodrošina drošu un savlaicīgu piegādi."
    },
    features: {
      title: "Transporta priekšrocības",
      items: [
        {
          title: "Liela kravnesība",
          description: "Mūsu kokvedēji spēj pārvadāt līdz 40 tonnām kokmateriālu.",
          iconPath: [
            { type: 'rect', x: 20, y: 30, width: 60, height: 25, rx: 3 },
            { type: 'circle', cx: 30, cy: 65, r: 10 },
            { type: 'circle', cx: 70, cy: 65, r: 10 },
            { type: 'path', d: 'M25 35 L75 35', strokeWidth: 2 },
            { type: 'path', d: 'M25 40 L75 40', strokeWidth: 2 },
            { type: 'path', d: 'M25 45 L75 45', strokeWidth: 2 }
          ]
        },
        {
          title: "Moderna tehnika",
          description: "Aprīkoti ar jaunākajām drošības sistēmām un kravas nostiprināšanas iekārtām.",
          iconPath: [
            { type: 'rect', x: 30, y: 40, width: 40, height: 30, rx: 5 },
            { type: 'circle', cx: 50, cy: 55, r: 8 },
            { type: 'path', d: 'M40 30 L60 30', strokeWidth: 3 },
            { type: 'path', d: 'M35 25 L65 25', strokeWidth: 2 }
          ]
        },
        {
          title: "Loģistikas optimizācija",
          description: "Efektīva maršrutu plānošana samazina transporta izmaksas.",
          iconPath: [
            { type: 'path', d: 'M20 30 Q35 20 50 30 T80 30' },
            { type: 'path', d: 'M20 50 Q35 40 50 50 T80 50' },
            { type: 'path', d: 'M20 70 Q35 60 50 70 T80 70' },
            { type: 'circle', cx: 20, cy: 30, r: 3 },
            { type: 'circle', cx: 80, cy: 70, r: 3 }
          ]
        }
      ]
    },
    details: {
      title: "Pakalpojuma apraksts",
      description: "Kokvedēja pakalpojumi nodrošina pilnu kokmateriālu transportēšanas ciklu no meža līdz gala patērētājam.",
      bulletPoints: [
        "Kokmateriālu iekraušana ar manipulatoru",
        "Droša kravas nostiprināšana",
        "Transportēšana pa autoceļiem",
        "Dokumentācijas noformēšana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kāds ir maksimālais pārvadājamais apjoms?",
        answer: "Vienā reisā varam pārvadāt līdz 40 tonnām kokmateriālu atkarībā no sortimenta."
      },
      {
        question: "Vai veicat starptautiskos pārvadājumus?",
        answer: "Jā, mēs nodrošinām kokmateriālu pārvadājumus gan Latvijā, gan uz citām ES valstīm."
      }
    ],
    cta: {
      title: "Nepieciešams kokvedēja transports?",
      description: "Uzticiet savu kravu profesionāļiem ar pieredzi.",
      buttonText: "Pasūtīt transportu"
    }
  },

  'kokvedeja-puspiekabes-pakalpojumi': {
    meta: {
      title: "Kokvedēja puspiekabes pakalpojumi | AM Forest",
      description: "Kokvedēja puspiekabes pakalpojumi garām kravām. Specializēts transports garmateriāliem.",
      keywords: "kokvedēja puspiekabe, garmateriāli, kokmateriālu transports"
    },
    hero: {
      title: "Kokvedēja puspiekabes pakalpojumi",
      description: "Specializēti kokvedēja puspiekabes pakalpojumi garmateriālu transportēšanai. Ideāli piemēroti garām kokmateriālu kravām."
    },
    features: {
      title: "Puspiekabes priekšrocības",
      items: [
        {
          title: "Garmateriālu transports",
          description: "Speciāli konstruēta garmateriālu pārvadāšanai līdz 24 metriem.",
          iconPath: [
            { type: 'rect', x: 10, y: 45, width: 80, height: 10, rx: 2 },
            { type: 'circle', cx: 20, cy: 65, r: 8 },
            { type: 'circle', cx: 80, cy: 65, r: 8 },
            { type: 'path', d: 'M15 50 L85 50', strokeWidth: 4 }
          ]
        },
        {
          title: "Elastīga konfigurācija",
          description: "Regulējama garuma puspiekabe dažāda izmēra kravām.",
          iconPath: [
            { type: 'rect', x: 20, y: 40, width: 30, height: 20, rx: 3 },
            { type: 'rect', x: 55, y: 40, width: 25, height: 20, rx: 3, strokeDasharray: '3,3' },
            { type: 'path', d: 'M50 50 L55 50', strokeWidth: 3 },
            { type: 'path', d: 'M47 45 L53 50 L47 55', strokeWidth: 2 }
          ]
        },
        {
          title: "Droša kravas fiksācija",
          description: "Moderna kravas nostiprināšanas sistēma drošai transportēšanai.",
          iconPath: [
            { type: 'rect', x: 30, y: 35, width: 40, height: 30, rx: 5 },
            { type: 'path', d: 'M35 45 L45 55 L65 35', strokeWidth: 3 },
            { type: 'path', d: 'M25 50 L35 50', strokeWidth: 2 },
            { type: 'path', d: 'M65 50 L75 50', strokeWidth: 2 }
          ]
        }
      ]
    },
    details: {
      title: "Specializētie pārvadājumi",
      description: "Kokvedēja puspiekabes pakalpojumi ir optimāli garmateriālu un speciālo kravu transportēšanai.",
      bulletPoints: [
        "Baļķu un garmateriālu transports",
        "Speciālo konstrukciju pārvadājumi",
        "Kravas nostiprināšana un drošība",
        "Maršrutu saskaņošana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kāds ir maksimālais kravas garums?",
        answer: "Mūsu puspiekabes var droši pārvadāt kravas līdz 24 metru garumam."
      },
      {
        question: "Vai nepieciešamas speciālas atļaujas?",
        answer: "Garmateriālu pārvadājumiem mēs noformējam visas nepieciešamās atļaujas un saskaņojumus."
      }
    ],
    cta: {
      title: "Jāpārvadā garmateriāli?",
      description: "Mūsu specializētā tehnika nodrošinās drošu pārvadājumu.",
      buttonText: "Saņemt konsultāciju"
    }
  },

  'malkas-skalditaja-pakalpojumi': {
    meta: {
      title: "Malkas skaldītāja pakalpojumi | AM Forest",
      description: "Profesionāla malkas skaldīšana ar augstražīgu tehniku. Kvalitatīva kurināmā sagatavošana.",
      keywords: "malkas skaldīšana, kurināmais, malkas sagatavošana"
    },
    hero: {
      title: "Malkas skaldītāja pakalpojumi",
      description: "Profesionāla malkas skaldīšana ar augstražīgu tehniku. Nodrošinām kvalitatīva kurināmā sagatavošanu jebkurā apjomā."
    },
    features: {
      title: "Pakalpojuma priekšrocības",
      items: [
        {
          title: "Augsta ražība",
          description: "Spējam sagatavot līdz 100 kubikmetriem malkas dienā.",
          iconPath: [
            { type: 'path', d: 'M30 20 L70 80', strokeWidth: 4 },
            { type: 'path', d: 'M35 25 L40 30 L45 25', strokeWidth: 2 },
            { type: 'path', d: 'M55 55 L60 60 L65 55', strokeWidth: 2 },
            { type: 'circle', cx: 80, cy: 30, r: 8, strokeDasharray: '2,2' }
          ]
        },
        {
          title: "Dažādi izmēri",
          description: "Regulējams malkas gabalu garums no 20 līdz 50 cm.",
          iconPath: [
            { type: 'rect', x: 20, y: 40, width: 15, height: 20 },
            { type: 'rect', x: 40, y: 35, width: 15, height: 30 },
            { type: 'rect', x: 60, y: 45, width: 15, height: 15 },
            { type: 'path', d: 'M25 65 L70 65', strokeWidth: 2, strokeDasharray: '2,2' }
          ]
        },
        {
          title: "Kvalitatīvs rezultāts",
          description: "Vienmērīgi sašķelta malka optimālai žūšanai un degšanai.",
          iconPath: [
            { type: 'path', d: 'M40 30 L45 35 L55 25 L60 30 L50 40 L40 30' },
            { type: 'path', d: 'M30 50 L35 55 L45 45 L50 50 L40 60 L30 50' },
            { type: 'path', d: 'M60 50 L65 55 L75 45 L80 50 L70 60 L60 50' }
          ]
        }
      ]
    },
    details: {
      title: "Ko piedāvājam",
      description: "Malkas skaldītāja pakalpojumi ietver pilnu kurināmā sagatavošanas ciklu.",
      bulletPoints: [
        "Malkas šķelšana jebkurā apjomā",
        "Dažādu izmēru malkas sagatavošana",
        "Malkas šķirošana pēc kvalitātes",
        "Krautnēšanas pakalpojumi"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādu koksni var skaldīt?",
        answer: "Varam skaldīt visas koku sugas - gan lapu kokus, gan skuju kokus līdz 60 cm diametrā."
      },
      {
        question: "Vai varat strādāt klienta teritorijā?",
        answer: "Jā, mūsu mobilais malkas skaldītājs var strādāt jebkurā klienta norādītajā vietā."
      }
    ],
    cta: {
      title: "Nepieciešama malkas skaldīšana?",
      description: "Kvalitatīva kurināmā sagatavošana ar profesionālu tehniku.",
      buttonText: "Pasūtīt pakalpojumu"
    }
  },

  'auto-servisa-pakalpojumi': {
    meta: {
      title: "Auto servisa pakalpojumi | AM Forest",
      description: "Specializēts auto serviss meža tehnikas apkopei un remontam. Profesionāla tehniskā apkope.",
      keywords: "auto serviss, meža tehnikas remonts, tehniskā apkope"
    },
    hero: {
      title: "Auto servisa pakalpojumi",
      description: "Specializēts auto serviss meža tehnikas apkopei un remontam. Nodrošinām kvalitatīvu servisu visai meža tehnikai."
    },
    features: {
      title: "Servisa iespējas",
      items: [
        {
          title: "Pilns serviss",
          description: "Veicam gan profilaktisko apkopi, gan sarežģītus remontus.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 25 },
            { type: 'path', d: 'M40 40 L45 45 L60 30', strokeWidth: 3 },
            { type: 'path', d: 'M40 60 L60 60', strokeWidth: 3 },
            { type: 'path', d: 'M45 65 L55 65', strokeWidth: 2 }
          ]
        },
        {
          title: "Mobilais serviss",
          description: "Iespēja veikt apkopi un remontus klienta teritorijā.",
          iconPath: [
            { type: 'rect', x: 20, y: 45, width: 60, height: 25, rx: 5 },
            { type: 'circle', cx: 35, cy: 75, r: 8 },
            { type: 'circle', cx: 65, cy: 75, r: 8 },
            { type: 'path', d: 'M30 35 L35 40 L45 30 L50 35', strokeWidth: 2 }
          ]
        },
        {
          title: "Oriģinālās rezerves daļas",
          description: "Nodrošinām kvalitatīvas rezerves daļas visai tehnikai.",
          iconPath: [
            { type: 'rect', x: 30, y: 30, width: 40, height: 40, rx: 5 },
            { type: 'circle', cx: 50, cy: 50, r: 12 },
            { type: 'path', d: 'M45 45 L55 55', strokeWidth: 2 },
            { type: 'path', d: 'M55 45 L45 55', strokeWidth: 2 }
          ]
        }
      ]
    },
    details: {
      title: "Servisa pakalpojumi",
      description: "Auto serviss specializējas meža un smagās tehnikas apkopē un remontā.",
      bulletPoints: [
        "Profilaktiskā tehniskā apkope",
        "Dzinēju un transmisiju remonts",
        "Hidraulikas sistēmu apkope",
        "Diagnostika un regulēšana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kādu tehniku apkalpojat?",
        answer: "Apkalpojam visu veidu meža tehniku - traktorus, ekskavagatorus, kokvedējus un citu specializēto tehniku."
      },
      {
        question: "Vai piedāvājat garantiju remontiem?",
        answer: "Jā, visiem remontdarbiem un uzstādītajām detaļām nodrošinām garantiju līdz 12 mēnešiem."
      }
    ],
    cta: {
      title: "Nepieciešama tehnikas apkope?",
      description: "Uzticiet savu tehniku profesionāļiem.",
      buttonText: "Pieteikt apkopi"
    }
  },

  'telpu-ire': {
    meta: {
      title: "Telpu īre | AM Forest",
      description: "Biroja un noliktavu telpu īre ar ērtu piekļuvi. Modernas telpas jūsu biznesam.",
      keywords: "telpu īre, biroja telpas, noliktavu telpas"
    },
    hero: {
      title: "Telpu īre",
      description: "Biroja un noliktavu telpu īre ar ērtu piekļuvi. Piedāvājam modernas un funkcionālas telpas jūsu biznesa vajadzībām."
    },
    features: {
      title: "Telpu priekšrocības",
      items: [
        {
          title: "Ērta atrašanās vieta",
          description: "Telpas atrodas ar labu piekļuvi un transporta savienojumiem.",
          iconPath: [
            { type: 'path', d: 'M50 20 L60 40 L40 40 Z' },
            { type: 'circle', cx: 50, cy: 50, r: 25, strokeDasharray: '3,3' },
            { type: 'path', d: 'M30 70 L70 70', strokeWidth: 3 }
          ]
        },
        {
          title: "Dažādi izmēri",
          description: "Piedāvājam telpas no 50 līdz 500 kvadrātmetriem.",
          iconPath: [
            { type: 'rect', x: 20, y: 30, width: 25, height: 40 },
            { type: 'rect', x: 50, y: 25, width: 30, height: 45 },
            { type: 'path', d: 'M15 75 L85 75', strokeWidth: 2, strokeDasharray: '2,2' }
          ]
        },
        {
          title: "Moderna infrastruktūra",
          description: "Visas nepieciešamās komunikācijas un apsardzes sistēmas.",
          iconPath: [
            { type: 'rect', x: 30, y: 35, width: 40, height: 40 },
            { type: 'path', d: 'M35 25 L35 35', strokeWidth: 2 },
            { type: 'path', d: 'M45 25 L45 35', strokeWidth: 2 },
            { type: 'path', d: 'M55 25 L55 35', strokeWidth: 2 },
            { type: 'path', d: 'M65 25 L65 35', strokeWidth: 2 },
            { type: 'circle', cx: 60, cy: 50, r: 5 }
          ]
        }
      ]
    },
    details: {
      title: "Ko piedāvājam",
      description: "Telpu īres pakalpojumi ietver gan biroja, gan noliktavu telpas ar pilnu infrastruktūru.",
      bulletPoints: [
        "Biroja telpas no 50 m²",
        "Noliktavu telpas līdz 500 m²",
        "24/7 apsardze un videonovērošana",
        "Autostāvvietas un kravas rampas"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kāds ir minimālais īres termiņš?",
        answer: "Minimālais īres termiņš ir 6 mēneši, bet piedāvājam elastīgus līguma nosacījumus."
      },
      {
        question: "Vai īres cenā iekļautas komunālās izmaksas?",
        answer: "Komunālās izmaksas tiek rēķinātas atsevišķi pēc faktiskā patēriņa."
      }
    ],
    cta: {
      title: "Meklējat telpas īrei?",
      description: "Piedāvājam labākos risinājumus jūsu biznesa vajadzībām.",
      buttonText: "Apskatīt telpas"
    }
  },

  'dastosanas-pakalpojumi': {
    meta: {
      title: "Dastošanas pakalpojumi | AM Forest",
      description: "Precīza meža dastošana un uzmērīšana profesionāliem mērķiem. Sertificēti speciālisti.",
      keywords: "meža dastošana, kokmateriālu uzmērīšana, meža inventarizācija"
    },
    hero: {
      title: "Dastošanas pakalpojumi",
      description: "Precīza meža dastošana un uzmērīšana profesionāliem mērķiem. Mūsu sertificēti speciālisti nodrošina augstu mērījumu precizitāti."
    },
    features: {
      title: "Pakalpojuma kvalitāte",
      items: [
        {
          title: "Augsta precizitāte",
          description: "Izmantojam modernās mērīšanas tehnoloģijas un metodes.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 30 },
            { type: 'path', d: 'M50 20 L50 80', strokeWidth: 2 },
            { type: 'path', d: 'M20 50 L80 50', strokeWidth: 2 },
            { type: 'circle', cx: 50, cy: 50, r: 5, fill: 'currentColor' }
          ]
        },
        {
          title: "Sertificēti speciālisti",
          description: "Visi mūsu darbinieki ir sertificēti un pieredzējuši.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 35, r: 12 },
            { type: 'path', d: 'M35 55 Q50 45 65 55 L65 75 L35 75 Z' },
            { type: 'rect', x: 40, y: 25, width: 20, height: 15, rx: 3 }
          ]
        },
        {
          title: "Ātra izpilde",
          description: "Operatīva datu apstrāde un atskaišu sagatavošana.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 25 },
            { type: 'path', d: 'M50 30 L50 50 L65 55', strokeWidth: 3 },
            { type: 'path', d: 'M30 30 L35 35', strokeWidth: 2 },
            { type: 'path', d: 'M70 30 L65 35', strokeWidth: 2 }
          ]
        }
      ]
    },
    details: {
      title: "Dastošanas process",
      description: "Dastošanas pakalpojumi ietver pilnu kokmateriālu uzskaites un kvalitātes novērtēšanas ciklu.",
      bulletPoints: [
        "Kokmateriālu tilpuma noteikšana",
        "Kvalitātes novērtēšana",
        "Sortimentu klasifikācija",
        "Detalizētu atskaišu sagatavošana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kāda ir mērījumu precizitāte?",
        answer: "Mūsu mērījumu precizitāte ir ±2%, kas atbilst augstākajiem nozares standartiem."
      },
      {
        question: "Cik ātri tiek sagatavota atskaite?",
        answer: "Standarta atskaiti sagatavojam 1-2 darba dienu laikā pēc mērījumiem."
      }
    ],
    cta: {
      title: "Nepieciešama precīza dastošana?",
      description: "Uzticiet kokmateriālu uzskaiti profesionāļiem.",
      buttonText: "Pasūtīt dastošanu"
    }
  },

  'meza-projekta-taksacijas': {
    meta: {
      title: "Meža projekta taksācijas | AM Forest",
      description: "Meža taksācija un projektu izstrāde ilgtspējīgai apsaimniekošanai. Profesionāla meža inventarizācija.",
      keywords: "meža taksācija, meža projekti, meža inventarizācija"
    },
    hero: {
      title: "Meža projekta taksācijas",
      description: "Meža taksācija un projektu izstrāde ilgtspējīgai apsaimniekošanai. Nodrošinām profesionālu meža resursu novērtēšanu."
    },
    features: {
      title: "Taksācijas pakalpojumi",
      items: [
        {
          title: "Pilna inventarizācija",
          description: "Detalizēta meža resursu uzskaite un novērtēšana.",
          iconPath: [
            { type: 'rect', x: 30, y: 25, width: 40, height: 50, rx: 5 },
            { type: 'path', d: 'M35 35 L65 35', strokeWidth: 2 },
            { type: 'path', d: 'M35 45 L55 45', strokeWidth: 2 },
            { type: 'path', d: 'M35 55 L60 55', strokeWidth: 2 },
            { type: 'path', d: 'M35 65 L50 65', strokeWidth: 2 }
          ]
        },
        {
          title: "Projektu izstrāde",
          description: "Meža apsaimniekošanas plānu un projektu sagatavošana.",
          iconPath: [
            { type: 'rect', x: 25, y: 30, width: 50, height: 40, rx: 3 },
            { type: 'path', d: 'M35 20 L40 30', strokeWidth: 2 },
            { type: 'path', d: 'M50 20 L50 30', strokeWidth: 2 },
            { type: 'path', d: 'M65 20 L60 30', strokeWidth: 2 },
            { type: 'circle', cx: 50, cy: 50, r: 8, strokeDasharray: '2,2' }
          ]
        },
        {
          title: "Digitāla kartēšana",
          description: "Modernas ĢIS tehnoloģijas precīzai kartēšanai.",
          iconPath: [
            { type: 'rect', x: 25, y: 25, width: 50, height: 50, rx: 5 },
            { type: 'path', d: 'M35 35 Q50 25 65 35 Q55 50 65 65 Q50 75 35 65 Q45 50 35 35' },
            { type: 'circle', cx: 45, cy: 45, r: 3, fill: 'currentColor' }
          ]
        }
      ]
    },
    details: {
      title: "Ko ietver taksācija",
      description: "Meža taksācijas pakalpojumi nodrošina pilnīgu meža resursu novērtējumu un plānošanas dokumentāciju.",
      bulletPoints: [
        "Koku sugu un vecuma noteikšana",
        "Krājas aprēķini un pieauguma prognozes",
        "Meža veselības stāvokļa novērtēšana",
        "Apsaimniekošanas plānu izstrāde"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Cik bieži jāveic meža taksācija?",
        answer: "Meža taksāciju ieteicams veikt reizi 10 gados vai pirms lielākiem apsaimniekošanas pasākumiem."
      },
      {
        question: "Vai taksācija ir obligāta?",
        answer: "Noteiktos gadījumos taksācija ir obligāta, piemēram, pirms kailcirtes vai meža īpašuma pārdošanas."
      }
    ],
    cta: {
      title: "Nepieciešama meža taksācija?",
      description: "Profesionāla meža inventarizācija ilgtspējīgai apsaimniekošanai.",
      buttonText: "Pieteikt taksāciju"
    }
  },

  'stigosanas-pakalpojumi': {
    meta: {
      title: "Stigošanas pakalpojumi | AM Forest",
      description: "Meža stigošana un robežu noteikšana ar precīzu aprīkojumu. Cirsmu iezīmēšana un uzmērīšana.",
      keywords: "meža stigošana, robežu noteikšana, cirsmu iezīmēšana"
    },
    hero: {
      title: "Stigošanas pakalpojumi",
      description: "Meža stigošana un robežu noteikšana ar precīzu aprīkojumu. Profesionāla cirsmu iezīmēšana un meža robežu marķēšana."
    },
    features: {
      title: "Stigošanas precizitāte",
      items: [
        {
          title: "GPS tehnoloģijas",
          description: "Izmantojam precīzas GPS iekārtas robežu noteikšanai.",
          iconPath: [
            { type: 'circle', cx: 50, cy: 50, r: 25 },
            { type: 'circle', cx: 50, cy: 50, r: 15, strokeDasharray: '3,3' },
            { type: 'circle', cx: 50, cy: 50, r: 5, fill: 'currentColor' },
            { type: 'path', d: 'M50 20 L55 30', strokeWidth: 2 },
            { type: 'path', d: 'M80 50 L70 45', strokeWidth: 2 }
          ]
        },
        {
          title: "Likumdošanas atbilstība",
          description: "Visi darbi tiek veikti atbilstoši normatīvajiem aktiem.",
          iconPath: [
            { type: 'rect', x: 35, y: 20, width: 30, height: 60, rx: 3 },
            { type: 'path', d: 'M40 35 L45 40 L58 27', strokeWidth: 3 },
            { type: 'path', d: 'M40 50 L60 50', strokeWidth: 2 },
            { type: 'path', d: 'M40 60 L55 60', strokeWidth: 2 }
          ]
        },
        {
          title: "Detalizēta dokumentācija",
          description: "Sagatavojam pilnu dokumentāciju ar kartēm un aprakstiem.",
          iconPath: [
            { type: 'rect', x: 25, y: 25, width: 50, height: 50, rx: 5 },
            { type: 'path', d: 'M35 40 L65 40', strokeWidth: 2 },
            { type: 'path', d: 'M35 50 L60 50', strokeWidth: 2 },
            { type: 'path', d: 'M35 60 L55 60', strokeWidth: 2 },
            { type: 'rect', x: 15, y: 35, width: 20, height: 15, rx: 2 }
          ]
        }
      ]
    },
    details: {
      title: "Stigošanas darbi",
      description: "Stigošanas pakalpojumi ietver pilnu cirsmu sagatavošanas un robežu noteikšanas procesu.",
      bulletPoints: [
        "Meža īpašumu robežu noteikšana",
        "Cirsmu iezīmēšana dabā",
        "Saglabājamo koku marķēšana",
        "Karšu un dokumentācijas sagatavošana"
      ],
      imageUrl: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    faq: [
      {
        question: "Kad nepieciešama stigošana?",
        answer: "Stigošana nepieciešama pirms ciršanas darbu uzsākšanas, lai precīzi noteiktu cirsmas robežas."
      },
      {
        question: "Cik ilgs laiks nepieciešams stigošanai?",
        answer: "Atkarībā no platības, stigošanas darbi parasti aizņem 1-3 dienas."
      }
    ],
    cta: {
      title: "Nepieciešama meža stigošana?",
      description: "Precīza robežu noteikšana profesionāliem meža darbiem.",
      buttonText: "Pieteikt stigošanu"
    }
  }
};

export default servicesData;