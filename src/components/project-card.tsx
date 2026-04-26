import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Pencil, BrainCircuit } from "lucide-react";
import type { Project } from "@/types/content";

export function ProjectCard({
  project,
  editMode = false,
}: {
  project: Project;
  editMode?: boolean;
}) {
  const imagePath = project.coverImage || `/images/projects/${project.slug}/cover.png`;

  // Get a string of tags or domains separated by bullet
  const tagsStr = project.tags?.length 
    ? project.tags.slice(0, 3).join(' • ') 
    : project.domain.split(',').map(d => d.trim()).join(' • ');

  return (
    <article className="group/card relative flex h-[520px] w-full flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[#f6f4f0] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1">
      
      {/* Full Card Link overlay */}
      <Link href={`/work/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />

      {/* Edit Button */}
      {editMode && (
        <div className="absolute right-6 top-6 z-30">
          <Link
            href={`/admin/#/collections/case-studies/entries/${project.slug}`}
            target="_blank"
            className="inline-flex rounded-full bg-white/90 p-2 shadow-sm backdrop-blur-sm transition-transform hover:scale-110"
            aria-label={`Edit ${project.title}`}
          >
            <Pencil size={14} aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Image Banner (Shrinks on Hover) */}
      <div className="relative w-full shrink-0 overflow-hidden rounded-[20px] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] h-[320px] group-hover/card:h-[110px]">
        {/* Placeholder gradient just in case */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#e6e2db] to-[#d8d3ca]" />
        <Image
          src={imagePath}
          alt={`Cover for ${project.title}`}
          fill
          className="object-cover transition-transform duration-1000 ease-out group-hover/card:scale-105"
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col px-3 pt-6 pb-2">
        
        {/* Tags Row (Reveals on Hover) */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100">
          <div className="overflow-hidden">
            <p className="mb-4 text-sm font-medium text-foreground/50">
              {tagsStr}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[2.5rem] font-serif tracking-tight text-foreground transition-all duration-700 leading-none">
          {project.title}
        </h3>
        
        {/* Summary */}
        <p className="mt-4 text-[1.05rem] leading-relaxed text-foreground/75 line-clamp-4 group-hover/card:line-clamp-2 transition-all duration-700">
          {project.summary}
        </p>

        {/* Expanding Bottom Section (Reveals on Hover) */}
        <div className="mt-auto grid grid-rows-[0fr] opacity-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100">
          <div className="overflow-hidden">
            <div className="mt-6 flex flex-col gap-4">
              
              {/* Divider */}
              <div className="h-[1px] w-full bg-black/5" />

              {/* Grid for Decision Focus & Outcome */}
              <div className="grid grid-cols-2 gap-4 pb-2">
                <div className="border-r border-black/5 pr-4">
                  <div className="flex items-center gap-2 text-[0.95rem] font-medium text-foreground">
                    <BrainCircuit size={18} className="text-foreground/70" /> Decision Focus
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60 line-clamp-3">
                    {project.decisionFocus}
                  </p>
                </div>
                <div className="pl-2">
                  <div className="flex items-center gap-2 text-[0.95rem] font-medium text-foreground">
                    <ArrowRight size={18} className="text-foreground/70" /> Outcome
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/60 line-clamp-3">
                    {project.outcome}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-black/5" />

              {/* Bottom Links (Case Study & PRD) */}
              <div className="flex items-center justify-between pt-2">
                <Link 
                  href={`/work/${project.slug}`}
                  className="group/link relative z-20 flex items-center gap-2 text-[1.05rem] font-medium text-foreground transition-colors hover:text-foreground/70"
                >
                  Case Study <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                </Link>
                
                {project.prd ? (
                  <Link 
                    href={`/artifacts/${project.prd.slug}`}
                    className="group/link relative z-20 flex items-center gap-2 text-[1.05rem] font-medium text-foreground transition-colors hover:text-foreground/70"
                  >
                    PRD <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </Link>
                ) : (
                  <span className="relative z-20 flex items-center gap-2 text-[1.05rem] font-medium text-foreground/30 line-through">
                    PRD <ArrowRight size={16} />
                  </span>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
