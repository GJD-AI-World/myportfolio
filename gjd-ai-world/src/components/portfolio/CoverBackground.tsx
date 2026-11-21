import { useEffect, useRef } from "react";
import coverUrl from "@/assets/gjd_portfolio_cover.jpg";

/**
 * Full-screen cover that never scrolls. The banner is always shown in full
 * (never cropped side to side) and stretched to fill the screen top to bottom.
 * On very tall screens (phones) where stretching would distort too much, its
 * own top and bottom edges bleed out to cover the remaining space.
 * As the page scrolls, everything blurs and dims so the text over it stays
 * readable.
 */
const BANNER_RATIO = 1920 / 711;
/** How far the banner may stretch to fill the screen before edges bleed instead. */
const MAX_STRETCH = 1.8;

export function CoverBackground() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const box = boxRef.current;
    let frame = 0;

    const update = () => {
      frame = 0;
      const w = box?.clientWidth || window.innerWidth;
      const h = box?.clientHeight || window.innerHeight;
      // Fill the screen edge to edge: the banner keeps its full width and is
      // stretched to fill the height (up to MAX_STRETCH), never cropped.
      let bannerW: number;
      let bannerH: number;
      if (w / h < BANNER_RATIO) {
        bannerW = w;
        bannerH = Math.min(h, (w / BANNER_RATIO) * MAX_STRETCH);
      } else {
        bannerH = h;
        bannerW = Math.min(w, h * BANNER_RATIO * MAX_STRETCH);
      }
      const bandH = Math.max(0, (h - bannerH) / 2);
      root.style.setProperty("--cover-feather", bandH > 1 ? "18px" : "0px");
      root.style.setProperty("--banner-w", `${bannerW.toFixed(1)}px`);
      root.style.setProperty("--banner-h", `${bannerH.toFixed(1)}px`);
      root.style.setProperty("--band-h", `${bandH.toFixed(1)}px`);

      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      root.style.setProperty("--cover-blur", `${(progress * 14).toFixed(2)}px`);
      root.style.setProperty("--cover-dim", (0.05 + progress * 0.6).toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Blurred copy fills any space around the banner */}
      <img src={coverUrl} alt="" className="cover-backdrop absolute inset-0 h-full w-full object-cover" />

      {/* Photo's own top edge bleeds up to the top of the screen */}
      <div
        className="cover-bleed-top absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: "var(--banner-w)",
          height: "calc(var(--band-h) + 44px)",
          bottom: "calc(50% + var(--banner-h) / 2 - 44px)",
        }}
      >
        <img src={coverUrl} alt="" className="h-full w-full object-cover object-top" />
      </div>

      {/* Photo's own bottom edge bleeds down to the bottom of the screen */}
      <div
        className="cover-bleed-bottom absolute left-1/2 -translate-x-1/2 overflow-hidden"
        style={{
          width: "var(--banner-w)",
          height: "calc(var(--band-h) + 44px)",
          top: "calc(50% + var(--banner-h) / 2 - 44px)",
        }}
      >
        <img src={coverUrl} alt="" className="h-full w-full object-cover object-bottom" />
      </div>

      {/* Full banner, never cropped side to side */}
      <img
        src={coverUrl}
        alt=""
        fetchPriority="high"
        className="cover-image absolute left-1/2 top-1/2 h-[var(--banner-h)] w-[var(--banner-w)] -translate-x-1/2 -translate-y-1/2 object-fill"
      />

      <div className="cover-dim absolute inset-0" />
      <div className="cover-fade absolute inset-0" />
    </div>
  );
}
