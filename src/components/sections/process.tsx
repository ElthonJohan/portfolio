"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { process } from "@/data/site";

/**
 * Sección "fijada": el scroll vertical desplaza los pasos en horizontal.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);

  // Distancia a recorrer = ancho de la fila − ancho visible (+ un margen final).
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 24));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="proceso" ref={ref} className="relative mt-28 sm:mt-40" style={{ height: `${process.length * 80}vh` }}>
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:mb-14 sm:px-6">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">(03) — Proceso</p>
            <h2 className="mt-5 text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-7xl">
              Cómo <span className="font-serif font-normal text-accent italic">trabajo</span>
            </h2>
          </div>
          <div className="hidden w-64 sm:block">
            <div className="flex justify-between font-mono text-xs text-muted">
              <span>01</span>
              <span>0{process.length}</span>
            </div>
            <div className="mt-2 h-px w-full bg-line">
              <motion.div className="h-full bg-accent" style={{ width: bar }} />
            </div>
          </div>
        </div>

        <motion.ol ref={track} style={{ x }} className="flex w-max will-change-transform gap-4 px-4 sm:gap-6 sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {process.map((step, i) => (
            <li
              key={step.title}
              className="relative flex h-[56svh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-bg-elev p-8 sm:w-[46vw] sm:p-12 lg:w-[38vw]"
            >
              <span
                aria-hidden
                className="text-outline pointer-events-none absolute -right-4 -bottom-10 text-[14rem] leading-none font-semibold tracking-tighter sm:text-[18rem]"
              >
                {i + 1}
              </span>
              <span className="font-mono text-sm text-accent">Paso 0{i + 1}</span>
              <div className="relative">
                <h3 className="text-3xl font-medium tracking-tight sm:text-5xl">{step.title}</h3>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-fg/60">{step.description}</p>
              </div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
