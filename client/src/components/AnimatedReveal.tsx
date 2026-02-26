import React from "react";
import { motion } from "framer-motion";

interface AnimatedRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimatedReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
}: AnimatedRevealProps) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
      case "down":
        return { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } };
      case "left":
        return { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
      case "right":
        return { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
      case "none":
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
