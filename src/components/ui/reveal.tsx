"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Aparece desplazándose hacia arriba cuando entra en pantalla. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
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
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

const line: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.1, delay: i * 0.08, ease: EASE },
  }),
};

/**
 * Titular con efecto "máscara": cada palabra sube desde debajo de una línea invisible.
 * Si se pasa `animate`, se controla manualmente (p. ej. al terminar el preloader);
 * si no, se dispara al entrar en pantalla.
 */
export function SplitHeading({
  text,
  className,
  wordClassName,
  animate,
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  animate?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const Comp = motion[as];
  const words = text.split(" ");
  const control =
    animate === undefined
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } }
      : { initial: "hidden", animate: animate ? "show" : "hidden" };

  return (
    <Comp className={className} aria-label={text} {...control}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={`inline-block origin-bottom-left ${wordClassName?.(w, i) ?? ""}`}
            variants={line}
            custom={i + delay / 0.08}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}
