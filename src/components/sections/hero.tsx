"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { SmoothLink } from "@/components/ui/smooth-link";
import { profile } from "@/data/site";

const HEADLINE = profile.headline;
const ACCENT_WORDS = new Set(profile.headlineAccent);

export function Hero() {
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

  // Entrada del hero en CSS (ver `.intro-*` en globals.css): visible sin esperar a JavaScript.
  const fadeUp = (delayMs: number) => ({
    className: "intro-fade",
    style: { "--d": `${delayMs}ms` } as React.CSSProperties,
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
          className="absolute inset-0 hidden opacity-30 pointer-fine:block"
          style={{
            backgroundImage:
              "linear-gradient(rgb(200 255 61) 1px, transparent 1px), linear-gradient(90deg, rgb(200 255 61) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: gridMask,
            WebkitMaskImage: gridMask,
          }}
        />
        <motion.div className="absolute inset-0 hidden pointer-fine:block" style={{ background: spotlight }} />
        {/* Manchas de luz: gradientes radiales (no `filter: blur`, que es muy costoso en móviles).
            Sólo se mueven en escritorio; en táctil quedan estáticas. */}
        <div
          className="absolute -top-[30%] -right-[25%] size-[60rem] max-w-none rounded-full pointer-fine:animate-[float-a_14s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(closest-side, rgb(200 255 61 / 0.16), transparent)" }}
        />
        <div
          className="absolute -bottom-[40%] -left-[25%] size-[56rem] max-w-none rounded-full pointer-fine:animate-[float-b_18s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(closest-side, rgb(91 61 255 / 0.18), transparent)" }}
        />
      </div>

      <motion.div style={{ scale, opacity, y }} className="relative mx-auto w-full max-w-7xl origin-bottom will-change-transform">
        {/* <div {...fadeUp(100)} className="intro-fade mb-8 flex flex-wrap items-center gap-3">
          {profile.available && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-xs text-fg/80">
              <span className="size-2 animate-pulse-dot rounded-full bg-accent" />
              Disponible para nuevos proyectos
            </span>
          )}
          <span className="font-mono text-xs tracking-wider text-muted uppercase">{profile.location}</span>
        </div> */}

        <h1
          aria-label={HEADLINE}
          className="max-w-6xl text-[13vw] leading-[0.92] font-medium tracking-[-0.045em] sm:text-[9vw] lg:text-[7.6rem]"
        >
          {HEADLINE.split(" ").map((w, i, all) => (
            <span key={i} aria-hidden className="-mb-[0.12em] inline-flex overflow-hidden pb-[0.12em] align-top">
              <span
                className={`intro-word ${ACCENT_WORDS.has(w) ? "font-serif font-normal tracking-[-0.02em] text-accent italic" : ""}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {w}
                {i < all.length - 1 && "\u00a0"}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div {...fadeUp(350)}>
            <p className="font-mono text-xs tracking-wider text-accent uppercase">{profile.role}</p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-fg/70 sm:text-xl">{profile.tagline}</p>
          </div>

          <div {...fadeUp(450)} className="intro-fade flex flex-wrap items-center gap-3 md:justify-end">
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
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden
        {...fadeUp(800)}
        className="intro-fade absolute right-6 bottom-12 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-16 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
