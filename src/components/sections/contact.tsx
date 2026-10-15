"use client";

import { ArrowUpRight, Check, Copy, MessageCircle, RotateCcw, Send } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { socialIcons } from "@/components/ui/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { profile, services, socials } from "@/data/site";

const budgets = ["< $1.000", "$1.000 – $5.000", "$5.000 – $15.000", "+ $15.000", "Aún no lo sé"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="group block">
      <span className="font-mono text-xs tracking-wider text-muted uppercase transition-colors group-focus-within:text-accent">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "mt-2 w-full border-b border-line bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-fg/25 focus:border-accent";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const [service, setService] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  // Mensaje ya armado tras enviar: se muestra el panel con alternativas.
  const [sent, setSent] = useState<{ subject: string; body: string } | null>(null);

  // Sin backend: el formulario arma el correo y abre la app de correo del visitante.
  // Si en su computadora no tiene una configurada, el panel posterior le ofrece copiar
  // el email o enviar el mismo mensaje por WhatsApp.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Nombre: ${data.get("name")}`,
      `Empresa: ${data.get("company") || "-"}`,
      `Email: ${data.get("email")}`,
      `Servicio: ${service || "-"}`,
      `Presupuesto: ${budget || "-"}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    const subject = `Nuevo proyecto — ${data.get("company") || data.get("name")}`;
    setSent({ subject, body });
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contacto" ref={ref} className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-40">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/4 -z-10 mx-auto size-[60rem] max-w-none rounded-full"
        style={{ background: "radial-gradient(closest-side, rgb(200 255 61 / 0.08), transparent)" }}
      />
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs tracking-widest text-muted uppercase">(05) — Contacto</p>

        <motion.h2
          style={{ x }}
          className="mt-6 text-[17vw] leading-[0.85] font-medium tracking-[-0.06em] whitespace-nowrap will-change-transform lg:text-[13rem]"
        >
          Hablemos<span className="font-serif font-normal text-accent italic">.</span>
        </motion.h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="space-y-10">
            <p className="max-w-sm text-xl leading-relaxed text-fg/70">
              ¿Tienes un proyecto, una idea o un proceso que quieres automatizar? Cuéntame y te respondo en menos de 24 horas
              con una propuesta.
            </p>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
                >
                  {profile.email}
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </Magnetic>
              {profile.whatsapp && (
                <Magnetic>
                  <a
                    href={`https://wa.me/${profile.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
                  >
                    WhatsApp
                  </a>
                </Magnetic>
              )}
            </div>
            <ul className="flex gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <li key={s.label}>
                    <Magnetic strength={0.5}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid size-12 place-items-center rounded-full border border-line text-fg/70 transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                      >
                        <Icon className="size-4" />
                      </a>
                    </Magnetic>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="relative">
            <AnimatePresence>
              {sent && <SentPanel subject={sent.subject} body={sent.body} onReset={() => setSent(null)} />}
            </AnimatePresence>
            <form
              onSubmit={onSubmit}
              inert={!!sent}
              className={`space-y-10 rounded-[2rem] border border-line bg-bg-elev/80 p-6 transition-opacity duration-500 sm:p-10 ${sent ? "opacity-0" : ""}`}
            >
              <div className="grid gap-10 sm:grid-cols-2">
                <Field label="Nombre">
                  <input required name="name" autoComplete="name" placeholder="Tu nombre" className={inputCls} />
                </Field>
                <Field label="Empresa">
                  <input name="company" autoComplete="organization" placeholder="Opcional" className={inputCls} />
                </Field>
              </div>
              <Field label="Email">
                <input required type="email" name="email" autoComplete="email" placeholder="tu@empresa.com" className={inputCls} />
              </Field>

              <fieldset>
                <legend className="font-mono text-xs tracking-wider text-muted uppercase">¿Qué necesitas?</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Chip key={s.title} active={service === s.title} onClick={() => setService(service === s.title ? "" : s.title)}>
                      {s.title}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-mono text-xs tracking-wider text-muted uppercase">Presupuesto estimado (USD)</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                      {b}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <Field label="Cuéntame del proyecto">
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Objetivos, plazos, sistemas actuales…"
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-accent px-8 py-5 font-medium text-accent-ink sm:w-auto"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-fg transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
                <span className="relative">Enviar propuesta</span>
                <Send className="relative size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Tras enviar: confirma y ofrece alternativas por si no se abrió la app de correo. */
function SentPanel({ subject, body, onReset }: { subject: string; body: string; onReset: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="absolute inset-0 z-10 flex flex-col justify-center rounded-[2rem] border border-accent/40 bg-bg-elev p-6 sm:p-10"
    >
      <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-ink">
        <Check className="size-6" strokeWidth={2.5} />
      </span>
      <h3 className="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">¡Tu mensaje está listo!</h3>
      <p className="mt-4 max-w-md leading-relaxed text-fg/60">
        Se abrió tu app de correo con todo redactado: sólo pulsa enviar. ¿No se abrió? Copia mi email o envíame el mismo
        mensaje por WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copyEmail}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-medium text-accent-ink transition-transform active:scale-95"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          {copied ? "¡Copiado!" : profile.email}
        </button>
        {profile.whatsapp && (
          <a
            href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:text-accent"
          >
            <MessageCircle className="size-4" />
            Enviar por WhatsApp
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 self-start font-mono text-xs tracking-wider text-muted uppercase transition-colors hover:text-fg"
      >
        <RotateCcw className="size-3.5" />
        Volver al formulario
      </button>
    </motion.div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
        active ? "border-accent bg-accent text-accent-ink" : "border-line text-fg/70 hover:border-fg/40 hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
