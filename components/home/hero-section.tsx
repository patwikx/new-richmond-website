"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { fadeInUp, letterAnimation, letterContainer } from "@/lib/animations";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]); 
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-center">
      {/* Dynamic Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/70 z-10 mix-blend-multiply" /> {/* Darker overlay for text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Architecture"
          fill
          className="object-cover object-center opacity-50"
          priority
        />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-12 border border-border bg-background/50 backdrop-blur-md px-6 py-2 rounded-full"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground">
              Richmond Land Innovations
            </span>
          </motion.div>
          
          {/* Main Headline with Staggered Reveal */}
          <motion.h1 
            variants={letterContainer}
            initial="hidden"
            animate="visible"
            className="max-w-6xl font-bold text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] mb-10 text-foreground overflow-hidden"
          >
            <div className="overflow-hidden block"><motion.span variants={letterAnimation} className="block">BUILDING</motion.span></div>
            <div className="overflow-hidden block"><motion.span variants={letterAnimation} className="block text-muted-foreground/50">THE FUTURE</motion.span></div>
            <div className="overflow-hidden block"><motion.span variants={letterAnimation} className="block">INFRASTRUCTURE.</motion.span></div>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="max-w-xl text-muted-foreground text-sm md:text-lg mb-12 leading-relaxed font-light"
          >
            Specializing in premium industrial, commercial, and residential developments. 
            From RD City to La Cassandra, we engineer spaces for the next generation.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8, duration: 0.8 }}
             className="flex flex-col md:flex-row items-center gap-6"
          >
             <Button size="lg" className="rounded-none h-14 px-10 font-mono text-xs uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-foreground transition-all duration-300" asChild>
                <Link href="/properties">
                  View Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
             </Button>
             <Button variant="outline" size="lg" className="rounded-none h-14 px-10 font-mono text-xs uppercase tracking-widest bg-transparent hover:bg-muted text-foreground border-foreground/20" asChild>
                <Link href="/contact">Contact Us</Link>
             </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer Elements of Hero */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-0 w-full px-6 md:px-12 flex justify-between items-end z-20 mix-blend-difference text-white"
      >
        <div className="hidden md:block">
           <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
             A MEMBER OF RD GROUP OF COMPANIES <br />
             Est. 2008
           </p>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2">
           <ChevronDown className="w-6 h-6 animate-bounce opacity-50" />
        </div>

        <div className="hidden md:block text-right">
           <p className="font-mono text-[10px] uppercase tracking-widest opacity-60">
             Scroll to explore
           </p>
        </div>
      </motion.div>
    </section>
  );
}
