"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

export const INTRO_KEY = "intro-seen";

/**
 * Pantalla de carga inicial: contador 0→100 y una cortina que sube revelando el sitio.
 * La animación es CSS pura (ver `.preloader` en globals.css), así empieza en el primer
 * pintado aunque el JavaScript del celular aún esté cargando. Se muestra una vez por sesión.
 */
export function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    // Al terminar la cortina se quita del DOM.
    const id = window.setTimeout(() => setGone(true), 2200);
    return () => window.clearTimeout(id);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="preloader pointer-events-none fixed inset-0 z-90 flex flex-col justify-between bg-[#0d0d10] p-6 sm:p-10"
    >
      <div className="preloader-fade flex items-center justify-between font-mono text-xs tracking-widest text-muted uppercase">
        <span>{profile.brand}</span>
        <span>Portfolio</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="preloader-fade max-w-xs font-serif text-2xl text-fg/70 italic sm:text-3xl">
          Ingeniería & software a medida
        </p>
        <span className="preloader-fade font-sans text-[22vw] leading-[0.8] font-medium tracking-tighter tabular-nums sm:text-[14vw]">
          <span className="preloader-count" />
          <span className="text-accent">%</span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
        <div className="preloader-bar h-full bg-accent" />
      </div>
    </div>
  );
}
