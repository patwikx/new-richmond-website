"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Cast to any to avoid React 19 type mismatch issues with this specific library version
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Lenis = ReactLenis as any;
  
  return (
    <Lenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </Lenis>
  );
}