"use client";

import { animate, motion, useInView, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/site";

/** Párrafo cuyas palabras se iluminan progresivamente a medida que haces scroll. */
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="flex flex-wrap text-2xl leading-[1.25] font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em]">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString();
      },
    });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function About() {
  return (
    <section id="sobre-mi" className="relative px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[280px_1fr]">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">(04) — Sobre mí</p>
        </Reveal>

        <div>
          <ScrollText text={profile.about[0]} />
          <Reveal className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/60" delay={0.1}>
            <p>{profile.about[1]}</p>
          </Reveal>

          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {profile.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="bg-bg p-6 sm:p-8">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-3 text-5xl font-medium tracking-tighter sm:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
