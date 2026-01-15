"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { SECTORS } from "@/lib/data";

export function CategoriesSection() {
  return (
    <section className="bg-background py-32 border-b border-border">
       <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="mb-20"
          >
             <span className="inline-block border border-primary/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-primary mb-6">
                Core Capabilities
             </span>
             <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
                Areas of Expertise.
             </h2>
          </motion.div>

          <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border"
          >
             {SECTORS.map((sector, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Link 
                    href={sector.href}
                    className="group relative h-full min-h-[400px] bg-background p-8 flex flex-col justify-between hover:bg-foreground hover:text-background transition-colors duration-500 overflow-hidden"
                  >
                     {/* Hover Grid Pattern */}
                     <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-difference" />
                     
                     {/* Top Row */}
                     <div className="flex justify-between items-start z-10">
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/60 transition-colors">
                           {sector.id}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-background group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                     </div>

                     {/* Center Icon */}
                     <div className="flex-grow flex items-center justify-center py-10 z-10">
                        <sector.icon strokeWidth={1} className="w-24 h-24 text-muted-foreground/20 group-hover:text-background group-hover:scale-110 transition-all duration-500" />
                     </div>
                     
                     {/* Bottom Content */}
                     <div className="space-y-6 z-10">
                        <div>
                           <h3 className="text-2xl font-bold mb-2 tracking-tight">{sector.title}</h3>
                           <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/70 max-w-[200px]">
                              {sector.description}
                           </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 border-t border-border/50 group-hover:border-background/20 pt-4">
                           {sector.stats.map((stat, i) => (
                              <div key={i}>
                                 <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-background/50 mb-1">
                                    {stat.label}
                                 </p>
                                 <p className="font-mono text-xs font-bold text-foreground group-hover:text-background">
                                    {stat.value}
                                 </p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </Link>
                </motion.div>
             ))}
          </motion.div>
       </div>
    </section>
  );
}