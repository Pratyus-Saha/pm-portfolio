import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/lib/site/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pm-portfolio.local"),
  title: {
    default: `${siteConfig.name} | Product Management Portfolio`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth antialiased bg-[#1c1c1c]`}
      >
        <body className="text-foreground">
          <SmoothScroll>
            <div className="relative z-10 bg-background mb-[700px] lg:mb-[500px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] rounded-b-[40px] md:rounded-b-[60px] pb-10">
              <SiteHeader />
              {children}
            </div>
            <SiteFooter />
          </SmoothScroll>
        </body>
      </html>
  );
}
