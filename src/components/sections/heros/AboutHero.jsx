"use client";
import React from 'react';

export default function AboutHero() {
  return (
    <section className="relative bg-[#243c36] overflow-hidden">
      <div className="min-h-[600px] lg:min-h-screen flex items-center">
        <div className="px-6 md:px-12 lg:px-20 pt-40 pb-32 md:py-32 lg:py-20 w-full">
          <div className="max-w-7xl">
          {/* Heading with flower */}
          <div className="mb-12 md:mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#faf6ed] leading-tight max-w-5xl">
              Expertise 
              <span className="inline-flex mx-2 align-middle" style={{ verticalAlign: '-0.15em' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 flower-icon"
                >
                  <g clipPath="url(#a)">
                    <path 
                      fill="#dbf6a3" 
                      d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 24h24V0H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              that inspires confidence and security at every
              <span className="inline-flex ml-2 align-middle" style={{ verticalAlign: '-0.15em' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 flower-icon-alt"
                >
                  <g clipPath="url(#b)">
                    <path 
                      fill="#faf6ed" 
                      d="M15.2 20.8v-1.075l.76.76a3.2 3.2 0 1 0 4.525-4.525l-.76-.76H20.8a3.2 3.2 0 0 0 0-6.4h-1.075l.76-.76a3.2 3.2 0 1 0-4.525-4.525l-.76.76V3.2a3.2 3.2 0 0 0-6.4 0v1.075l-.76-.76A3.2 3.2 0 1 0 3.515 8.04l.76.76H3.2a3.2 3.2 0 0 0 0 6.4h1.075l-.76.76a3.2 3.2 0 0 0 4.525 4.525l.76-.76V20.8a3.2 3.2 0 0 0 6.4 0"
                    />
                  </g>
                  <defs>
                    <clipPath id="b">
                      <path fill="#fff" d="M0 24h24V0H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              {' '}step
            </h1>
          </div>
          
          {/* Description with offset */}
          <div className="ml-12 md:ml-32 lg:ml-48">
            <p className="text-lg md:text-xl lg:text-2xl text-[#faf6ed]/80 max-w-4xl leading-relaxed">
              Thanks to the dedication and expertise of our team at AM Forest, 
              we continue to grow and inspire confidence. Each member plays 
              a key role in the success of your forestry projects, combining 
              rigor with a human approach to sustainable forest management.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottom curve - desktop only */}
      <div className="hidden md:block absolute bottom-0 right-0">
        <svg 
          className="w-[32rem] lg:w-[40rem] h-96 lg:h-[28rem]" 
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M 80 200 L 80 120 Q 80 20 180 20 L 350 20"
            fill="none"
            stroke="#dbf6a3"
            strokeWidth="30"
            className="curve-path"
          />
        </svg>
      </div>
    </div>

      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes drawLine {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .curve-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 2.5s cubic-bezier(0.65, 0, 0.35, 1) 0.6s forwards;
        }

        .flower-icon {
          animation: popIn 0.6s ease-out 0.3s both, spin 8s linear 0.9s infinite;
        }

        .flower-icon-alt {
          animation: popIn 0.6s ease-out 0.5s both, spin 8s linear 1.1s infinite reverse;
        }
      `}</style>
    </section>
  );
}