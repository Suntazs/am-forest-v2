"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

export default function PageWrapper({ 
  hero, 
  firstSection, 
  secondSection, 
  restContent 
}) {
  const [showRest, setShowRest] = useState(false);
  
  useEffect(() => {
    // Load rest of content after initial sections
    const timer = setTimeout(() => {
      setShowRest(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* Hero - Always loaded immediately */}
      {hero}
      
      {/* First two sections - Always loaded immediately */}
      {firstSection}
      {secondSection}
      
      {/* Rest of content - Lazy loaded */}
      {showRest && restContent}
    </>
  );
}