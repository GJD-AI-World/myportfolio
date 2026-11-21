import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Nonstop right-to-left "moving belt" of cards with a 3D tilt.
 * Items are repeated so the belt is always full, then the whole set is doubled
 * so translating by -50% loops seamlessly. Hover pauses the belt.
 */
export function Marquee<T>({
  items,
  render,
  itemClassName,
  secondsPerItem = 7,
  minItems = 8,
}: {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  itemClassName?: string;
  secondsPerItem?: number;
  minItems?: number;
}) {
  if (items.length === 0) return null;
  const repeat = Math.max(1, Math.ceil(minItems / items.length));
  const base = Array.from({ length: repeat }, () => items).flat();
  const loop = [...base, ...base];

  return (
    <div className="marquee-3d">
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${base.length * secondsPerItem}s` } as React.CSSProperties}
      >
        {loop.map((item, i) => (
          <div
            key={i}
            inert={i >= items.length}
            className={cn("marquee-item", itemClassName)}
          >
            {render(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
