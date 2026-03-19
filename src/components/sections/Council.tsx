import { motion } from "framer-motion";

const AGENTS = [
  { id: "LEAD", role: "Orchestrator", desc: "Manages context distribution and synthesises conflicting agent perspectives into a single roadmap." },
  { id: "AUDIT", role: "Security Auditor", desc: "Scans for vulnerabilities, credential leaks, and dependency chain risks within the local codebase." },
  { id: "ACTION", role: "Refactor Agent", desc: "Proposes structural changes to improve readability and maintainability without breaking logic." },
  { id: "HYGIENE", role: "Cleaner", desc: "Identifies dead code, unused imports, and style inconsistencies across the project." },
  { id: "QUALITY", role: "Test Engineer", desc: "Generates edge case unit tests and identifies gaps in current test coverage." },
  { id: "DESIGN", role: "Architect", desc: "Analyzes module boundaries and dependency graphs to ensure sound design principles." },
  { id: "EFFICIENCY", role: "Performance", desc: "Locates computational bottlenecks and inefficient memory allocation patterns." },
  { id: "CONTEXT", role: "Documenter", desc: "Generates technical documentation and ensures inline comments match actual logic." },
];

export function Council() {
  return (
    <section id="council" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-[48px] font-semibold tracking-tight text-primary mb-6">The Specialists</h2>
        <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-2xl">
          SENTINEL operates as a hierarchical council of specialist agents, each focused on a specific domain of the software engineering lifecycle.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative bg-card border border-border rounded-xl p-6 overflow-hidden hover:bg-[#1a1a1a] transition-colors duration-300"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary h-0 group-hover:h-full transition-all duration-300 ease-out" />
            
            <div className="text-[10px] uppercase tracking-widest text-[#505050] font-bold mb-4">
              {agent.id}
            </div>
            <h3 className="text-lg font-medium text-primary mb-3">
              {agent.role}
            </h3>
            <p className="text-[14px] leading-relaxed text-[#888888]">
              {agent.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
