import { motion } from "framer-motion";
import { WaveCanvas } from "@/components/WaveCanvas";

export function Hero() {
  const heading = "You vibed it into existence. Now let's make it real.";
  const words = heading.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <WaveCanvas />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, tracking: "0em" }}
          animate={{ opacity: 1, tracking: "0.25em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[10px] uppercase font-bold text-[#505050] mb-8 select-none"
        >
          Systems Infrastructure
        </motion.div>

        <motion.h1 
          variants={container}
          initial="hidden"
          animate="show"
          className="text-4xl sm:text-5xl md:text-[72px] leading-[1.1] tracking-[-0.03em] font-semibold text-primary max-w-4xl text-balance mb-8"
        >
          {words.map((word, i) => {
            const isVibed = word === "vibed";
            const isReal  = word === "real.";
            return (
              <motion.span
                key={i}
                variants={item}
                className="inline-block mr-[0.25em]"
              >
                {isVibed ? (
                  <em
                    style={{
                      fontStyle: 'italic',
                      fontWeight: 300,
                      letterSpacing: '0.01em',
                      fontFamily: "'Georgia', 'Times New Roman', serif",
                      color: '#c8c8c8',
                    }}
                  >
                    {word}
                  </em>
                ) : isReal ? (
                  <>
                    <em
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 300,
                        letterSpacing: '0.01em',
                        fontFamily: "'Georgia', 'Times New Roman', serif",
                        color: '#c8c8c8',
                      }}
                    >
                      {word}
                    </em>
                    <span className="inline-block animate-blink ml-0.5 opacity-60" style={{ fontStyle: 'normal', fontWeight: 400 }}>▋</span>
                  </>
                ) : word}
              </motion.span>
            );
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-[15px] leading-[1.7] text-muted-foreground max-w-2xl text-balance mb-12"
        >
          An autonomous council of specialist AI agents that debates, cross-references, and synthesizes code reviews across your entire project.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="https://github.com/metalheadshubham/Build/releases/download/v1.0.0/sentinel-1.0.0-setup.exe"
            className="flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
            </svg>
            Download for Windows
          </a>

          <a
            href="https://github.com/metalheadshubham/Build/releases/download/v1.0.0/sentinel-1.0.0.dmg"
            className="flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Download for Mac
          </a>
        </motion.div>
      </div>
    </section>
  );
}
