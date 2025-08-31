"use client";

import { useState, useRef, useEffect } from "react";

export default function FAQ({ faqData }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [heights, setHeights] = useState({});
  const contentRefs = useRef({});

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  useEffect(() => {
    const newHeights = {};
    Object.keys(contentRefs.current).forEach((key) => {
      const index = parseInt(key);
      const element = contentRefs.current[index];
      if (element) {
        newHeights[index] = element.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [faqData]);

  return (
    <div className="space-y-0">
      {faqData.map((faq, index) => (
        <div key={index}>
          <div className="faq-item flex cursor-pointer" onClick={() => toggleFAQ(index)}>
            {/* Number on the left - aligned with question */}
            <div className="flex-shrink-0 pr-4 sm:pr-6 md:pr-8 lg:pr-10 py-6">
              <span className="text-neutral-700 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            
            {/* Question and Answer container */}
            <div className="flex-1 py-6">
              <div className="flex justify-between items-center">
                <h3 className="text-neutral-700 text-base sm:text-lg md:text-2xl lg:text-3xl pr-4">
                  {faq.question}
                </h3>
                
                {/* Arrow button */}
                <div className="border-2 border-neutral-700 rounded-lg p-2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                  <svg
                    className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 text-neutral-700 ${
                      openFAQ === index ? "rotate-90" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
              
              {/* Answer - below question, aligned with it */}
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openFAQ === index ? `${heights[index] || 0}px` : "0px",
                  opacity: openFAQ === index ? 1 : 0,
                }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="pt-4 pr-14 sm:pr-16 md:pr-20"
                >
                  <p 
                    className="text-neutral-600 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
                    style={{ fontWeight: 350 }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }} 
                  />
                </div>
              </div>
            </div>
          </div>
          {index < faqData.length - 1 && (
            <hr className="border-neutral-300" />
          )}
        </div>
      ))}
    </div>
  );
}
