"use client";
import React from 'react';

export default function ServiceHero() {
  return (
    <section className="relative bg-[#faf6ed] pt-32 pb-16 md:pb-24 lg:pb-30">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-700 leading-tight mb-4 md:mb-6 lg:mb-8">
            Our Services
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-neutral-700/80 max-w-3xl leading-relaxed">
            Comprehensive forestry management and consultation services. We provide sustainable solutions 
            for forest management, helping landowners and organizations maintain healthy, productive forests 
            while preserving ecological balance.
          </p>
        </div>
      </div>
    </section>
  );
}