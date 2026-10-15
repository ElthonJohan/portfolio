"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useIntroDone } from "@/components/providers";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitHeading } from "@/components/ui/reveal";
import { SmoothLink } from "@/components/ui/smooth-link";
import { profile } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const ACCENT_WORDS = new Set(["impulsa", "crecer."]);

export function Hero() {
  const introDone = useIntroDone();
  const ref = useRef<HTMLElement>(null);

  // Parallax de salida: el hero se encoge y se desvanece al hacer scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Luz que sigue al cursor sobre la cuadrícula.
  const mx = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(40), { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgb(200 255 61 / 0.12), transparent 60%)`;
  const gridMask = useMotionTemplate`radial-gradient(500px circle at ${mx}% ${my}%, black, transparent 70%)`;

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-svh items-end overflow-hidden px-4 pt-32 pb-12 sm:px-6"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      {/* Fondo: cuadrícula tenue + cuadrícula iluminada por el cursor + orbes */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black 40%, transparent)",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgb(200 255 61) 1px, transparent 1px), linear-gradient(90deg, rgb(200 255 61) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
        <motion.div
          className="absolute -top-40 -right-40 size-[38rem] rounded-full bg-accent/20 blur-[140px]"
          animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-60 -left-40 size-[34rem] rounded-full bg-[#5b3dff]/20 blur-[140px]"
          animate={{ x: [0, 80, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ scale, opacity, y }} className="relative mx-auto w-full max-w-7xl origin-bottom">
        <motion.div {...fadeUp(0.1)} className="mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg/80 backdrop-blur">
              <span className="size-2 animate-pulse-dot rounded-full bg-accent" />
              Disponible para nuevos proyectos
            </span>
          )}
          <span className="font-mono text-xs tracking-wider text-muted uppercase">{profile.location}</span>
        </motion.div>

        <SplitHeading
          as="h1"
          animate={introDone}
          text="Construyo software que impulsa a tu empresa a crecer."
          className="max-w-6xl text-[13vw] leading-[0.92] font-medium tracking-[-0.045em] sm:text-[9vw] lg:text-[7.6rem]"
          wordClassName={(w) => (ACCENT_WORDS.has(w) ? "font-serif font-normal italic text-accent tracking-[-0.02em]" : undefined)}
        />

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.div {...fadeUp(0.5)}>
            <p className="font-mono text-xs tracking-wider text-accent uppercase">{profile.role}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-fg/70 sm:text-xl">{profile.tagline}</p>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="flex flex-wrap items-center gap-3 md:justify-end">
            <Magnetic>
              <SmoothLink
                href="/#proyectos"
                className="group inline-flex items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-6 font-medium text-accent-ink"
              >
                Ver proyectos
                <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-accent-ink text-accent">
                  <ArrowDownRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]" />
                </span>
              </SmoothLink>
            </Magnetic>
            <Magnetic>
              <SmoothLink
                href="/#contacto"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 font-medium transition-colors hover:border-fg/40 hover:bg-white/[0.04]"
              >
                Cotizar proyecto
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </SmoothLink>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute right-6 bottom-12 hidden flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
