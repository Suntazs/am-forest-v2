"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { useTranslation } from 'next-i18next';

const ProcessSteps = () => {
  const { t } = useTranslation('common');
  const [visibleSteps, setVisibleSteps] = useState([false, false, false]);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSteps(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(ref);
        return observer;
      }
      return null;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);
  const translatedSteps = t('processSteps', { returnObjects: true });
  const steps = (Array.isArray(translatedSteps) ? translatedSteps : []).map((step, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: step.title,
    description: step.description,
    bgDark: index % 2 === 0
  }));

  return (
    <>
      {steps.map((step, index) => (
        <section 
          key={index}
          ref={el => stepRefs.current[index] = el}
          className={`${step.bgDark ? 'bg-[#243c36]' : 'bg-[#faf6ed]'} px-6 md:px-12 lg:px-20 py-20 md:py-32 lg:py-40`}
        >
          <div className="w-full">
            {/* Step 01 - Desktop: Left content, Right number | Mobile: Top number, Bottom content */}
            {index === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className={`text-4xl md:text-5xl lg:text-7xl font-black mb-8 ${step.bgDark ? 'text-white' : 'text-neutral-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${step.bgDark ? 'text-white/80' : 'text-neutral-600'}`}>
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center justify-center order-1 lg:order-2">
                  <div className={`font-black leading-none ${step.bgDark ? 'text-[#dbf6a3]/30' : 'text-[#243c36]/20'}`}>
                    <AnimatedCounter
                      targetValue={parseInt(step.number)}
                      fontSize={350}
                      mobileFontSize={200}
                      delay={0.3}
                      duration={2}
                      inView={visibleSteps[index]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 02 - Desktop: Left number, Right content | Mobile: Top number, Bottom content */}
            {index === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="flex items-center justify-center order-1 lg:order-1">
                  <div className={`font-black leading-none ${step.bgDark ? 'text-[#dbf6a3]/30' : 'text-[#243c36]/20'}`}>
                    <AnimatedCounter
                      targetValue={parseInt(step.number)}
                      fontSize={350}
                      mobileFontSize={200}
                      delay={0.3}
                      duration={2}
                      inView={visibleSteps[index]}
                    />
                  </div>
                </div>
                <div className="order-2 lg:order-2">
                  <h3 className={`text-4xl md:text-5xl lg:text-7xl font-black mb-8 ${step.bgDark ? 'text-white' : 'text-neutral-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${step.bgDark ? 'text-white/80' : 'text-neutral-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            )}

            {/* Step 03 - Desktop: Left content, Right number | Mobile: Top number, Bottom content */}
            {index === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className={`text-4xl md:text-5xl lg:text-7xl font-black mb-8 ${step.bgDark ? 'text-white' : 'text-neutral-700'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed ${step.bgDark ? 'text-white/80' : 'text-neutral-600'}`}>
                    {step.description}
                  </p>
                </div>
                <div className="flex items-center justify-center order-1 lg:order-2">
                  <div className={`font-black leading-none ${step.bgDark ? 'text-[#dbf6a3]/30' : 'text-[#243c36]/20'}`}>
                    <AnimatedCounter
                      targetValue={parseInt(step.number)}
                      fontSize={350}
                      mobileFontSize={200}
                      delay={0.3}
                      duration={2}
                      inView={visibleSteps[index]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
};

export default ProcessSteps;