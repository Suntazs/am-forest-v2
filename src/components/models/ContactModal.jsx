"use client";
import React, { useEffect, useState } from "react";

export default function ContactModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);


  useEffect(() => {
    // Only apply styles if modal is actually open
    if (!isOpen) return;
    
    // Save current scroll position
    const scrollY = window.scrollY;
    
    // Store scroll position to restore later
    document.body.dataset.scrollY = scrollY;
    
    return () => {
      // Restore scroll position
      const savedScrollY = document.body.dataset.scrollY || '0';
      
      // Restore scroll position
      window.scrollTo(0, parseInt(savedScrollY));
      
      // Clean up
      delete document.body.dataset.scrollY;
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
    onClose();
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Modal */}
      <div 
        className="fixed top-0 right-0 h-screen w-full md:w-[480px] lg:w-[550px] z-[9999] bg-[#faf6ed] transition-transform duration-700 ease-in-out"
        style={{
          transform: !isMounted ? 'translateX(100%)' : (isOpen ? 'translateX(0)' : 'translateX(100%)'),
          WebkitTransform: !isMounted ? 'translateX(100%)' : (isOpen ? 'translateX(0)' : 'translateX(100%)'),
        }}
      >
        {/* Modal Content */}
        <div className="h-screen flex flex-col">
          {/* Header row with close button */}
          <div className="flex items-center justify-between px-6 sm:px-8 lg:px-10 py-6 border-b border-[#2a2a2a]">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-[#2a2a2a]">
              Contact Us
            </h2>
            <button 
              onClick={onClose}
              className="text-[#2a2a2a] hover:opacity-70 transition-opacity p-1"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Section - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit}>
              {/* Name fields row */}
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative border-b border-[#2a2a2a] sm:border-r">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                    className="w-full px-6 sm:px-8 lg:px-10 py-6 bg-transparent text-[#2a2a2a] placeholder-[#2a2a2a]/50 focus:outline-none transition-colors text-base sm:text-lg appearance-none"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
                  />
                </div>
                
                <div className="relative border-b border-[#2a2a2a]">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    required
                    className="w-full px-6 sm:px-8 lg:px-10 py-6 bg-transparent text-[#2a2a2a] placeholder-[#2a2a2a]/50 focus:outline-none transition-colors text-base sm:text-lg appearance-none"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      appearance: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="border-b border-[#2a2a2a]">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-6 sm:px-8 lg:px-10 py-6 bg-transparent text-[#2a2a2a] placeholder-[#2a2a2a]/50 focus:outline-none transition-colors text-base sm:text-lg appearance-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>

              {/* Phone field */}
              <div className="border-b border-[#2a2a2a]">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-6 sm:px-8 lg:px-10 py-6 bg-transparent text-[#2a2a2a] placeholder-[#2a2a2a]/50 focus:outline-none transition-colors text-base sm:text-lg appearance-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>

              {/* Message field */}
              <div className="border-b border-[#2a2a2a]">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message"
                  required
                  rows="8"
                  className="w-full px-6 sm:px-8 lg:px-10 py-6 bg-transparent text-[#2a2a2a] placeholder-[#2a2a2a]/50 focus:outline-none transition-colors text-base sm:text-lg resize-none appearance-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none'
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-6 bg-transparent border-b border-[#2a2a2a] text-[#2a2a2a] text-base sm:text-lg font-medium hover:bg-[#dbf6a3] transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom styles to remove browser defaults */}
      <style jsx>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #faf6ed inset !important;
          -webkit-text-fill-color: #2a2a2a !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          -moz-appearance: textfield;
        }

        textarea {
          field-sizing: content;
          min-height: 120px;
        }

        ::selection {
          background-color: #243c36;
          color: #faf6ed;
        }

        ::-moz-selection {
          background-color: #243c36;
          color: #faf6ed;
        }
      `}</style>
    </>
  );
}