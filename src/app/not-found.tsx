import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">Error 404</p>
        <h1 className="mt-4 text-[28vw] leading-none font-medium tracking-tighter sm:text-[14rem]">
          4<span className="font-serif font-normal text-accent italic">0</span>4
        </h1>
        <p className="mt-4 text-lg text-fg/60">Esta página no existe o fue movida.</p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-ink transition-transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
