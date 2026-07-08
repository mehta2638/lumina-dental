"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import { ADVANTAGES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export function WhyUs() {
  return (
    <section id="why-us" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Почему мы"
          title="Причины выбрать Lumina"
          description="Мы соединили технологии, экспертизу и сервис премиального уровня, чтобы лечение было точным, комфортным и предсказуемым."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ADVANTAGES.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)]"
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <item.icon className="size-7" />
              </span>
              <h3 className="relative text-lg font-bold">{item.title}</h3>
              <p className="relative text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
