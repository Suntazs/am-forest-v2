import React from 'react';
import Services from '@/components/sections/services';
import CTA from '@/components/sections/cta';

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-[#243c36] overflow-hidden">
        <div className="min-h-[500px] max-h-[600px] flex items-center pt-20">
          <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24 w-full relative">
            {/* Vertical line on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#dbf6a3] opacity-30 hidden md:block"></div>
            
            <div className="max-w-7xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#faf6ed] leading-tight mb-8 md:mb-12">
                Mūsu pakalpojumi
              </h1>
              
              {/* Description with offset */}
              <div className="ml-0 md:ml-24 lg:ml-32">
                <p className="text-lg md:text-xl text-[#faf6ed]/80 max-w-3xl leading-relaxed">
                  AM Forest piedāvā plašu meža apsaimniekošanas un tehnikas pakalpojumu klāstu. Mūsu profesionālā komanda nodrošina kvalitatīvus risinājumus visām jūsu vajadzībām.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Services showHeader={false} showFullServices={true} />
      <CTA />
    </>
  );
}