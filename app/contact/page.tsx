"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT_DETAILS } from "@/lib/data";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-primary">Inquiries</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mt-4 mb-8">
            Start a Conversation.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are looking for an industrial lot, a commercial space, or a new home, our team is ready to assist.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          
          {/* Contact Info Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            {CONTACT_DETAILS.map((item, i) => (
              <div key={i} className="flex gap-4">
                 <item.icon className="w-5 h-5 text-primary mt-1" />
                 <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">{item.label}</h4>
                    {item.lines.map((line, l) => (
                       <p key={l} className="font-medium text-foreground">{line}</p>
                    ))}
                 </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
          >
             <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <Label htmlFor="firstName" className="font-mono text-xs uppercase tracking-widest">First Name</Label>
                      <Input id="firstName" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Jane" />
                   </div>
                   <div className="space-y-3">
                      <Label htmlFor="lastName" className="font-mono text-xs uppercase tracking-widest">Last Name</Label>
                      <Input id="lastName" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="Doe" />
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <Label htmlFor="email" className="font-mono text-xs uppercase tracking-widest">Email</Label>
                      <Input id="email" type="email" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="jane@example.com" />
                   </div>
                   <div className="space-y-3">
                      <Label htmlFor="phone" className="font-mono text-xs uppercase tracking-widest">Phone</Label>
                      <Input id="phone" type="tel" className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" placeholder="+63 900 000 0000" />
                   </div>
                </div>

                <div className="space-y-3">
                   <Label htmlFor="message" className="font-mono text-xs uppercase tracking-widest">Message</Label>
                   <Textarea 
                      id="message" 
                      className="rounded-none border-t-0 border-x-0 border-b border-border bg-transparent px-0 min-h-[100px] resize-y focus-visible:ring-0 focus-visible:border-primary" 
                      placeholder="Tell us about your requirements..."
                   />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="rounded-none px-10 font-mono text-xs uppercase tracking-widest">
                    Send Message
                  </Button>
                </div>
             </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
