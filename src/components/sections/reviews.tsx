"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { RatingStars } from "@/components/shared/rating-stars";
import { REVIEWS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const reducedMotion = useReducedMotion();

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + REVIEWS.length) % REVIEWS.length);
  };

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="scroll-mt-24 bg-muted/40 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Отзывы"
          title={
            <>
              Средняя оценка <span className="text-gradient">5.0</span> из 5
            </>
          }
          description="Более 2 400 отзывов от реальных пациентов. Мы гордимся каждым."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 sm:p-12">
            <Quote className="absolute right-8 top-8 size-24 stroke-[1.25] text-accent/12" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: reducedMotion ? 0 : direction >= 0 ? 32 : -32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reducedMotion ? 0 : direction >= 0 ? -32 : 32 }}
                transition={{ duration: reducedMotion ? 0.18 : 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col gap-8"
                aria-live="polite"
              >
                <RatingStars rating={review.rating} size={18} />
                <p className="max-w-3xl text-2xl font-semibold leading-snug tracking-[-0.035em] sm:text-3xl">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="size-10 rounded-full border border-border object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{review.author}</p>
                    <p className="meta-caps mt-1 !text-[0.6rem]">
                      {review.service} · {review.date}
                    </p>
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              aria-label="Предыдущий отзыв"
              onClick={() => paginate(-1)}
              data-magnetic="true"
              className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Отзыв ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-accent" : "w-2 bg-border",
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Следующий отзыв"
              onClick={() => paginate(1)}
              data-magnetic="true"
              className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
