"use client";
import React from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';

export default function AboutContent() {
  return (
    <section className="relative bg-[#faf6ed] py-16 md:py-24 lg:py-32">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Image on the left */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <ProgressiveImage
                src="/image/beautiful-shot-forest-with-sunlight.png"
                alt="Forest with sunlight"
                className="w-full h-full"
              />
            </div>

            {/* Text on the right */}
            <div className="lg:pl-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6">
                Our Story
              </h2>
              <p className="text-lg md:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
                Founded with a vision to revolutionize forest management in Latvia, 
                AM Forest has grown from a small team of passionate foresters to a 
                leading force in sustainable forestry practices.
              </p>
              <p className="text-lg md:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
                We combine decades of traditional forestry knowledge with cutting-edge 
                technology to provide comprehensive forest management solutions that 
                benefit both nature and our clients.
              </p>
              <p className="text-lg md:text-xl text-[#243c36]/80 leading-relaxed">
                Our commitment to excellence and sustainability has earned us the trust 
                of landowners, communities, and environmental organizations throughout 
                the Baltic region.
              </p>
              
              {/* Optional CTA or stats */}
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">20+</p>
                  <p className="text-[#243c36]/70">Years of Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">500+</p>
                  <p className="text-[#243c36]/70">Projects Completed</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[#243c36]">100k+</p>
                  <p className="text-[#243c36]/70">Hectares Managed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}