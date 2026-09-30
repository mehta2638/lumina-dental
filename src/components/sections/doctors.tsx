"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
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
              className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card tonal-hover"
            >
              <div className="relative aspect-[4/5] overflow-hidden border-b border-border">
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} — ${doctor.specialty}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="image-muted object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-1.5">
                  {doctor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/35 bg-white/58 px-2.5 py-1 text-[0.68rem] font-semibold text-foreground backdrop-blur-xl"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{doctor.name}</h3>
                  <p className="meta-caps mt-1 text-accent">{doctor.specialty}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border py-3 text-xs text-muted-foreground">
                  <RatingStars rating={doctor.rating} />
                  <span className="font-semibold text-foreground">
                    {doctor.rating.toFixed(1)}
                  </span>
                  <span>{doctor.reviews} отзывов</span>
                  <span className="hidden h-3 w-px bg-border sm:block" />
                  <span>Опыт {doctor.experienceYears} лет</span>
                </div>

                <a
                  href="#appointment"
                  data-magnetic="true"
                  className="group/cta mt-auto inline-flex items-center justify-between rounded-full border border-border px-4 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                    Записаться
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
