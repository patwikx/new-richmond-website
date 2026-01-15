"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useMotionValue } from "framer-motion";

const stats = [
  { label: "Years Exp", value: 15, suffix: "+" },
  { label: "Completed", value: 50, suffix: "+" },
  { label: "Total Area", value: 500, suffix: "k" },
  { label: "Awards", value: 12, suffix: "" },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span className="flex"><span ref={ref}>0</span>{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 border-y border-border bg-muted/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl md:text-6xl font-mono font-bold tracking-tighter text-primary">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}