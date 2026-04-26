"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

export function AboutPortrait() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track precisely when it enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "0.5 0.5"] // From top of element hitting bottom of viewport, to center hitting center
  });

  // Professional elegant entrance: folds up (rotateX), scales up, and fades in
  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]); // Folds up into place
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 2]); // Final tilted state

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-[420px]" style={{ perspective: 1200 }}>
      <motion.div
        style={{ 
          y,
          scale, 
          opacity, 
          rotateX,
          rotateZ,
          transformStyle: "preserve-3d" 
        }}
        className="relative aspect-[0.75] w-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-[32px] hover:rotate-[0deg] transition-transform duration-500"
      >
        <div 
          className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#e6e2db] border border-[rgba(0,0,0,0.05)]"
        >
          <Image
            src="/images/profile/pratyus-saha.png"
            alt="Portrait of Pratyus Saha"
            fill
            className="object-cover object-bottom"
            sizes="(min-width: 1024px) 420px, 90vw"
          />
        </div>
      </motion.div>
    </div>
  );
}
