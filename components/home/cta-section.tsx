"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { fadeInUp, revealMask } from "@/lib/animations";

export function CtaSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-40 bg-background relative overflow-hidden border-t border-border">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-end">
          
          <motion.div 
             initial="hidden" 
             whileInView="visible" 
             viewport={{ once: true }}
             className="max-w-3xl"
          >
             <motion.span variants={fadeInUp} className="inline-block text-primary font-mono text-sm uppercase tracking-widest mb-6">
                Next Generation Development
             </motion.span>
             
             <motion.h2 
               variants={fadeInUp}
               className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85] mb-8 text-foreground"
             >
                BUILD <br />
                <span className="text-muted-foreground">THE</span> <br />
                FUTURE.
             </motion.h2>

             <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed mb-12">
                Partner with Richmond Land Innovations to engineer the industrial, commercial, and residential landscapes of tomorrow.
             </motion.p>
             
             <motion.div variants={fadeInUp}>
               <Button 
                  size="lg" 
                  className="group rounded-none h-16 px-10 text-lg bg-foreground text-background hover:bg-primary hover:text-foreground font-mono uppercase tracking-widest transition-all duration-300" 
                  asChild
                >
                  <Link href="/contact" className="flex items-center gap-4">
                    Start Project <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                </Button>
             </motion.div>
          </motion.div>

          {/* Abstract Visual / Image */}
          <motion.div style={{ y }} className="relative hidden lg:block h-[600px] w-full bg-muted overflow-hidden">
             <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={revealMask}
               className="absolute inset-0 bg-cover bg-center contrast-125 hover:contrast-100 transition-all duration-700"
               style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop)' }}
             />
             <div className="absolute inset-0 bg-black/20" />
             
             {/* Decorative Data Overlay */}
             <div className="absolute bottom-6 left-6 font-mono text-xs text-white/70 space-y-1">
                <p>COORDS: 06.1164° N, 125.1716° E</p>
                <p>STATUS: ACTIVE</p>
                <p>PROJECT: INFRASTRUCTURE_V2</p>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
