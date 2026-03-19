import { motion } from "framer-motion";
import { Download, Github } from "lucide-react";
import { ScrambleText } from "@/components/ScrambleText";

export function CTA() {
  return (
    <section className="py-40 px-6 md:px-12 text-center relative overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-[56px] font-semibold tracking-tight text-primary mb-6">
          <ScrambleText text="Deploy the council." />
        </h2>
        
        <p className="text-[16px] text-[#888888] mb-12">
          Open source. Free forever. Your code stays yours.
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-[15px] font-semibold hover:scale-105 active:scale-95 transition-transform duration-200">
            <Download className="w-4 h-4" />
            Download for Windows
          </button>
          
          <a 
            href="https://github.com/metalheadshubham/Sentinal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-transparent border border-[#333] text-primary px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#1a1a1a] hover:border-[#555] transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
