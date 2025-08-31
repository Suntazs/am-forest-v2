import React from 'react';
import ServiceHero from '@/components/sections/services/ServiceHero';
import Services from '@/components/sections/services';
import CTA from '@/components/sections/cta';

export default function ServicesPage() {
  return (
    <>
      <ServiceHero 
        title="Mūsu pakalpojumi"
        description="AM Forest piedāvā plašu meža apsaimniekošanas un tehnikas pakalpojumu klāstu. Mūsu profesionālā komanda nodrošina kvalitatīvus risinājumus visām jūsu vajadzībām."
      />
      
      <Services showHeader={false} showFullServices={true} />
      <CTA />
    </>
  );
}