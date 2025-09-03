import React from 'react';

export default function Reviews() {
  return (
    <section className="relative py-16 md:py-24 lg:py-30 bg-[#f3ecda] overflow-hidden">
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-20">
        {/* Left side - 1/3 width on desktop, full width on mobile */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-neutral-700 leading-tight mb-6 lg:mb-0">
              Atsauksmes
            </h2>
          </div>
        </div>
        
        {/* Right side - 2/3 width on desktop, full width on mobile */}
        <div className="w-full lg:w-2/3 lg:pl-16">
          <div>
            <p className="text-base md:text-xl lg:text-2xl text-neutral-600 mb-6 leading-relaxed">
              "Ļoti profesionāla komanda un izcils serviss! Viņi parādīja augstu kvalitāti savā darbā un bija ļoti atsaucīgi uz visām mūsu vajadzībām. Noteikti iesaku visiem, kas meklē uzticamus mežsaimniecības speciālistus."
            </p>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                <div className="font-semibold text-neutral-700 text-base md:text-lg mb-2 sm:mb-0 sm:mr-4">Andris Ozols</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#bc9d6e] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="text-neutral-500 text-sm md:text-base">Klients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}