"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/content";

export function ProjectCarousel({ projects, editMode = false }: { projects: Project[], editMode?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // We duplicate the array 4 times to ensure we always have enough runway for the infinite loop
  const clonedProjects = [...projects, ...projects, ...projects, ...projects];

  // Auto-scroll and infinite loop logic
  useEffect(() => {
    if (projects.length <= 1) return;

    // Initialize position so we aren't at the very edge (allows scrolling left immediately)
    if (scrollRef.current && scrollRef.current.scrollLeft === 0) {
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.clientWidth + 16 : 0;
      scrollRef.current.scrollTo({ left: cardWidth * projects.length, behavior: 'instant' });
    }

    if (isHovering) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft } = scrollRef.current;
        const firstChild = scrollRef.current.firstElementChild as HTMLElement;
        const cardWidth = firstChild ? firstChild.clientWidth + 16 : 0;
        
        const totalOriginalWidth = cardWidth * projects.length;

        // Infinite loop magic: if we scrolled deep into the clones, instantly reset back
        if (scrollLeft >= totalOriginalWidth * 3) {
          scrollRef.current.scrollTo({ left: scrollLeft - totalOriginalWidth, behavior: 'instant' });
          
          // Then do the smooth slide after the micro-tick
          setTimeout(() => {
            if (scrollRef.current) scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
          }, 50);
        } else {
          // Normal smooth scroll forward
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 3500); // Slightly faster, smoother timing

    return () => clearInterval(interval);
  }, [projects.length, isHovering]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.clientWidth + 16 : scrollRef.current.clientWidth;
      
      const totalOriginalWidth = cardWidth * projects.length;
      
      // Infinite loop going backwards
      if (scrollLeft <= cardWidth) {
        scrollRef.current.scrollTo({ left: scrollLeft + totalOriginalWidth, behavior: 'instant' });
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
        }, 50);
      } else {
        scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const firstChild = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstChild ? firstChild.clientWidth + 16 : scrollRef.current.clientWidth;
      
      const totalOriginalWidth = cardWidth * projects.length;

      // Infinite loop going forwards
      if (scrollLeft >= totalOriginalWidth * 3) {
        scrollRef.current.scrollTo({ left: scrollLeft - totalOriginalWidth, behavior: 'instant' });
        setTimeout(() => {
          if (scrollRef.current) scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }, 50);
      } else {
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }
  };

  if (projects.length === 0) return null;

  return (
    <div 
      className="relative w-full group mt-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
      `}} />

      {/* Navigation Controls */}
      {projects.length > 1 && (
        <>
          <button 
            onClick={scrollLeft}
            className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[var(--line)] text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-105"
            aria-label="Previous project"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={scrollRight}
            className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[var(--line)] text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-white hover:scale-105"
            aria-label="Next project"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scroll pb-6 pt-2 px-1 -mx-1 items-stretch"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {clonedProjects.map((project, index) => (
          <div 
            key={`${project.slug}-${index}`} 
            className="w-[85vw] md:w-[60vw] lg:w-[48%] shrink-0 snap-start md:snap-center transition-opacity duration-300 h-full"
          >
            <ProjectCard project={project} editMode={editMode} />
          </div>
        ))}
      </div>
    </div>
  );
}
