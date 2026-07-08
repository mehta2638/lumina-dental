"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { RatingStars } from "@/components/shared/rating-stars";
import { REVIEWS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-12">
            <Quote className="absolute right-8 top-8 size-16 text-accent/10" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                <RatingStars rating={review.rating} size={20} />
                <p className="text-lg leading-relaxed sm:text-xl">
                  {review.text}
                </p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.avatar}
                    alt={review.author}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-sm text-muted-foreground">
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
              className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Отзыв ${i + 1}`}
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
              className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
