"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Riley, your Richmond Land assistant. How can I help you today?" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLabel(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
      } else {
        throw new Error("No response");
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "bot", content: "I apologize, but I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (content: string) => {
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (match) {
        return (
          <a 
            key={i} 
            href={match[2]} 
            target={match[2].startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 font-semibold"
          >
            {match[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans flex flex-col items-end gap-4">
      {/* Floating Label */}
      <AnimatePresence>
        {!isOpen && showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              boxShadow: [
                "0 0 0 0px rgba(255, 255, 255, 0)",
                "0 0 0 4px rgba(255, 255, 255, 0.1)",
                "0 0 0 0px rgba(255, 255, 255, 0)"
              ]
            }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ 
              opacity: { duration: 0.4 },
              x: { duration: 0.4 },
              boxShadow: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }
            }}
            className="relative bg-background border border-border px-4 py-2 shadow-2xl hidden sm:block"
          >
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-primary" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-primary" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground whitespace-nowrap">
              Inquiry? <span className="text-primary ml-2">Chat with Riley</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-background border border-border shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-foreground">Riley // RLII Assistant</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-muted" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages Container (Native Scroll) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth overscroll-contain bg-background/50">
                {messages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-none border border-border flex items-center justify-center shrink-0",
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={cn(
                      "p-3 text-sm leading-relaxed border",
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-muted/10 border-border text-foreground"
                    )}>
                      {renderMessage(msg.content)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                     <div className="w-8 h-8 rounded-none border border-border flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                        <Bot className="w-4 h-4" />
                     </div>
                     <div className="p-3 text-sm border bg-muted/10 border-border text-foreground flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span className="font-mono text-xs">Riley is thinking...</span>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background shrink-0">
                <div className="flex gap-2">
                  <Input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Riley about properties..." 
                    className="rounded-none border-border bg-transparent focus-visible:ring-0 focus-visible:border-primary font-mono text-xs h-10"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-10"
                    disabled={isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-border/50 hover:bg-primary/90 transition-colors"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="chat" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
