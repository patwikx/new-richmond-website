"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { PROPERTIES } from "@/lib/data";

export function PrimeDevelopments() {
  return (
    <section className="py-32 bg-background border-b border-border">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="space-y-6"
           >
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-primary"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  Selected Works
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-foreground">
                Prime <br /> Developments.
              </h2>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="hidden md:block mb-2"
           >
              <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 h-auto font-mono text-xs uppercase tracking-widest group" asChild>
                <Link href="/properties" className="flex items-center gap-2">
                   Full Portfolio 
                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
           </motion.div>
        </div>

        {/* Vertical List Layout */}
        <div className="flex flex-col border-t border-border">
           {PROPERTIES.map((property, index) => (
             <motion.div 
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className={cn(
                  "group relative grid grid-cols-1 lg:grid-cols-2 border-b border-border min-h-[500px]",
                )}
             >
                {/* Image Section */}
                <div className={cn(
                  "relative h-[400px] lg:h-auto overflow-hidden border-b lg:border-b-0 border-border",
                  index % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r"
                )}>
                   <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${property.image})` }}
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                   
                   {/* Overlay Tag */}
                   <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2 border border-border">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                        {property.category}
                      </span>
                   </div>
                </div>

                {/* Content Section */}
                <div className={cn(
                  "flex flex-col justify-between p-8 md:p-16 bg-background transition-colors duration-500 group-hover:bg-muted/10",
                  index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                )}>
                   <div className="space-y-8">
                      <div className="flex justify-between items-start">
                         <span className="font-mono text-xs text-muted-foreground/50">0{index + 1}</span>
                         <ArrowUpRight className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300" />
                      </div>
                      
                      <div className="space-y-4">
                         <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none group-hover:text-primary transition-colors">
                            <Link href={`/properties/${property.id}`}>
                              {property.title}
                            </Link>
                         </h3>
                         <p className="text-muted-foreground leading-relaxed max-w-md font-light">
                            {property.description}
                         </p>
                      </div>
                   </div>

                   <div className="space-y-6 pt-12">
                      <div className="flex gap-4 border-t border-border pt-6">
                         {property.specs.map((spec, i) => (
                           <div key={i} className="px-3 py-1 border border-border rounded-full text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                              {spec}
                           </div>
                         ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <span className="font-mono text-xs text-muted-foreground/50">EST. {property.stats.year}</span>
                         <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                            {property.location}
                         </span>
                      </div>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

        <div className="md:hidden flex justify-center pt-12">
            <Button variant="outline" className="w-full rounded-none h-14 font-mono text-xs uppercase tracking-widest" asChild>
                <Link href="/properties">View All Projects</Link>
            </Button>
        </div>

      </div>
    </section>
  );
}