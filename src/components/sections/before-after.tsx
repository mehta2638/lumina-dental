"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { CASES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function BeforeAfter() {
  return (
    <section id="cases" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Результаты"
          title="До и после"
          description="Реальные работы наших врачей. Потяните ползунок, чтобы увидеть разницу."
        />
        <div className="mx-auto mt-14 max-w-4xl">
          {CASES.map((item) => (
            <Comparison
              key={item.id}
              before={item.before}
              after={item.after}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ComparisonProps {
  before: string;
  after: string;
  title: string;
}

function Comparison({ before, after, title }: ComparisonProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lifted)]"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* After (full background) */}
        <Image
          src={after}
          alt={`${title} — после`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <span className="absolute right-4 top-4 rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
          После
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${title} — до`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            До
          </span>
        </div>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_12px_rgb(0_0_0/0.3)]"
          style={{ left: `${position}%` }}
        >
          <div
            className={cn(
              "absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-lg",
            )}
          >
            <MoveHorizontal className="size-5" />
          </div>
        </div>

        {/* Accessible slider control */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label="Сравнение до и после"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="text-center text-sm font-medium text-muted-foreground">
        {title}
      </figcaption>
    </figure>
  );
}
