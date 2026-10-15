"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Cursor personalizado: un punto que sigue al mouse y un anillo con inercia.
 * Cualquier elemento con `data-cursor="Texto"` agranda el anillo y muestra la etiqueta;
 * enlaces y botones lo agrandan sin texto.
 */
export function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, input, textarea, select");
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setHidden(true);

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 48 : 32;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgb(200 255 61 / 1)" : "rgb(200 255 61 / 0)",
          borderColor: label ? "rgb(200 255 61 / 0)" : hovering ? "rgb(200 255 61 / 0.9)" : "rgb(255 255 255 / 0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        initial={false}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-semibold tracking-wide text-accent-ink uppercase"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: label ? 0 : 1 }}
      />
    </div>
  );
}
