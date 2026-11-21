import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/content/portfolio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TypeText } from "./Reveal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "glass-strong" : "bg-transparent")}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="font-display text-lg font-bold tracking-wide">
          <TypeText text="GJD" speed={200} className="text-gradient" />
          <TypeText text="_AI_World" speed={120} delay={600} className="text-foreground" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active === l.id && "text-neon",
                )}
              >
                <TypeText text={l.label} speed={110} delay={i * 150} />
                {active === l.id && <span className="absolute inset-x-3 -bottom-0.5 h-px bg-neon" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild variant="neon" size="sm">
            <a href="#contact"><TypeText text="Let's Connect" speed={100} /></a>
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 px-4 pb-6 lg:hidden">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={cn("block rounded-lg px-3 py-3 text-muted-foreground hover:bg-secondary", active === l.id && "text-neon")}
              >
                <TypeText text={l.label} speed={100} />
              </a>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild variant="neon" className="w-full" onClick={() => setOpen(false)}>
              <a href="#contact">Let's Connect</a>
            </Button>
          </li>
        </ul>
      )}
      <span className="sr-only">{profile.brand}</span>
    </header>
  );
}
