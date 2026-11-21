import { ArrowDown, ArrowRight, Mail, FileText } from "lucide-react";
import { profile } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { Reveal, TypeText } from "./Reveal";
import { Typewriter } from "./Typewriter";

export function Hero() {
  return (
    <section id="home">
      {/* Screen 1: the cover alone, fully visible */}
      <div className="relative flex h-svh flex-col items-center justify-end pb-10">
        <h1 className="sr-only">
          {profile.name} — {profile.titles[0]}
        </h1>
        <div className="glass mb-6 flex items-center gap-2 rounded-full px-4 py-2 text-xs text-foreground sm:text-sm">
          <span className="pulse-dot size-2 rounded-full bg-success" />
          <TypeText text={profile.availability} speed={70} />
        </div>
        <a href="#intro" className="scroll-cue flex flex-col items-center gap-1 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-neon">
          Scroll
          <ArrowDown className="size-5" />
        </a>
      </div>

      {/* Screen 2: text scrolls up over the now-blurred cover */}
      <div id="intro" className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-4 py-24 sm:px-6">
        <Reveal>
          <TypeText as="p" text={`Welcome to ${profile.brand}`} speed={90} className="mb-4 block font-display text-sm uppercase tracking-[0.35em] text-neon" />
          <p className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
            <TypeText text="HI, I'M" className="block" speed={120} />
            <TypeText text="GADDANGI JAMAN DORA" className="text-gradient block" delay={1100} speed={110} />
          </p>
          <p className="mt-6 min-h-[2.5em] font-display text-xl font-bold sm:text-2xl md:text-3xl">
            <Typewriter words={profile.titles} />
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{profile.heroText}</p>
          <p className="mt-4 font-display text-lg text-foreground">“{profile.tagline}”</p>
        </Reveal>
        <Reveal delay={300} className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="neon" size="xl">
            <a href="#projects">
              Explore My Work <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#resume">
              <FileText /> Resume
            </a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href="#contact">
              <Mail /> Contact Me
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
