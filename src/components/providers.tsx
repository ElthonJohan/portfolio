"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTopOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    if (!hash) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    // Llegamos desde otra página a /#seccion: esperamos a que se pinte y deslizamos.
    // `resize()` actualiza el límite de scroll, que Lenis aún tiene de la página anterior.
    const id = window.setTimeout(() => {
      lenis.resize();
      lenis.scrollTo(hash, { offset: -80, immediate: true });
    }, 100);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.09 }}>
        <ScrollToTopOnRouteChange />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
