"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function Number({ mv, number, height }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span 
      style={{ 
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        y 
      }}
    >
      {number}
    </motion.span>
  );
}

function Digit({ place, value, height }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 50,
    damping: 15
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ 
      height,
      position: "relative",
      width: "1ch",
      fontVariantNumeric: "tabular-nums",
      overflow: "hidden"
    }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
}

export default function AnimatedCounter({
  targetValue = 1,
  className = "",
  fontSize = 350,
  mobileFontSize = null,
  delay = 0.5,
  duration = 2.5,
  inView = false
}) {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use mobileFontSize on mobile if provided, otherwise use fontSize
  const currentFontSize = isMobile && mobileFontSize ? mobileFontSize : fontSize;
  const height = currentFontSize * 1.1;
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      // Start with some spinning
      const spinDuration = 500;
      const spinInterval = 50;
      let currentSpin = 0;
      
      // Initial spin effect
      const spinTimer = setInterval(() => {
        currentSpin += 3;
        setValue(currentSpin % 100);
      }, spinInterval);

      // Stop spinning and animate to target
      setTimeout(() => {
        clearInterval(spinTimer);
        
        // Animate to target value
        const startTime = Date.now();
        const animateDuration = duration * 1000 - spinDuration;
        
        const animateTimer = setInterval(() => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / animateDuration, 1);
          
          // Easing function for smooth animation
          const easeOutCubic = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(targetValue * easeOutCubic);
          
          setValue(currentValue);
          
          if (progress >= 1) {
            clearInterval(animateTimer);
            setValue(targetValue);
          }
        }, 16);
      }, spinDuration + (delay * 1000));
    }
  }, [inView, targetValue, hasAnimated, delay, duration]);

  // Format value to always show 2 digits
  const displayValue = value.toString().padStart(2, '0');
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div className={`inline-block ${className}`}>
      <div style={{ 
        fontSize: currentFontSize,
        display: "flex",
        gap: 0,
        overflow: "hidden",
        lineHeight: 1,
        fontWeight: "inherit",
        color: "inherit",
        position: "relative",
        letterSpacing: "-0.05em"
      }}>
        <Digit place={10} value={value} height={height} />
        <Digit place={1} value={value} height={height} />
      </div>
    </div>
  );
}