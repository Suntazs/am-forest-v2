"use client";
import React from 'react';
import { ProgressiveImage } from '@/components/ui/ProgressiveMedia';

// Simple text section
export const ArticleTextSection = ({ children, className = "" }) => {
  return (
    <section className={`bg-[#faf6ed] py-16 md:py-24 lg:py-30 ${className}`}>
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {children}
        </div>
      </div>
    </section>
  );
};

// Full-width intro section with bigger text (like services heading)
export const ArticleIntroSection = ({ 
  text,
  bgColor = "#faf6ed",
  className = "" 
}) => {
  return (
    <section className={`py-16 md:py-24 lg:py-30 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="px-6 md:px-12 lg:px-20">
        <p className="text-2xl md:text-3xl lg:text-4xl text-[#243c36] leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  );
};

// Section with heading and paragraphs
export const ArticleContentSection = ({ 
  heading, 
  paragraphs = [], 
  bgColor = "#faf6ed",
  className = "" 
}) => {
  const hasHeading = !!heading;
  
  return (
    <section className={`py-16 md:py-24 lg:py-30 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
              {heading}
            </h2>
          )}
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={`${hasHeading ? 'text-base md:text-lg lg:text-xl' : 'text-lg md:text-xl lg:text-2xl'} text-[#243c36]/80 mb-6 leading-relaxed last:mb-0`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section with image on the side - full width image
export const ArticleImageSection = ({ 
  heading, 
  paragraphs = [], 
  bullets = [],
  outro,
  imageSrc, 
  imageAlt = "",
  imagePosition = "right",
  bgColor = "#faf6ed",
  className = "" 
}) => {
  return (
    <section className={`${className}`} style={{ backgroundColor: bgColor }}>
      <div className={`flex flex-col lg:flex-row ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text content */}
        <div className={`w-full lg:w-1/2 py-16 md:py-24 lg:py-30 ${imagePosition === 'left' ? 'px-6 md:px-12 lg:pl-12 lg:pr-20' : 'px-6 md:px-12 lg:pr-12 lg:pl-20'}`}>
          <div className="max-w-xl">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
                {heading}
              </h2>
            )}
            {paragraphs.map((paragraph, index) => (
              <p key={index} className={`text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed ${bullets.length > 0 ? 'mb-6' : 'mb-6 last:mb-0'}`}>
                {paragraph}
              </p>
            ))}
            {bullets.length > 0 && (
              <ul className="space-y-4 mb-6">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#243c36] mr-3 mt-1.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {outro && (
              <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">
                {outro}
              </p>
            )}
          </div>
        </div>
        
        {/* Image - matches content height on desktop */}
        <div className="w-full lg:w-1/2 relative h-[350px] md:h-[400px] lg:h-auto overflow-hidden">
          <ProgressiveImage
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

// Bullet points list section
export const ArticleBulletSection = ({ 
  heading, 
  intro,
  bullets = [], 
  outro,
  bgColor = "#f3ecda",
  className = "" 
}) => {
  return (
    <section className={`py-16 md:py-24 lg:py-30 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl">
          {heading && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
              {heading}
            </h2>
          )}
          {intro && (
            <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
              {intro}
            </p>
          )}
          <ul className="space-y-4 mb-6">
            {bullets.map((bullet, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#243c36] mr-3 mt-1.5 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
          {outro && (
            <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">
              {outro}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Numbered factors/points section - FAQ-inspired design with big numbers
export const ArticleFactorsSection = ({ 
  heading, 
  intro,
  factors = [], 
  outro,
  bgColor = "#faf6ed",
  className = "" 
}) => {
  return (
    <section className={`py-16 md:py-24 lg:py-30 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="px-6 md:px-12 lg:px-20">
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
            {heading}
          </h2>
        )}
        {intro && (
          <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 mb-10 md:mb-12 leading-relaxed max-w-4xl">
            {intro}
          </p>
        )}
        
        {/* Factors list - FAQ style with big numbers */}
        <div>
          {factors.map((factor, index) => (
            <div key={index} className={index < factors.length - 1 ? "border-b border-[#243c36]/20" : ""}>
              <div className="flex py-8 md:py-10">
                {/* Big number on left */}
                <div className="flex-shrink-0 pr-6 md:pr-10 lg:pr-12">
                  <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#243c36]/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Content on right */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#243c36] mb-3 md:mb-4">
                    {factor.title}
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl text-[#243c36]/70 leading-relaxed">
                    {factor.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {outro && (
          <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed mt-10 md:mt-12 max-w-4xl">
            {outro}
          </p>
        )}
      </div>
    </section>
  );
};

// Full width image break
export const ArticleImageBreak = ({ src, alt = "", className = "" }) => {
  return (
    <div className={`relative h-[300px] md:h-[400px] lg:h-[500px] ${className}`}>
      <ProgressiveImage
        src={src}
        alt={alt}
        className="w-full h-full"
      />
    </div>
  );
};

// Two column section - side by side on desktop, stacked on mobile
export const ArticleTwoColumnSection = ({ 
  leftColumn,
  rightColumn,
  bgColor = "#faf6ed",
  className = "" 
}) => {
  return (
    <section className={`py-16 md:py-24 lg:py-30 ${className}`} style={{ backgroundColor: bgColor }}>
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left column */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            {leftColumn.heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
                {leftColumn.heading}
              </h2>
            )}
            {leftColumn.intro && (
              <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 mb-6 leading-relaxed">
                {leftColumn.intro}
              </p>
            )}
            {leftColumn.bullets && leftColumn.bullets.length > 0 && (
              <ul className="space-y-4">
                {leftColumn.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#243c36] mr-3 mt-1.5 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {leftColumn.outro && (
              <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed mt-6">
                {leftColumn.outro}
              </p>
            )}
          </div>
          
          {/* Right column */}
          <div className="w-full lg:w-1/2">
            {rightColumn.heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
                {rightColumn.heading}
              </h2>
            )}
            {rightColumn.paragraphs && rightColumn.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg lg:text-xl text-[#243c36]/80 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section with text on one side and checklist on the other
export const ArticleTextChecklistSection = ({ 
  heading, 
  intro,
  bullets = [],
  outro,
  checklistPosition = "right",
  bgColor = "#faf6ed",
  className = "" 
}) => {
  return (
    <section className={`${className}`} style={{ backgroundColor: bgColor }}>
      <div className={`flex flex-col lg:flex-row ${checklistPosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text content */}
        <div className={`w-full lg:w-1/2 py-16 md:py-24 lg:py-30 ${checklistPosition === 'left' ? 'px-6 md:px-12 lg:pl-12 lg:pr-20' : 'px-6 md:px-12 lg:pr-12 lg:pl-20'}`}>
          <div className="max-w-xl">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243c36] mb-6 md:mb-8">
                {heading}
              </h2>
            )}
            {intro && (
              <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </div>
        
        {/* Checklist side */}
        <div className={`w-full lg:w-1/2 py-8 lg:py-16 md:py-24 lg:py-30 bg-[#f3ecda] ${checklistPosition === 'left' ? 'px-6 md:px-12 lg:pr-12 lg:pl-20' : 'px-6 md:px-12 lg:pl-12 lg:pr-20'}`}>
          <div className="max-w-xl">
            <ul className="space-y-4">
              {bullets.map((bullet, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#243c36] mr-3 mt-1.5 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
            {outro && (
              <p className="text-base md:text-lg lg:text-xl text-[#243c36]/80 leading-relaxed mt-6">
                {outro}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
