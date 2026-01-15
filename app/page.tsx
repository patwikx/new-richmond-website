"use client";

import { HeroSection } from "@/components/home/hero-section";
import { LocationsMap } from "@/components/home/locations-map";
import { PrimeDevelopments } from "@/components/home/prime-developments";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PrimeDevelopments />
      <LocationsMap />
      <CtaSection />
    </div>
  );
}