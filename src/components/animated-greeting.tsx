"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const GREETINGS = [
  "Hi",
  "Hola",
  "Bonjour",
  "Namaste",
  "Ciao",
  "Olá",
  "Hallo",
  "Konnichiwa"
];

export function AnimatedGreeting({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setIndex((current) => (current + 1) % GREETINGS.length);
        setIsAnimating(false);
      }, 300);

    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={cn(
        "group relative flex h-[120px] w-[120px] items-center justify-center rounded-full shadow-[0_10px_30px_rgba(107,114,225,0.4)] transition-all duration-500 hover:scale-110 cursor-pointer",
        className
      )}
      onClick={() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIndex((current) => (current + 1) % GREETINGS.length);
          setIsAnimating(false);
        }, 200);
      }}
    >
      {/* Spinning Gradient Border */}
      <div className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-[#6b72e1] via-purple-400 to-[#f64f59] animate-[spin_4s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity" />
      
      {/* Premium Dark Inner Circle */}
      <div className="absolute inset-[2px] rounded-full bg-[#111] border border-white/10" />

      {/* Greeting Text */}
      <span 
        className={cn(
          "relative z-10 text-white font-semibold tracking-wide transition-all duration-300 drop-shadow-sm",
          isAnimating ? "opacity-0 scale-75 blur-[2px]" : "opacity-100 scale-100 blur-0",
          GREETINGS[index].length > 7 ? "text-xl" : 
          GREETINGS[index].length > 5 ? "text-2xl" : 
          "text-4xl"
        )}
      >
        {GREETINGS[index]}
      </span>
    </div>
  );
}
