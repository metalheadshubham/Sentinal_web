import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between border-b border-transparent",
        scrolled ? "backdrop-blur-md bg-[rgba(15,15,15,0.8)] border-[#1e1e1e]" : ""
      )}
    >
      <div className="font-bold text-[13px] tracking-[0.3em] text-primary select-none">
        SENTINEL
      </div>
      
      <div className="flex items-center gap-8 text-[13px] font-medium text-muted-foreground tracking-wide">
        <button onClick={() => scrollTo('council')} className="hover:text-primary transition-colors duration-200">
          Council
        </button>
        <button onClick={() => scrollTo('process')} className="hover:text-primary transition-colors duration-200">
          Process
        </button>
        <a 
          href="https://github.com/metalheadshubham/Sentinal" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors duration-200"
        >
          GitHub
        </a>
      </div>
    </motion.nav>
  );
}
