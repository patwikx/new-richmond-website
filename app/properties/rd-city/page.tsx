"use client";

import { PropertyDetailView } from "@/components/properties/property-detail-view";
import { PROPERTIES } from "@/lib/data";
import { notFound } from "next/navigation";

export default function RDCityPage() {
  const property = PROPERTIES.find(p => p.id === "rd-city");
  
  if (!property) return notFound();

  return (
    <PropertyDetailView
      title={property.title}
      category={property.category}
      location={property.location}
      description={property.description}
      features={property.features}
      heroImage={property.image}
      secondaryImage={property.gallery[0]}
      ctaText="Invest in RD City"
      nearbyLandmarks={property.nearbyLandmarks || []}
      floorPlans={property.floorPlans || []}
      mapEmbedUrl={property.mapEmbedUrl || ""}
    />
  );
}