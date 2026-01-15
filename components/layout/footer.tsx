"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COMPANY_INFO, NAV_LINKS, PROPERTIES } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground pt-20 pb-10 border-t border-border relative overflow-hidden">
      
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-16 mb-16">
          
          {/* Mission / Brand */}
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{COMPANY_INFO.name}</span>
             </div>
             <p className="text-lg md:text-xl leading-relaxed max-w-sm text-muted-foreground">
                {COMPANY_INFO.tagline} <br />
                Building infrastructure that powers communities.
             </p>
          </div>

          {/* SITEMAP */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-6">Directory</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 opacity-0 group-hover:opacity-100 text-primary">/</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROJECTS */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-primary mb-6">Projects</h4>
            <ul className="space-y-2">
               {PROPERTIES.map((project) => (
                <li key={project.id}>
                  <Link 
                    href={`/properties/${project.id}`} 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-between group border-b border-border/30 pb-1"
                  >
                    {project.title}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
               ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-center md:text-left">
            <span>&copy; {currentYear} {COMPANY_INFO.shortName}.</span>
            <span className="hidden md:inline">|</span>
            <span>{COMPANY_INFO.address.country}</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
