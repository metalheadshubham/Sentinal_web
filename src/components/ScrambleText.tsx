import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let iteration = 0;
    const maxIterations = 20; // roughly 400ms at 20ms per frame
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 2) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
      });

      iteration += 1;
      if (iteration > maxIterations + text.length * 2) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isInView, text]);

  return (
    <motion.span ref={ref} className={className}>
      {displayText || text.replace(/./g, "\u00A0")}
    </motion.span>
  );
}
