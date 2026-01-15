"use client";

import { motion } from "framer-motion";
import { ABOUT_VALUES, MILESTONES, COMPANY_INFO } from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 space-y-4 max-w-4xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-primary">Company Profile</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            Building Legacies. <br/>
            <span className="text-muted-foreground">Since 2008.</span>
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground pt-4 max-w-2xl">
            {COMPANY_INFO.name} leads the Philippine real estate industry by fusing futuristic design with practical utility. We don&apos;t just develop land; we upgrade potential.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-32">
          {ABOUT_VALUES.map((value, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-10 hover:bg-muted/30 transition-colors"
            >
              <value.icon className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-lg font-bold font-mono uppercase tracking-wide mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Trajectory</h2>
          </div>
          
          <div className="relative border-l border-primary/20 ml-3 space-y-16">
            {MILESTONES.map((milestone, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-12"
              >
                {/* Node */}
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-background border border-primary rounded-full" />
                
                <div className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-12 items-baseline">
                  <span className="font-mono text-sm text-primary font-bold">{milestone.year}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
