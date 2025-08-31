"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const MouseFollowerContext = createContext();

export const useMouseFollower = () => {
  const context = useContext(MouseFollowerContext);
  if (!context) {
    throw new Error('useMouseFollower must be used within MouseFollowerProvider');
  }
  return context;
};

export const MouseFollowerProvider = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [content, setContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const showFollower = (newContent) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Instantly update content when changing between items
    setContent(newContent);
    setIsVisible(true);
  };

  const hideFollower = () => {
    setIsVisible(false);
    // Clear content after animation completes
    timeoutRef.current = setTimeout(() => {
      setContent(null);
    }, 500);
  };

  return (
    <MouseFollowerContext.Provider value={{ showFollower, hideFollower }}>
      {children}
      
      {/* The actual follower element */}
      {content && (
        <div
          className="pointer-events-none fixed z-[9999]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: 'translate(10px, 30px)', // More to the right (10px) and below (30px)
          }}
        >
          <div
            className={`transition-opacity duration-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))'
            }}
          >
            {content}
          </div>
        </div>
      )}
    </MouseFollowerContext.Provider>
  );
};