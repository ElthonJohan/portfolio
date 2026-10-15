import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/ui/reveal";
import { getProject, projects } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const url = `/proyectos/${project.slug}`;
  const title = `${project.title} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description: project.summary },
    twitter: { title, description: project.summary },
  };
}

export default async function ProjectPage({ params }: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <article className="mx-auto max-w-7xl">
        <ViewTransition enter="page-fade" exit="none" default="none">
          <div>
            <Link
              href="/#proyectos"
              transitionTypes={["nav-back"]}
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
              Volver a proyectos
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs tracking-wider text-muted uppercase">
              <span className="text-accent">{project.category}</span>
              <span>{project.year}</span>
            </div>
          </div>
        </ViewTransition>

        <ViewTransition name={`title-${project.slug}`} share="morph" default="none">
          <h1 className="mt-4 text-6xl leading-[0.9] font-medium tracking-[-0.045em] sm:text-8xl lg:text-9xl">
            {project.title}
          </h1>
        </ViewTransition>

        <ViewTransition name={`cover-${project.slug}`} share="morph" default="none">
          <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[2rem] border border-line sm:aspect-[16/8]">
            <ProjectCover project={project} priority />
          </div>
        </ViewTransition>

        <ViewTransition enter="page-fade" exit="none" default="none">
          <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
            <aside className="space-y-10">
              <div>
                <p className="font-mono text-xs tracking-wider text-muted uppercase">Tecnologías</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-3 py-1 text-sm text-fg/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              {(project.links?.live || project.links?.repo) && (
                <div className="flex flex-wrap gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink"
                    >
                      Ver en vivo
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-fg/40"
                    >
                      Código
                    </a>
                  )}
                </div>
              )}
            </aside>

            <div className="space-y-16">
              <div className="space-y-6 text-xl leading-relaxed text-fg/80 sm:text-2xl">
                {project.description.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>

              <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                <div className="bg-bg p-8">
                  <p className="font-mono text-xs tracking-wider text-muted uppercase">El reto</p>
                  <p className="mt-4 leading-relaxed text-fg/70">{project.challenge}</p>
                </div>
                <div className="bg-bg p-8">
                  <p className="font-mono text-xs tracking-wider text-accent uppercase">La solución</p>
                  <p className="mt-4 leading-relaxed text-fg/70">{project.solution}</p>
                </div>
              </div>

              <div>
                <p className="font-mono text-xs tracking-wider text-muted uppercase">Resultados</p>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {project.results.map((r, i) => (
                    <Reveal as="li" key={r} delay={i * 0.08} className="flex items-baseline gap-6 py-6">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <span className="text-2xl font-medium tracking-tight sm:text-3xl">{r}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ViewTransition>

        <Link
          href={`/proyectos/${next.slug}`}
          transitionTypes={["nav-forward"]}
          data-cursor="Siguiente"
          className="group mt-32 block border-t border-line pt-10"
        >
          <p className="font-mono text-xs tracking-wider text-muted uppercase">Siguiente proyecto</p>
          <div className="mt-4 flex items-center justify-between gap-6">
            <span className="text-5xl font-medium tracking-[-0.04em] transition-colors duration-500 group-hover:text-accent sm:text-8xl">
              {next.title}
            </span>
            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink sm:size-24">
              <ArrowUpRight className="size-6" />
            </span>
          </div>
        </Link>
      </article>
    </main>
  );
}
