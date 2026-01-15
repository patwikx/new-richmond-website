"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-16 border-b border-border pb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">
            Legal Documentation
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-foreground">
            {title}
          </h1>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground"
        >
          {children}
        </motion.div>

      </div>
    </div>
  );
}
