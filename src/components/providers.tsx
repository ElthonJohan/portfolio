"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const IntroContext = createContext<{ done: boolean; finish: () => void }>({
  done: false,
  finish: () => {},
});

/** `true` cuando el preloader terminó: las animaciones de entrada esperan a esto. */
export function useIntroDone() {
  return useContext(IntroContext).done;
}

export function useFinishIntro() {
  return useContext(IntroContext).finish;
}

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
  const [done, setDone] = useState(false);
  const finish = useCallback(() => setDone(true), []);

  return (
    <IntroContext value={{ done, finish }}>
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ lerp: 0.09 }}>
          <ScrollToTopOnRouteChange />
          {children}
        </ReactLenis>
      </MotionConfig>
    </IntroContext>
  );
}
