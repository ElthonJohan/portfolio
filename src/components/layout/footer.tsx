"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { SmoothLink } from "@/components/ui/smooth-link";
import { nav, profile, socials } from "@/data/site";
import { useCurrentYear } from "@/lib/hooks";

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

export function Footer() {
  const year = useCurrentYear();

  return (
    <footer className="relative border-t border-line px-4 pt-16 pb-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-2xl font-medium tracking-tight">{profile.brand}</p>
            <p className="mt-3 max-w-sm text-fg/60">
              {profile.brandType}. Fundado por {profile.name}, ingeniero de sistemas.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wider text-muted uppercase">Navegación</p>
            <ul className="mt-4 space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <SmoothLink href={n.href} className="text-fg/70 transition-colors hover:text-accent">
                    {n.label}
                  </SmoothLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-wider text-muted uppercase">Redes</p>
            <ul className="mt-4 space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-fg/70 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8 font-mono text-xs tracking-wider text-muted uppercase">
          <span>
            © {year ?? ""} {profile.name}
          </span>
          <span>
            {profile.location} · <LocalTime />
          </span>
          <Magnetic>
            <SmoothLink
              href="/#top"
              aria-label="Volver arriba"
              className="grid size-12 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
            >
              <ArrowUp className="size-4" />
            </SmoothLink>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
