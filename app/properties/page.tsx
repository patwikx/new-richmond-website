"use client";

import { motion } from "framer-motion";
import { PropertyCard } from "@/components/properties/property-card";
import { PROPERTIES } from "@/lib/data";

export default function PropertiesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-20 space-y-4"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-primary">Our Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            All Developments
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            A curated selection of industrial hubs, commercial centers, and residential communities engineered for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={{
                id: property.id,
                title: property.title,
                location: property.location,
                category: property.category,
                image: property.image,
                price: property.stats.price,
                beds: property.stats.beds ?? undefined,
                sqm: property.stats.sqm
              }} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}