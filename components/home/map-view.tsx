"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROPERTIES } from "@/lib/data";

// Fix for default marker icon in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Custom Dark Mode Map Styles (CartoDB Dark Matter)
const DARK_MODE_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MapController({ selectedLocation }: { selectedLocation: any }) {
    const map = useMap();
    useEffect(() => {
        if (selectedLocation) {
            map.flyTo(selectedLocation.coordinates, 14, {
                duration: 1.5
            });
        }
    }, [selectedLocation, map]);
    return null;
}

export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<typeof PROPERTIES[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleMarkerClick = (location: typeof PROPERTIES[0]) => {
    setSelectedLocation(location);
    setIsSheetOpen(true);
  };

  return (
    <div className="relative w-full h-[600px] bg-background border-y border-border">
      <MapContainer 
        center={[6.15, 125.12]} 
        zoom={12} 
        scrollWheelZoom={false} 
        className="w-full h-full z-0"
        style={{ background: '#050505' }}
      >
        <TileLayer
          attribution={ATTRIBUTION}
          url={DARK_MODE_TILES}
        />
        
        {PROPERTIES.map((location) => (
          <Marker 
            key={location.id} 
            position={location.coordinates} 
            icon={customIcon}
            eventHandlers={{
                click: () => handleMarkerClick(location),
            }}
          />
        ))}
        
        <MapController selectedLocation={selectedLocation} />
      </MapContainer>

      {/* Slide-out Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[500px] border-l border-border bg-background/95 backdrop-blur-xl p-0">
            {selectedLocation && (
                <div className="flex flex-col h-full">
                    {/* Header Image Placeholder */}
                    <div className="h-48 bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />
                        <div className="absolute bottom-6 left-6">
                            <Badge variant="outline" className="mb-2 bg-black/50 backdrop-blur-md border-primary/30 text-primary">
                                {selectedLocation.category}
                            </Badge>
                            <SheetTitle className="text-3xl font-bold tracking-tighter text-white">
                                {selectedLocation.title}
                            </SheetTitle>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8">
                        <div>
                             <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Property Specs</h4>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 border border-border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Total Area</p>
                                    <p className="text-xl font-bold font-mono">{selectedLocation.stats.sqm.toLocaleString()} <span className="text-xs">SQM</span></p>
                                </div>
                                <div className="p-4 border border-border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                                    <p className="text-xl font-bold font-mono">{selectedLocation.stats.priceRange}</p>
                                </div>
                                {selectedLocation.stats.beds && (
                                    <div className="p-4 border border-border bg-card col-span-2">
                                        <p className="text-xs text-muted-foreground mb-1">Configuration</p>
                                        <p className="text-xl font-bold font-mono">{selectedLocation.stats.beds} Bedroom Units</p>
                                    </div>
                                )}
                             </div>
                        </div>

                        <div>
                             <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Description</h4>
                             <SheetDescription className="text-base text-foreground/80 leading-relaxed">
                                {selectedLocation.description}
                             </SheetDescription>
                        </div>
                    </div>

                    <div className="p-8 border-t border-border mt-auto">
                        <Button className="w-full h-14 rounded-none font-mono uppercase tracking-widest text-xs" asChild>
                            <Link href={`/properties/${selectedLocation.id}`}>
                                View Property Details <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </SheetContent>
      </Sheet>

      {/* Overlay Instructions */}
      <div className="absolute top-6 left-6 md:left-12 z-[400] pointer-events-none">
         <span className="inline-block border border-primary/20 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
            Interactive Map
         </span>
         <h2 className="text-3xl font-bold tracking-tighter text-white drop-shadow-md">
            Project Locations
         </h2>
      </div>
    </div>
  );
}
