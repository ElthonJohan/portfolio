"use client";

import { useSyncExternalStore } from "react";

/** Lee una media query del navegador. En el servidor siempre devuelve `false`. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noop = () => () => {};

/** Año actual calculado sólo en el cliente (evita usar la fecha durante el prerender). */
export function useCurrentYear() {
  return useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
}
