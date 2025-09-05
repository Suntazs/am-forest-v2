"use client";
import React from 'react';
import SplitText from '@/components/anim/split-text';

export default function ServiceHero() {
  return (
    <section className="relative bg-[#faf6ed] pt-32 pb-16 md:pb-24 lg:pb-30">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl">
          <SplitText
            text="Our Services"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-neutral-700 leading-tight mb-4 md:mb-6 lg:mb-8"
            delay={40}
            duration={0.8}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            tag="h1"
          />
          <SplitText
            text="Comprehensive forestry management and consultation services. We provide sustainable solutions for forest management, helping landowners and organizations maintain healthy, productive forests while preserving ecological balance."
            className="text-base md:text-lg lg:text-xl text-neutral-700/80 max-w-3xl leading-relaxed"
            delay={30}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            tag="p"
          />
        </div>
      </div>
    </section>
  );
}