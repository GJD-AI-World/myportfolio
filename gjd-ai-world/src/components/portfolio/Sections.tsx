import {
  BadgeCheck, Briefcase, Code2, Cpu, GraduationCap, Lightbulb, MapPin, Palette, Rocket, Server, Sparkles, Target, Users,
} from "lucide-react";
import { useState } from "react";
import {
  aboutParagraphs, certificates, education, fde, profileFacts, projects, services, skills, timeline, vision, type SkillCategory,
} from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { Reveal, SectionHeading, TypeText } from "./Reveal";

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      {children}
    </section>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="Behind the Code – My Story" />
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="glass space-y-5 rounded-2xl p-6 md:p-10">
          <div className="flex items-center gap-4">
            <div className="bg-brand-gradient shadow-neon grid size-16 place-items-center rounded-full font-display text-xl font-bold text-primary-foreground">
              GJD
            </div>
            <div>
              <TypeText as="p" text="Gaddangi Jaman Dora" className="block font-display text-xl font-bold" />
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-4 text-neon" /> Paderu, Visakhapatnam
              </p>
            </div>
          </div>
          {aboutParagraphs.map((p) => (
            <p key={p} className="leading-relaxed text-muted-foreground">{p}</p>
          ))}
        </Reveal>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            {profileFacts.map((f, i) => (
              <Reveal key={f.label} variant="slide3d" delay={i * 140} className={cn("glass neon-card rounded-xl p-4", f.label === "Interests" && "col-span-2")}>
                <TypeText as="p" text={f.label} speed={80} className="block text-xs uppercase tracking-widest text-neon" />
                <TypeText as="p" text={f.value} speed={60} delay={500} className="mt-1 block text-sm font-medium" />
              </Reveal>
            ))}
          </div>
          <Reveal variant="slide3d" delay={200} className="glass rounded-2xl border-neon/40 p-6 shadow-neon">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <Target className="size-5 text-neon" /> <TypeText text="My Vision" />
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{vision}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

const filters: ("All" | SkillCategory)[] = ["All", "Frontend", "Backend", "Programming", "Learning"];

export function Skills() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = skills.filter((s) => filter === "All" || s.category === filter);
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="My Technical Arsenal" intro="Technologies I work with and the areas I'm actively learning." />
      <Reveal className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              filter === f ? "bg-brand-gradient border-transparent text-primary-foreground" : "glass text-muted-foreground hover:text-foreground",
            )}
          >
            <TypeText text={f === "Learning" ? "Learning Areas" : f} speed={90} />
          </button>
        ))}
      </Reveal>
      <Reveal key={filter}>
        <Marquee
          items={list}
          itemClassName="w-64"
          secondsPerItem={3.5}
          render={(s) => (
          <div className="glass neon-card flex items-center gap-4 rounded-xl p-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-secondary font-display text-sm font-bold text-neon">
              <TypeText text={s.short} speed={160} />
            </span>
            <div>
              <TypeText as="p" text={s.name} speed={85} className="block font-medium leading-tight" />
              <TypeText as="p" text={s.category} speed={80} delay={400} className="block text-xs text-muted-foreground" />
            </div>
          </div>
          )}
        />
      </Reveal>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Projects" title="Building Ideas into Real-World Solutions" />
      <Reveal>
        <Marquee
          items={projects}
          itemClassName="w-[min(85vw,30rem)]"
          secondsPerItem={9}
          minItems={4}
          render={(p, i) => (
          <div className="glass neon-card flex flex-col rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <TypeText text={p.id} speed={260} className="font-display text-5xl font-bold text-gradient" />
              <TypeText text={p.category} speed={55} className="rounded-full border px-3 py-1 text-xs text-muted-foreground" />
            </div>
            <TypeText as="h3" text={p.title} delay={i * 200 + 600} className="mt-4 block text-2xl font-bold" />
            <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {p.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="size-4 shrink-0 text-neon" /> <TypeText text={h} speed={70} />
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <TypeText key={t} text={t} speed={110} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-neon" />
              ))}
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-6">
              <Button asChild variant="glass">
                <a href={p.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              </Button>
              {p.liveUrl ? (
                <Button asChild variant="neon">
                  <a href={p.liveUrl} target="_blank" rel="noreferrer">Live Demo</a>
                </Button>
              ) : (
                <TypeText text="Live demo coming soon" speed={70} className="self-center text-xs text-muted-foreground" />
              )}
            </div>
          </div>
          )}
        />
      </Reveal>
      <Reveal variant="slide3d" className="mt-6 rounded-2xl border border-dashed p-8 text-center">
        <Rocket className="mx-auto size-8 text-neon" />
        <TypeText as="p" text="Upcoming Projects" className="mt-3 block font-display text-xl font-bold" />
        <p className="mt-1 text-sm text-muted-foreground">New builds from my FDE journey will appear here.</p>
      </Reveal>
    </Section>
  );
}

export function Journey() {
  return (
    <Section id="journey">
      <SectionHeading eyebrow="Journey" title="From Technical Education to Future Technology" />
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
            <GraduationCap className="size-5 text-neon" /> <TypeText text="My Educational Journey" />
          </h3>
          <ol className="relative space-y-6 border-l border-neon/30 pl-8">
            {education.map((e, i) => (
              <Reveal key={e.title} variant="slide3d" delay={i * 160} className="relative">
                <span className="bg-brand-gradient shadow-neon absolute -left-[41px] top-5 size-4 rounded-full" />
                <div className="glass neon-card rounded-xl p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <TypeText text={e.year} speed={110} className="font-display text-sm text-neon" />
                    <TypeText text={e.result} speed={110} className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold" />
                  </div>
                  <TypeText as="p" text={e.title} speed={75} className="mt-2 block font-semibold" />
                  <TypeText as="p" text={`${e.place} · ${e.location}`} speed={55} delay={600} className="block text-sm text-muted-foreground" />
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal variant="slide3d" className="glass rounded-2xl p-6 md:p-8">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <Cpu className="size-5 shrink-0 text-neon" /> <TypeText text="My Journey into Forward Deployed Engineering" />
          </h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">{fde.text}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {fde.facts.map((f) => (
              <div key={f.label} className="rounded-lg bg-secondary/60 p-3">
                <TypeText as="dt" text={f.label} speed={80} className="block text-xs uppercase tracking-widest text-neon" />
                <TypeText as="dd" text={f.value} speed={60} delay={500} className="mt-1 block text-sm font-medium" />
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {fde.areas.map((a) => (
              <TypeText key={a} text={a} speed={75} className="rounded-full border px-3 py-1 text-xs text-muted-foreground" />
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <Marquee
          items={timeline}
          itemClassName="w-72"
          secondsPerItem={5}
          render={(t) => (
            <div className="glass neon-card relative overflow-hidden rounded-xl p-5">
              <span className="line-flow absolute inset-x-0 top-0 h-0.5" />
              <TypeText as="p" text={t.year} speed={160} className="block font-display text-2xl font-bold text-gradient" />
              <TypeText as="p" text={t.text} speed={45} delay={600} className="mt-2 block text-sm text-muted-foreground" />
            </div>
          )}
        />
      </Reveal>
    </Section>
  );
}

export function Achievements() {
  return (
    <Section id="achievements">
      <SectionHeading eyebrow="Achievements" title="Certifications & Achievements" />
      <Reveal>
        <Marquee
          items={certificates}
          itemClassName="w-72"
          secondsPerItem={5}
          render={(c) => (
          <div className="glass neon-card overflow-hidden rounded-xl">
            {c.image ? (
              <img src={c.image} alt={c.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="grid aspect-[4/3] place-items-center bg-secondary/60 text-center">
                <div>
                  <BadgeCheck className="mx-auto size-8 text-neon" />
                  <TypeText as="p" text="Certificate Image Coming Soon" speed={60} className="mt-2 block text-xs text-muted-foreground" />
                </div>
              </div>
            )}
            <div className="p-4">
              <TypeText as="p" text={c.title} speed={75} className="block font-semibold leading-tight" />
              <TypeText as="p" text={c.issuer} speed={70} delay={600} className="mt-1 block text-xs text-muted-foreground" />
            </div>
          </div>
          )}
        />
      </Reveal>
    </Section>
  );
}

const serviceIcons = [Code2, Palette, Server, Sparkles, Lightbulb, Cpu];

export function Services() {
  return (
    <Section id="services">
      <SectionHeading eyebrow="Services" title="How I Can Create Value" />
      <Reveal>
        <Marquee
          items={services}
          itemClassName="w-80"
          secondsPerItem={6}
          minItems={6}
          render={(s, i) => {
          const Icon = serviceIcons[i] ?? Briefcase;
          return (
            <div className="glass neon-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <Icon className="size-7 text-neon" />
                {s.learning && <TypeText text="Learning" speed={110} className="rounded-full border border-violet/50 px-2.5 py-0.5 text-xs text-violet" />}
              </div>
              <TypeText as="p" text={s.title} delay={500} className="mt-4 block font-display text-lg font-bold" />
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {s.points.map((p, j) => <li key={p}>• <TypeText text={p} speed={60} delay={900 + j * 300} /></li>)}
              </ul>
            </div>
          );
          }}
        />
      </Reveal>
      <Reveal variant="slide3d" className="glass mt-10 rounded-2xl p-8 text-center md:p-12">
        <Users className="mx-auto size-9 text-neon" />
        <TypeText as="p" text="Technology Is Better When We Build Together" className="mt-4 block font-display text-2xl font-bold md:text-3xl" />
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          I believe great solutions come from collaboration, creativity, technical knowledge, and understanding real-world challenges.
        </p>
      </Reveal>
    </Section>
  );
}
