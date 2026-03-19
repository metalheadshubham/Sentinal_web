import { motion } from "framer-motion";
import { Shield, BrainCircuit, ScanEye, Network } from "lucide-react";

const FEATURES = [
  {
    icon: Shield,
    title: "Local-First Privacy",
    desc: "Run entirely on your hardware using Ollama. Your source code never leaves your perimeter unless you explicitly choose otherwise."
  },
  {
    icon: BrainCircuit,
    title: "Multi-Model Council",
    desc: "Bridge the best of both worlds. Connect to Claude, GPT-4o, or Gemini for high-level orchestration while keeping audits local."
  },
  {
    icon: ScanEye,
    title: "Zero Hallucination Focus",
    desc: "Every claim made by the council is verified against the actual code. No guessing. No hallucinations. Pure signal."
  },
  {
    icon: Network,
    title: "Deep Context Synthesis",
    desc: "SENTINEL builds a complete abstract syntax tree of the project, giving each agent true understanding rather than pattern matching."
  }
];

export function Features() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-[48px] font-semibold tracking-tight text-primary">Infrastructure</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-card border border-border p-8 md:p-10 rounded-2xl flex flex-col items-start hover:border-[#333] transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center border border-[#222] mb-6">
              <feat.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-medium text-primary mb-4">
              {feat.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[#888888]">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
