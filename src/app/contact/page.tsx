import type { Metadata } from "next";
import { ContactClientWrapper } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Pratyus Saha.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-20 px-4 md:px-8">
      <ContactClientWrapper />
    </main>
  );
}
