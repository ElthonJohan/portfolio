"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

/** Link que, para anclas de la home ("/#seccion"), desliza suavemente con Lenis. */
export function SmoothLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const lenis = useLenis();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
        if (hash && pathname === "/" && lenis) {
          e.preventDefault();
          lenis.scrollTo(hash === "#top" ? 0 : hash, { offset: -80, duration: 1.4 });
          history.replaceState(null, "", hash === "#top" ? "/" : hash);
        }
      }}
      {...props}
    />
  );
}
