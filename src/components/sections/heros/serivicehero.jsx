import React from "react";
import SplitText from '@/components/anim/split-text';

export default function ServiceHero() {
  return (
    <div>
      <SplitText
        text="Service Hero"
        className=""
        delay={40}
        duration={0.8}
        ease="power3.out"
        splitType="words"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="start"
        tag="h1"
      />
    </div>
  );
}