import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends Element>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/**
 * Scroll-in wrapper. variant "up" fades up; "slide3d" slides in slowly from the
 * right with a 3D turn (used for cards).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "slide3d";
}) {
  const [ref, visible] = useInView<HTMLDivElement>();
  const [settled, setSettled] = useState(false);

  // once the entrance finishes, drop the delay so hover effects react instantly
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setSettled(true), delay + 1500);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div
      ref={ref}
      data-visible={visible}
      data-settled={settled}
      className={cn(variant === "slide3d" ? "reveal-3d" : "reveal", className)}
      style={settled ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/**
 * Text that types itself out letter by letter, holds, erases and types again
 * (loop) while on screen. Drives the DOM directly so hundreds of instances stay
 * cheap; it pauses whenever the text is off screen.
 */
export function TypeText({
  text,
  as = "span",
  className,
  delay = 0,
  speed = 95,
  eraseSpeed = 45,
  hold = 2400,
  pause = 700,
  loop = true,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  eraseSpeed?: number;
  hold?: number;
  pause?: number;
  loop?: boolean;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const chars = Array.from(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    const n = spans.length;
    if (n === 0) return;

    const setOn = (i: number, on: boolean) => {
      const s = spans[i];
      if (s) s.dataset["on"] = on ? "true" : "false";
    };
    let caretAt: HTMLElement | null = null;
    const moveCaret = (count: number) => {
      caretAt?.removeAttribute("data-caret");
      caretAt = count === 0 ? spans[0] ?? null : spans[count - 1] ?? null;
      caretAt?.setAttribute("data-caret", count === 0 ? "start" : "end");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((_, i) => setOn(i, true));
      return;
    }

    spans.forEach((_, i) => setOn(i, false));
    let count = 0;
    let dir: 1 | -1 = 1;
    let started = false;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = (ms: number) => {
      clearTimeout(timer);
      timer = setTimeout(step, ms);
    };

    function step() {
      if (!visible) return;
      if (dir === 1) {
        if (count < n) {
          setOn(count, true);
          count++;
          moveCaret(count);
          schedule(chars[count - 1] === " " ? speed * 1.6 : speed);
        } else if (loop) {
          dir = -1;
          schedule(hold);
        } else {
          timer = setTimeout(() => caretAt?.removeAttribute("data-caret"), 1800);
        }
      } else if (count > 0) {
        count--;
        setOn(count, false);
        moveCaret(count);
        schedule(eraseSpeed);
      } else {
        dir = 1;
        schedule(pause);
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        if (!visible) {
          clearTimeout(timer);
          return;
        }
        if (!started) {
          started = true;
          moveCaret(0);
          schedule(delay);
        } else if (count < n || loop) {
          schedule(speed);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, speed, eraseSpeed, hold, pause, loop]);

  return (
    <Tag ref={ref} aria-label={text} className={cn("type-text", className)}>
      {chars.map((c, i) => (
        <span key={`${text}-${i}`} aria-hidden data-char className="type-char">
          {c}
        </span>
      ))}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 max-w-3xl">
      <TypeText as="p" text={eyebrow} speed={110} className="mb-3 block font-display text-sm uppercase tracking-[0.3em] text-neon" />
      <TypeText as="h2" text={title} className="text-3xl font-bold sm:text-4xl md:text-5xl" />
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>}
    </Reveal>
  );
}
