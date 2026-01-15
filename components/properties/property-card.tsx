"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  price?: string;
  beds?: number;
  sqm?: number;
}

export function PropertyCard({ property, index = 0 }: { property: PropertyCardProps, index?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer h-full"
    >
      <Link href={`/properties/${property.id}`} className="block h-full">
        {/* Card Container */}
        <div className="relative border border-border bg-card hover:border-primary/50 transition-colors duration-500 h-full flex flex-col">
          
          {/* Image Area */}
          <div className="relative aspect-[16/10] overflow-hidden bg-muted border-b border-border">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 contrast-125 group-hover:contrast-100"
              style={{ backgroundImage: `url(${property.image})` }}
            />
            
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            <div className="absolute top-0 left-0 p-4 w-full flex justify-between items-start">
              <Badge variant="outline" className="rounded-none font-mono text-[10px] uppercase tracking-widest border-border bg-background/90 backdrop-blur-sm text-foreground">
                {property.category}
              </Badge>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 flex flex-col flex-grow justify-between gap-6">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold font-sans tracking-tight text-foreground group-hover:text-primary transition-colors leading-none">
                  {property.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {property.location}
              </p>
            </div>

            {/* Specs */}
            <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <div className="flex gap-6">
                 {property.beds && <span>{property.beds} BEDS</span>}
                 {property.sqm && <span>{property.sqm} SQM</span>}
              </div>
              {property.price && <span className="text-foreground font-semibold">{property.price}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
