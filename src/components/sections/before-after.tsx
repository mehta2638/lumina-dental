"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import { CASES } from "@/lib/data";

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
  const [isDragging, setIsDragging] = useState(false);
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
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-[1.75rem] border border-border bg-card"
        onPointerDown={(e) => {
          dragging.current = true;
          setIsDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging.current) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          dragging.current = false;
          setIsDragging(false);
        }}
        onPointerCancel={() => {
          dragging.current = false;
          setIsDragging(false);
        }}
      >
        {/* After (full background) */}
        <Image
          src={after}
          alt={`${title} — после`}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <span className="meta-caps absolute right-4 top-4 rounded-full bg-primary/72 px-3 py-1.5 text-primary-foreground backdrop-blur-xl">
          После
        </span>

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
            transition: isDragging ? "none" : "clip-path 220ms var(--ease-out)",
          }}
        >
          <Image
            src={before}
            alt={`${title} — до`}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <span className="meta-caps absolute left-4 top-4 rounded-full bg-primary/72 px-3 py-1.5 text-primary-foreground backdrop-blur-xl">
            До
          </span>
        </div>

        {/* Divider handle */}
        <div
          className="absolute inset-y-0 z-10 w-px bg-white/85"
          style={{
            left: `${position}%`,
            transition: isDragging ? "none" : "left 220ms var(--ease-out)",
          }}
        >
          <div className="absolute top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-card/85 backdrop-blur-xl">
            <span className="h-5 w-px bg-foreground/45" />
          </div>
        </div>

        {/* Accessible slider control */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Сравнение до и после: ${title}`}
          aria-valuetext={`${Math.round(position)} процентов изображения до`}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="text-center text-sm font-medium text-muted-foreground">
        {title}
      </figcaption>
    </figure>
  );
}
