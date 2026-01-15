"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const MapView = dynamic(() => import("./map-view"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-background border-y border-border flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Loading Cartography...</p>
    </div>
  ),
});

export function LocationsMap() {
  return (
    <section className="bg-background">
      <MapView />
    </section>
  );
}
