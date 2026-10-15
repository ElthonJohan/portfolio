import Image from "next/image";
import type { Project } from "@/data/site";

/**
 * Portada del proyecto. Si el proyecto tiene `image`, muestra la captura;
 * si no, genera un arte abstracto con su paleta y una maqueta de interfaz.
 */
export function ProjectCover({ project, priority }: { project: Project; priority?: boolean }) {
  const [a, b] = project.palette;

  if (project.image) {
    return (
      <div className="relative size-full overflow-hidden bg-bg-elev">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative size-full overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 85% 10%, ${a}55 0%, transparent 55%), radial-gradient(90% 80% at 10% 100%, ${b} 0%, transparent 60%), #0c0c0f`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / .5) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / .5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      {/* Maqueta de ventana */}
      <div className="absolute inset-x-[10%] top-[18%] bottom-0 rounded-t-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-4 h-2 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-[1fr_3fr] gap-4 p-4 sm:p-6">
          <div className="space-y-2.5">
            {[70, 90, 55, 80, 65].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-lg border border-white/10 bg-white/[0.04] sm:h-16" />
              ))}
            </div>
            <svg viewBox="0 0 300 90" className="h-20 w-full sm:h-28" preserveAspectRatio="none" aria-hidden>
              <defs>
                <linearGradient id={`g-${project.slug}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={a} stopOpacity="0.5" />
                  <stop offset="100%" stopColor={a} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 70 C40 60 60 30 100 40 S160 75 200 45 S260 10 300 20 V90 H0Z" fill={`url(#g-${project.slug})`} />
              <path d="M0 70 C40 60 60 30 100 40 S160 75 200 45 S260 10 300 20" fill="none" stroke={a} strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
