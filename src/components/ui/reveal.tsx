"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Aparece desplazándose hacia arriba cuando entra en pantalla. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const line: Variants = {
  hidden: { y: "110%", rotate: 3 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.85, delay: i * 0.05, ease: EASE },
  }),
};

/** Titular con efecto "máscara": cada palabra sube desde debajo de una línea invisible al entrar en pantalla. */
export function SplitHeading({
  text,
  className,
  wordClassName,
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const Comp = motion[as];
  const words = text.split(" ");
  return (
    <Comp
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block origin-bottom-left ${wordClassName?.(w, i) ?? ""}`}
            variants={line}
            custom={i + delay / 0.05}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
