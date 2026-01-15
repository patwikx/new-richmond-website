"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ABOUT_FEATURES } from "@/lib/data";

export function AboutSection() {
  return (
    <section className="py-40 bg-background border-b border-border relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          {/* Typography / Header */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="space-y-12 sticky top-32"
          >
             <div className="space-y-6">
                <span className="inline-block border border-primary/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-primary">
                  About Us
                </span>
                <h3 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-foreground">
                  Redefining <br/>
                  <span className="text-muted-foreground/50">Philippine</span> <br/>
                  <span className="text-muted-foreground/50">Real Estate.</span>
                </h3>
             </div>
             
             <p className="text-xl leading-relaxed text-muted-foreground max-w-md font-light">
                Richmond Land Innovations, Inc. (RLII) operates at the intersection of design, utility, and future-proofing. We don&apos;t just build structures; we engineer environments for the next century of industrial and residential life.
             </p>

             <div className="h-px w-24 bg-primary" />
          </motion.div>

          {/* Grid Features */}
          <motion.div 
             variants={staggerContainer}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border"
          >
             {ABOUT_FEATURES.map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="bg-background p-12 flex flex-col gap-8 hover:bg-muted/30 transition-colors group"
                >
                   <div className="w-14 h-14 flex items-center justify-center border border-border rounded-none text-foreground group-hover:bg-primary group-hover:text-background group-hover:border-primary transition-all duration-300">
                      <feature.icon className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-xl font-bold tracking-tight mb-3 text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                         {feature.description}
                      </p>
                   </div>
                </motion.div>
             ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
