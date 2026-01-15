"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, MapPin, Layers, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { fadeInUp, staggerContainer, revealMask } from "@/lib/animations";

interface PropertyDetailViewProps {
  title: string;
  category: string;
  description: string;
  location: string;
  features: string[];
  heroImage: string;
  secondaryImage: string;
  ctaText?: string;
  nearbyLandmarks: { name: string; distance: string }[];
  floorPlans: { title: string; image: string }[];
  mapEmbedUrl: string;
}

export function PropertyDetailView({
  title,
  category,
  description,
  location,
  features,
  heroImage,
  secondaryImage,
  ctaText = "Inquire Now",
  nearbyLandmarks,
  floorPlans,
  mapEmbedUrl
}: PropertyDetailViewProps) {
  const [selectedPlanIndex, setSelectedPlan] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  const closeViewer = () => {
    setSelectedPlan(null);
    setScale(1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="h-[80vh] relative flex items-end overflow-hidden">
        <motion.div 
           initial="hidden"
           animate="visible"
           variants={revealMask}
           className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 pointer-events-none z-10" />
        
        <div className="container relative z-20 px-6 md:px-12 pb-24">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-8">
                <Badge variant="outline" className="rounded-none border-primary/50 text-primary font-mono text-[10px] uppercase tracking-widest bg-background/50 backdrop-blur-md px-3 py-1">
                    {category}
                </Badge>
                <span className="text-muted-foreground font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                    {'//'} {location}
                </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6 leading-[0.85]">
              {title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 border-t border-border bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-24 items-start">
            
            {/* Left Column: Description & Features */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-16"
            >
              <motion.div variants={fadeInUp} className="space-y-8">
                 <h2 className="text-4xl font-bold tracking-tighter">Project Overview</h2>
                 <p className="text-xl text-muted-foreground leading-relaxed font-light">
                   {description}
                 </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-8">
                 <h3 className="font-mono text-xs uppercase tracking-widest text-primary border-b border-border pb-4">Key Specifications</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 group">
                        <div className="mt-1 w-5 h-5 rounded-none border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors duration-300">
                           <Check className="w-3 h-3" />
                        </div>
                        <span className="font-medium text-foreground/80 tracking-tight">{feature}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="pt-12">
                 <Button size="lg" className="rounded-none h-14 px-10 font-mono text-xs uppercase tracking-widest bg-white text-black hover:bg-primary/90 transition-all" asChild>
                   <Link href="/contact">
                     {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
                   </Link>
                 </Button>
              </motion.div>
            </motion.div>

            {/* Right Column: Visuals */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] bg-muted overflow-hidden border border-border group"
            >
               <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out hover:scale-105"
                style={{ backgroundImage: `url(${secondaryImage})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
              
              {/* Tech overlay */}
              <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/50 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p>IMG_SOURCE: EXT_CAM_04</p>
                  <p>RENDER_QUALITY: HIGH</p>
              </div>
            </motion.div>
          </div>
          
           {/* Interactive Floor Plans Section */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-32 pt-20 border-t border-border"
          >
             <div className="flex items-center gap-4 mb-12">
                <Layers className="w-5 h-5 text-primary" />
                <h3 className="text-2xl font-bold tracking-tight">Technical Blueprints</h3>
             </div>
             
             <div className="grid md:grid-cols-2 gap-8">
                {floorPlans.map((plan, i) => (
                   <motion.div 
                      key={i} 
                      layoutId={`plan-card-${i}`}
                      variants={fadeInUp} 
                      className="group relative bg-muted border border-border overflow-hidden cursor-zoom-in"
                      onClick={() => setSelectedPlan(i)}
                   >
                      <div className="aspect-[16/9] relative overflow-hidden">
                         {/* Plan Image */}
                         <motion.div 
                           layoutId={`plan-image-${i}`}
                           className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                           style={{ backgroundImage: `url(${plan.image})` }}
                         />
                         
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest border border-white/30 px-4 py-2 bg-black/50 backdrop-blur-sm">
                               <Maximize2 className="w-4 h-4" />
                               View Blueprint
                            </span>
                         </div>
                      </div>
                      <div className="p-4 border-t border-border bg-background flex justify-between items-center">
                         <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">{plan.title}</p>
                         <span className="text-[10px] font-mono text-muted-foreground/50">IMG_0{i+1}</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </motion.div>

          {/* Location & Landmarks Section */}
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="mt-32 pt-20 border-t border-border grid lg:grid-cols-2 gap-12"
          >
             {/* Landmarks List */}
             <div>
                <div className="flex items-center gap-4 mb-8">
                   <MapPin className="w-5 h-5 text-primary" />
                   <h3 className="text-2xl font-bold tracking-tight">Location & Vicinity</h3>
                </div>
                
                <div className="space-y-4">
                   {nearbyLandmarks.map((landmark, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-border bg-background hover:bg-muted/10 transition-colors">
                         <span className="font-medium text-foreground">{landmark.name}</span>
                         <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-widest">
                            {landmark.distance}
                         </Badge>
                      </div>
                   ))}
                </div>
             </div>

             {/* Google Map Embed */}
             <div className="h-[400px] bg-muted border border-border relative overflow-hidden transition-all duration-700">
                <iframe 
                  src={mapEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
             </div>
          </motion.div>

        </div>
      </section>

      {/* Full Screen Plan Viewer */}
      <AnimatePresence>
        {selectedPlanIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={closeViewer}
          >
            {/* Controls */}
            <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
               <div className="flex bg-background border border-border rounded-md overflow-hidden">
                  <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-10 w-10 hover:bg-muted rounded-none border-r border-border">
                     <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-10 w-10 hover:bg-muted rounded-none">
                     <ZoomIn className="w-4 h-4" />
                  </Button>
               </div>
               <Button 
                 variant="outline" 
                 size="icon" 
                 onClick={closeViewer}
                 className="h-10 w-10 rounded-full border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-colors"
               >
                 <X className="w-5 h-5" />
               </Button>
            </div>

            {/* Info Badge */}
            <div className="absolute top-6 left-6 z-50 pointer-events-none">
               <span className="font-mono text-xs text-white/50 uppercase tracking-widest block mb-1">Blueprint Viewer</span>
               <h3 className="text-xl font-bold text-white">{floorPlans[selectedPlanIndex].title}</h3>
            </div>

            {/* Content */}
            <div 
              className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
              onClick={(e) => e.stopPropagation()}
            >
               <motion.div
                 layoutId={`plan-image-${selectedPlanIndex}`}
                 className="relative w-full h-full"
                 drag
                 dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                 style={{ cursor: scale > 1 ? "grab" : "default" }}
               >
                 <motion.img 
                   src={floorPlans[selectedPlanIndex].image} 
                   alt={floorPlans[selectedPlanIndex].title}
                   className="w-full h-full object-contain"
                   animate={{ scale }}
                   transition={{ type: "spring", stiffness: 200, damping: 20 }}
                 />
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}