import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site/config";

export function SiteFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 h-[700px] lg:h-[500px] bg-[#1c1c1c] text-[#f2f2f2] flex flex-col pt-16 pb-8 px-6 md:px-12">
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-between">
        
        {/* Middle Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] mt-auto mb-auto pt-16">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src="/images/profile/pratyus-saha.png"
                  alt="Pratyus Saha"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Pratyus Saha</h3>
                <p className="text-[#a0a0a0]">Product Manager</p>
              </div>
            </div>
            <p className="mt-6 max-w-[320px] text-lg text-[#a0a0a0] leading-relaxed">
              Seeking a product manager who drives alignment swiftly without sacrificing quality? Let's discuss.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
              >
                Contact Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            <h2 className="hero-condensed text-[clamp(3.5rem,7vw,7rem)] leading-[0.9] tracking-tight text-white">
              Join me in crafting something truly remarkable.
            </h2>
            <p className="mt-4 text-xl text-[#a0a0a0]">
              Let's create something extraordinary together.
            </p>
          </div>
        </div>

        {/* Bottom Links Row */}
        <div className="flex flex-col gap-6 border-t border-[#3a3a3a] pt-8 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-2 gap-8 text-sm text-[#a0a0a0] md:flex md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Main Pages</span>
              <Link href="/" className="hover:text-white">Home</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/work" className="hover:text-white">Work</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Links</span>
              <Link href={siteConfig.resumePath} className="hover:text-white">Resume</Link>
              <Link href={siteConfig.linkedin} target="_blank" className="hover:text-white">LinkedIn</Link>
              <Link href={siteConfig.github} target="_blank" className="hover:text-white">GitHub</Link>
            </div>
          </div>
          <div className="flex flex-col text-sm text-[#a0a0a0] md:items-end">
            <span>© 2026 - Pratyus Saha</span>
            <span>Built with Next.js</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
