import { FileText, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, navLinks, socials } from "@/content/portfolio";
import { Marquee } from "./Marquee";
import { Reveal, SectionHeading, TypeText } from "./Reveal";

export function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:+91${contact.phone}` },
    { icon: MessageCircle, label: "WhatsApp", value: contact.whatsappNumber, href: `https://wa.me/91${contact.whatsappNumber}` },
  ];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Build Something Amazing Together"
        intro="Have an idea, project, business problem, or opportunity? Let's connect and explore how technology can turn your ideas into reality."
      />
      <Reveal>
        <Marquee
          items={items}
          itemClassName="w-80"
          secondsPerItem={5}
          minItems={6}
          render={({ icon: Icon, label, value, href }) => (
            <a href={href} target={label === "WhatsApp" ? "_blank" : undefined} rel="noreferrer" className="glass neon-card flex items-center gap-4 rounded-xl p-5">
              <Icon className="size-6 shrink-0 text-neon" />
              <div className="min-w-0">
                <TypeText as="p" text={label} speed={100} className="block text-xs uppercase tracking-widest text-muted-foreground" />
                <TypeText as="p" text={value} speed={75} delay={500} className="block truncate font-medium" />
              </div>
            </a>
          )}
        />
      </Reveal>
      <Reveal className="mt-6 flex flex-wrap gap-3">
        {socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="glass neon-card rounded-full px-5 py-2.5 text-sm hover:text-neon">
            <TypeText text={s.name} speed={100} />
          </a>
        ))}
      </Reveal>
      <Reveal variant="slide3d" className="glass mt-10 flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div id="resume">
          <TypeText as="p" text="Explore My Professional Profile" className="block font-display text-xl font-bold" />
          <TypeText as="p" text="My resume PDF will be available to download here soon." speed={45} className="block text-sm text-muted-foreground" />
        </div>
        <span className="flex items-center gap-2 rounded-xl border border-dashed px-5 py-3 text-sm text-muted-foreground">
          <FileText className="size-4" /> <TypeText text="Resume coming soon" speed={80} />
        </span>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="glass-strong relative mt-10">
      <span className="line-flow absolute inset-x-0 top-0 h-px" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold"><TypeText text="GJD" speed={200} className="text-gradient" /><TypeText text="_AI_World" speed={120} delay={600} /></p>
          <p className="mt-2 text-sm text-muted-foreground">Turning Ideas into Digital Reality.</p>
          <a href={`mailto:${contact.email}`} className="mt-3 block text-sm text-neon hover:underline">{contact.email}</a>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {navLinks.map((l) => (
            <li key={l.id}><a href={`#${l.id}`} className="text-muted-foreground hover:text-neon">{l.label}</a></li>
          ))}
        </ul>
        <ul className="flex flex-wrap content-start gap-2 text-sm">
          {socials.map((s) => (
            <li key={s.name}><a href={s.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-neon">{s.name}</a></li>
          ))}
        </ul>
      </div>
      <p className="border-t px-4 py-5 text-center text-xs text-muted-foreground">
        © 2026 GJD_AI_World | Gaddangi Jaman Dora. All Rights Reserved.
      </p>
    </footer>
  );
}
