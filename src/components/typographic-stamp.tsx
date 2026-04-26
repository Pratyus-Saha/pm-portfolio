import { Sparkle } from "lucide-react";
import { cn } from "@/lib/utils";

export function TypographicStamp({ className }: { className?: string }) {
  // Duplicated twice to smoothly fill the circular path
  const text = "BUILDER • DESIGNER • LEADER • BUILDER • DESIGNER • LEADER • ";

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center h-32 w-32 rounded-full bg-background/60 backdrop-blur-md border border-[var(--line)] shadow-lg cursor-pointer transition-transform hover:scale-105 duration-300",
        className
      )}
    >
      {/* Center Icon */}
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
        <Sparkle size={20} fill="currentColor" />
      </div>

      {/* Rotating SVG Text */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 h-full w-full animate-[spin_12s_linear_infinite]"
      >
        <defs>
          <path 
            id="textCircle" 
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" 
          />
        </defs>
        <text className="fill-foreground text-[10.5px] font-bold uppercase tracking-[0.16em]">
          <textPath href="#textCircle" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
