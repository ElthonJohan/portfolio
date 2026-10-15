import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { StackMarquee } from "@/components/sections/stack-marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <StackMarquee />
      <Services />
      <Projects />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
