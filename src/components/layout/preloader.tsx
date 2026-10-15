"use client";

import { AnimatePresence, animate, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useFinishIntro } from "@/components/providers";
import { useMediaQuery } from "@/lib/hooks";
import { profile } from "@/data/site";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Pantalla de carga inicial: contador 0→100 y una cortina que sube revelando el sitio. */
export function Preloader() {
  const finish = useFinishIntro();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) {
      finish();
      return;
    }
    const controls = animate(0, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setVisible(false);
        window.setTimeout(finish, 350);
      },
    });
    return () => controls.stop();
  }, [reduced, finish]);

  return (
    <AnimatePresence>
      {visible && !reduced && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-[#0d0d10] p-6 sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            className="flex items-center justify-between font-mono text-xs tracking-widest text-muted uppercase"
            exit={{ opacity: 0 }}
          >
            <span>{profile.brand}</span>
            <span>Portfolio</span>
          </motion.div>

          <div className="flex items-end justify-between gap-6">
            <motion.p
              className="max-w-xs font-serif text-2xl text-fg/70 italic sm:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              Ingeniería & software a medida
            </motion.p>
            <motion.span
              className="font-sans text-[22vw] leading-[0.8] font-medium tracking-tighter tabular-nums sm:text-[14vw]"
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {count}
              <span className="text-accent">%</span>
            </motion.span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
            <div className="h-full bg-accent" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
