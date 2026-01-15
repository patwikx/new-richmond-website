"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";

// --- Scramble Hook ---
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(text);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={className}
    >
      {displayText}
    </span>
  );
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "py-4 bg-background/80 backdrop-blur-xl border-border/50" 
          : "py-8 bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative z-50 group">
            <div className="flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"> 
             <div className="relative w-32 h-12 md:w-40 md:h-14 overflow-hidden">
                <Image 
                  src="/RLII.png" 
                  alt="RLI Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
             </div>
           </div>
        </Link>

        {/* Minimal Desktop Nav with Scramble Effect */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-xs font-mono font-medium tracking-widest uppercase transition-colors px-2 py-1",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Text Scramble Component */}
                <ScrambleText text={link.name} />

                {/* Active Indicator (Corner brackets) */}
                {isActive && (
                  <>
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full bg-background border-l border-border p-0 overflow-hidden">
               <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
               
               <SheetTitle className="sr-only">Menu</SheetTitle>
               <div className="relative z-10 flex flex-col items-center justify-center h-full gap-10">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      className="group flex items-center gap-4 font-bold text-5xl uppercase tracking-tighter text-foreground/50 hover:text-foreground transition-all"
                    >
                       <span className="text-sm font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {`//`}
                      </span>
                      {link.name}
                    </Link>
                  ))}
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}