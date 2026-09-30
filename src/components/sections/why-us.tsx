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
          {ADVANTAGES.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className="group border-t border-border py-8 lg:min-h-64"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="meta-caps text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <item.icon className="size-6 stroke-[1.5] text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
