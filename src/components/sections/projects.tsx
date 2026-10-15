"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef, ViewTransition } from "react";
import { ProjectCover } from "@/components/project-cover";
import { Reveal, SplitHeading } from "@/components/ui/reveal";
import { projects, type Project } from "@/data/site";

/**
 * Tarjeta "sticky": se queda fija arriba y se encoge/oscurece cuando la siguiente la cubre.
 */
function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  const start = index / total;
  const targetScale = 1 - (total - index) * 0.04;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [0, index === total - 1 ? 0 : 0.5]);

  return (
    <div ref={ref} className="sticky top-0 flex h-svh items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(5vh + ${index * 28}px)` }}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-line bg-bg-elev will-change-transform"
      >
        <Link
          href={`/proyectos/${project.slug}`}
          transitionTypes={["nav-forward"]}
          data-cursor="Ver"
          className="group grid md:grid-cols-[1fr_1.35fr]"
        >
          <div className="flex flex-col justify-between gap-10 p-7 sm:p-10">
            <div>
              <div className="flex items-center justify-between font-mono text-xs tracking-wider text-muted uppercase">
                <span>{project.category}</span>
                <span>{project.year}</span>
              </div>
              <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
                <h3 className="mt-6 text-4xl font-medium tracking-[-0.03em] sm:text-6xl">{project.title}</h3>
              </ViewTransition>
              <p className="mt-5 max-w-md leading-relaxed text-fg/60">{project.summary}</p>
            </div>
            <div className="flex items-end justify-between gap-4">
              <ul className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((t) => (
                  <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-fg/70">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[460px]">
            <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
              <motion.div style={{ scale: imageScale }} className="absolute inset-0 will-change-transform">
                <div className="size-full transition-transform duration-1000 ease-out-expo group-hover:scale-105">
                  <ProjectCover project={project} />
                </div>
              </motion.div>
            </ViewTransition>
          </div>
        </Link>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}

export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="proyectos" className="relative px-4 pt-28 sm:px-6 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">(02) — Proyectos</p>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SplitHeading
              text="Trabajo seleccionado"
              className="text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-7xl"
              wordClassName={(w) => (w === "seleccionado" ? "font-serif font-normal italic text-accent" : undefined)}
            />
            <Reveal delay={0.2}>
              <p className="max-w-xs text-fg/60">
                Casos reales donde la tecnología resolvió un problema concreto de negocio.
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={container} className="relative mt-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
