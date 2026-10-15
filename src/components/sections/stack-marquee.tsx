"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { stack } from "@/data/site";

/**
 * Cinta infinita que se acelera y cambia de dirección según la velocidad del scroll.
 */
function VelocityRow({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 will-change-transform" style={{ x, skewX: skew }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <span key={item} className="flex items-center gap-8 pr-8 text-5xl font-medium tracking-tight sm:text-7xl">
                <span className={i % 2 ? "text-outline" : "text-fg"}>{item}</span>
                <span className="text-3xl text-accent sm:text-5xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function StackMarquee() {
  const half = Math.ceil(stack.length / 2);
  return (
    <section aria-label="Tecnologías" className="relative space-y-4 border-y border-line py-10 sm:py-14">
      <VelocityRow items={stack.slice(0, half)} baseVelocity={-2.5} />
      <VelocityRow items={stack.slice(half)} baseVelocity={2.5} />
    </section>
  );
}
