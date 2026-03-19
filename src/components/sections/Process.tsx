import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Point at Source",
    desc: "Select any local project folder. SENTINEL indexes the entire tree, building a comprehensive understanding of your project's state."
  },
  {
    num: "02",
    title: "Council Convenes",
    desc: "The specialized agents debate. They cross-reference logic across files, identifying systemic issues that single-file LLMs miss."
  },
  {
    num: "03",
    title: "Actionable Report",
    desc: "Receive a definitive report. Every recommendation ranked by severity and effort, with a complete explanation from the council."
  }
];

export function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-border">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h2 className="text-4xl md:text-[48px] font-semibold tracking-tight text-primary">Process</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="relative pl-6 md:pl-8 border-l border-border"
          >
            <div className="absolute left-[-1px] top-0 w-[2px] h-0 bg-primary origin-top"
                 style={{ animation: `growLine 1s ease-out ${i * 0.2}s forwards` }} />
            
            <div className="text-4xl font-serif italic text-[#333] mb-6">
              {step.num}
            </div>
            <h3 className="text-xl font-medium text-primary mb-4">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-[#888888]">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
      <style>{`
        @keyframes growLine {
          from { height: 0; }
          to { height: 32px; }
        }
      `}</style>
    </section>
  );
}
