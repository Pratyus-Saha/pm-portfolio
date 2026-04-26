"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { TypographicStamp } from "./typographic-stamp";

export function HeroPortrait() {
  const { scrollY } = useScroll();
  
  // Tie strictly to global scroll pixels so it perfectly resets to 0 at the top
  const rotateY = useTransform(scrollY, [0, 600], [0, 180]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.8]);
  const opacity = useTransform(scrollY, [300, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, 150]); // Parallax drift

  return (
    <div 
      className="relative z-10 mx-auto mt-12 w-full max-w-[340px] lg:mt-0"
      style={{ perspective: 1200 }}
    >
      <motion.div 
        style={{ 
          rotateY, 
          scale, 
          opacity, 
          y,
          transformStyle: "preserve-3d"
        }}
        className="relative aspect-[0.75] w-full transition-transform hover:scale-[1.02] duration-700"
      >
        {/* Front Face (Portrait) */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#e6e2db] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-[rgba(0,0,0,0.05)]"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)" 
          }}
        >
          <Image
            src="/images/profile/pratyus-saha.png"
            alt="Portrait of Pratyus Saha"
            fill
            priority
            className="object-cover object-bottom"
            sizes="(min-width: 1024px) 400px, 90vw"
          />
        </div>

        {/* Back Face (Workspace/Creative Pattern) */}
        <div 
          className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-white/10 flex items-center justify-center"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)"
          }}
        >
          <div className="text-white/10 font-bold tracking-[0.3em] text-center">
            CREATIVE<br/>WORKSPACE
          </div>
        </div>
      </motion.div>

      {/* Bottom Left Rotating Agency Stamp */}
      <TypographicStamp className="absolute -bottom-12 -left-16 z-20" />
    </div>
  );
}
