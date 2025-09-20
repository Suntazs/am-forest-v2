"use client";
import React from "react";
import { useContactModal } from '@/contexts/ContactModalContext';

export default function Footer() {
  const { openContactModal } = useContactModal();
  return (
    <footer className="bg-[#2a2a2a] py-16 md:py-24 lg:py-30">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Main content area */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16 lg:mb-20">
          {/* Left side - Main heading with logo and forest text */}
          <div className="flex-1 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#f3ecda] rounded-lg flex items-center justify-center">
                <span className="text-[#2a2a2a] font-bold text-2xl">AM</span>
              </div>
              <div className="text-white font-semibold text-2xl">
                Forest
              </div>
            </div>
            <h2 className="text-white font-bold text-2xl md:text-4xl lg:text-6xl leading-tight">
              Trust your forest to us
            </h2>
          </div>

          {/* Right side - Contact information */}
          <div className="w-full lg:w-auto lg:min-w-[280px] lg:pl-8">
            <div className="flex flex-col gap-4 md:gap-6 text-white">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 mt-1 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <div className="text-base md:text-lg">Rīga, Latvija</div>
                  <div className="text-base md:text-lg">LV-1050</div>
                </div>
              </div>

              {/* Mobile */}
              <div className="flex items-center gap-3">
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H7V6h10v10z"/>
                </svg>
                <span className="text-base md:text-lg">+371 29 123 456</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg 
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="text-base md:text-lg">info@amforest.lv</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-px bg-gray-600 mb-6 md:mb-8"></div>

        {/* Copyright */}
        <div className="text-gray-400 text-base md:text-lg mb-6 md:mb-8">
          © Copyright 2024, All Rights Reserved
        </div>

        {/* Bottom section with button and links */}
        <div className="flex flex-col gap-6">
          {/* Contact button - full width on mobile */}
          <div>
            <button
              onClick={openContactModal}
              className="bg-[#f3ecda] text-[#2a2a2a] px-6 py-2 rounded-lg font-semibold text-base md:text-lg hover:bg-[#e6d9c2] transition-colors w-full sm:w-auto">
              Sazinies ar mums
            </button>
          </div>

          {/* Navigation links and social - separate row */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            <a
              href="/about"
              className="text-white hover:text-gray-300 transition-colors text-base md:text-lg"
            >
              About
            </a>
            <a
              href="/services"
              className="text-white hover:text-gray-300 transition-colors text-base md:text-lg"
            >
              Services
            </a>
            <a
              href="/projects"
              className="text-white hover:text-gray-300 transition-colors text-base md:text-lg"
            >
              Projects
            </a>
            <a
              href="/contact"
              className="text-white hover:text-gray-300 transition-colors text-base md:text-lg"
            >
              Contact
            </a>
          </div>

          {/* Social link - separate row on mobile */}
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors inline-block"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}