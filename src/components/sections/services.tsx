"use client";

import { Check } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { serviceIcons } from "@/components/ui/icons";
import { Reveal, SplitHeading } from "@/components/ui/reveal";
import { services } from "@/data/site";

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgb(200 255 61 / 0.10), transparent 50%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgb(200 255 61 / 0.7), transparent 60%)`;
  const Icon = serviceIcons[service.icon];

  return (
    <Reveal delay={(index % 3) * 0.08} className="h-full">
      <div
        className="group relative h-full rounded-3xl bg-line p-px"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => {
          x.set(-999);
          y.set(-999);
        }}
      >
        {/* Borde iluminado */}
        <motion.div aria-hidden className="absolute inset-0 rounded-3xl" style={{ background: border }} />
        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-bg-elev p-7 sm:p-8">
          <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />
          <div className="relative flex items-start justify-between">
            <span className="grid size-12 place-items-center rounded-2xl border border-line bg-white/[0.03] text-accent transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
              <Icon className="size-5" strokeWidth={1.6} />
            </span>
            <span className="font-mono text-xs text-muted">0{index + 1}</span>
          </div>
          <h3 className="relative mt-10 text-2xl font-medium tracking-tight">{service.title}</h3>
          <p className="relative mt-3 leading-relaxed text-fg/60">{service.description}</p>
          <ul className="relative mt-auto space-y-2 pt-8">
            {service.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-fg/80">
                <Check className="size-3.5 text-accent" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicios" className="relative px-4 py-28 sm:px-6 sm:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[280px_1fr]">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">(01) — Servicios</p>
          </Reveal>
          <div>
            <SplitHeading
              text="Soluciones que tu empresa necesita para crecer"
              className="max-w-4xl text-5xl leading-[0.95] font-medium tracking-[-0.04em] sm:text-7xl"
              wordClassName={(w) => (w === "crecer" ? "font-serif font-normal italic text-accent" : undefined)}
            />
            <Reveal delay={0.2} className="mt-6 max-w-xl text-lg text-fg/60">
              <p>
                Desde una página web hasta la infraestructura completa de tu operación. Un solo aliado técnico que
                entiende tanto el código como el negocio.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
