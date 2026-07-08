"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/shared/rating-stars";
import { DOCTORS } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export function Doctors() {
  return (
    <section id="doctors" className="scroll-mt-24 bg-muted/40 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Команда"
          title="Врачи, которым доверяют улыбку"
          description="Каждый специалист — эксперт в своём направлении с международными сертификатами и сотнями благодарных пациентов."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DOCTORS.map((doctor) => (
            <motion.article
              key={doctor.id}
              variants={fadeUp}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lifted)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} — ${doctor.specialty}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
                  {doctor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass rounded-full px-2.5 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-lg font-bold">{doctor.name}</h3>
                  <p className="text-sm text-accent">{doctor.specialty}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RatingStars rating={doctor.rating} />
                  <span className="font-semibold text-foreground">
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span>· {doctor.reviews} отзывов</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  Опыт работы{" "}
                  <span className="font-semibold text-foreground">
                    {doctor.experienceYears} лет
                  </span>
                </p>

                <Button asChild variant="outline" size="sm" className="mt-auto w-full">
                  <a href="#appointment">
                    <CalendarCheck className="size-4" />
                    Записаться
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
