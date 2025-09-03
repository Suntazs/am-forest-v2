"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ImageLinks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const lineRef = useRef(null);

  const links = [
    {
      title: "Meža apsaimniekošana",
      href: "/services/forest-management",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Kokmateriālu tirdzniecība",
      href: "/services/timber-trade",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Konsultācijas",
      href: "/services/consulting",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    },
    {
      title: "Meža atjaunošana",
      href: "/services/reforestation",
      image: "/image/beautiful-shot-forest-with-sunlight.png"
    }
  ];

  const currentImage = hoveredIndex !== null ? links[hoveredIndex].image : "/image/beautiful-shot-forest-with-sunlight.png";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  return (
    <section className="relative py-16 md:py-24 lg:py-30 bg-[#faf6ed] overflow-visible">
      <div className="flex flex-col lg:flex-row px-6 md:px-12 lg:px-20 items-end relative">
        {/* Left side - Image */}
        <div className="w-full lg:w-5/12 mb-8 lg:mb-0 lg:pr-12">
          <div className="relative h-[400px] lg:h-[700px] overflow-hidden">
            <img 
              src={currentImage}
              alt="Forest"
              className="w-full h-full object-cover transition-all duration-700 ease-in-out transform"
              style={{
                transform: hoveredIndex !== null ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          </div>
        </div>

        {/* Right side - Links */}
        <div className="w-full lg:w-7/12 relative">
          {/* Top line above links - desktop only, centered between section top and links */}
          <div ref={lineRef} className="hidden lg:block absolute -left-12 -right-20" style={{ 
            width: 'calc(100% + 8rem)', 
            top: '-280px',
            transform: 'translateY(50%)'
          }}>
            <svg className="w-full" height="120" viewBox="0 0 1000 120" preserveAspectRatio="none">
              <defs>
                <mask id="waveMask">
                  <rect x="0" y="0" width="1000" height="120" fill="white">
                    {isInView && (
                      <animate 
                        attributeName="x" 
                        from="1000" 
                        to="0" 
                        dur="3s" 
                        fill="freeze"
                        begin="0s"
                      />
                    )}
                  </rect>
                </mask>
              </defs>
              <path 
                d="M 0,20
                   L 70,20
                   C 120,20 120,0 170,0
                   C 220,0 220,40 270,40
                   C 320,40 320,0 370,0
                   C 420,0 420,40 470,40
                   C 520,40 520,0 570,0
                   C 620,0 620,40 670,40
                   C 720,40 720,0 770,0
                   C 820,0 820,20 870,20
                   L 930,20
                   L 1000,20
                   L 1000,100
                   L 930,100
                   L 870,100
                   C 820,100 820,80 770,80
                   C 720,80 720,120 670,120
                   C 620,120 620,80 570,80
                   C 520,80 520,120 470,120
                   C 420,120 420,80 370,80
                   C 320,80 320,120 270,120
                   C 220,120 220,80 170,80
                   C 120,80 120,100 70,100
                   L 0,100
                   Z" 
                fill="#243c36"
                mask="url(#waveMask)"
              />
            </svg>
          </div>
          <div className="border-t lg:border-t-0 border-b border-neutral-300">
            {links.map((link, index) => (
              <div key={index}>
                <Link href={link.href}>
                  <div 
                    className="relative group cursor-pointer overflow-hidden"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Hover background effect - reveals from bottom to top */}
                    <div 
                      className="absolute inset-0 bg-[#243c36] transform transition-transform duration-500 ease-out"
                      style={{
                        transform: hoveredIndex === index ? 'translateY(0%)' : 'translateY(100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-between px-6 py-5">
                      <div className="flex-1">
                        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-bold transition-colors duration-300 ${
                          hoveredIndex === index ? 'text-white' : 'text-neutral-700'
                        }`}>
                          {link.title}
                        </h3>
                      </div>
                      
                      {/* Arrow */}
                      <div className={`ml-8 transition-all duration-300 transform ${
                        hoveredIndex === index ? 'translate-x-2' : 'translate-x-0'
                      }`}>
                        <svg 
                          className={`w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 ${
                            hoveredIndex === index ? 'text-white' : 'text-neutral-700'
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Divider line */}
                {index < links.length - 1 && (
                  <hr className="border-neutral-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}