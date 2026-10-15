"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { SmoothLink } from "@/components/ui/smooth-link";
import { useIntroDone } from "@/components/providers";
import { nav, profile } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const introDone = useIntroDone();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Se oculta al bajar y reaparece al subir.
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 300 && !open);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
        initial={{ y: -100 }}
        animate={{ y: !introDone || hidden ? -100 : 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled || open ? "border-line bg-bg/70 backdrop-blur-xl" : "border-transparent"
          }`}
        >
          <SmoothLink href="/#top" className="group flex items-center gap-2 pl-2" onClick={() => setOpen(false)}>
            <span className="grid size-8 place-items-center rounded-full bg-accent font-mono text-sm font-bold text-accent-ink transition-transform duration-500 group-hover:rotate-360">
              {profile.brand.slice(0, 2)}
            </span>
            <span className="font-medium tracking-tight">{profile.brand}</span>
          </SmoothLink>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <SmoothLink
                  href={item.href}
                  className="group block rounded-full px-4 py-2 text-sm text-fg/70"
                >
                  {/* Texto que "rueda" hacia arriba y deja paso a una copia en color acento */}
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                      {item.label}
                      <span aria-hidden className="absolute top-full left-0 text-accent">
                        {item.label}
                      </span>
                    </span>
                  </span>
                </SmoothLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-block">
              <SmoothLink
                href="/#contacto"
                className="block rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent"
              >
                Hablemos
              </SmoothLink>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative grid size-10 place-items-center rounded-full border border-line md:hidden"
            >
              <span className={`absolute h-px w-4 bg-fg transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-4 bg-fg transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-bg px-6 pt-28 pb-10 md:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="space-y-2">
              {[...nav, { label: "Contacto", href: "/#contacto" }].map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                  >
                    <SmoothLink
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block text-5xl font-medium tracking-tighter"
                    >
                      {item.label}
                    </SmoothLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-muted">{profile.email}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
