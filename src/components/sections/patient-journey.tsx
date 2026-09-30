"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const journeyEase = [0.16, 1, 0.3, 1] as const;

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Консультация",
    description:
      "Спокойно обсуждаем запрос, ожидания и будущий результат без давления и спешки.",
    image: "/images/clinic.jpg",
  },
  {
    number: "02",
    title: "3D диагностика",
    description:
      "Сканирование, снимки и цифровой план помогают увидеть маршрут лечения до первого шага.",
    image: "/images/treatment-3.jpg",
  },
  {
    number: "03",
    title: "Лечение",
    description:
      "Работаем поэтапно, бережно и предсказуемо, сохраняя комфорт на каждом визите.",
    image: "/images/treatment-1.jpg",
  },
  {
    number: "04",
    title: "Новая улыбка",
    description:
      "Финальный результат выглядит естественно, ощущается своим и меняет уверенность каждый день.",
    image: "/images/treatment-2.jpg",
  },
] as const;

export function PatientJourney() {
  const reducedMotion = useReducedMotion();

  const stepReveal: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35, ease: journeyEase } },
      }
    : {
        hidden: { opacity: 0, y: 44 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.95, ease: journeyEase },
        },
      };

  const imageReveal: Variants = reducedMotion
    ? stepReveal
    : {
        hidden: { opacity: 0, scale: 1.035 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.15, ease: journeyEase },
        },
      };

  return (
    <section id="journey" className="scroll-mt-24 overflow-hidden py-24 md:py-36">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={stepReveal}
          className="max-w-3xl"
        >
          <p className="meta-caps text-accent">Patient Journey</p>
          <h2 className="mt-5 text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.07em]">
            От первого визита до улыбки, которая ощущается своей.
          </h2>
        </motion.div>

        <div className="mt-20 md:mt-32">
          {JOURNEY_STEPS.map((step, index) => (
            <motion.article
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-120px" }}
              variants={stepReveal}
              className={cn(
                "relative grid gap-10 border-t border-border/70 py-14 md:grid-cols-[0.58fr_1fr] md:items-center md:gap-14 md:py-20 lg:gap-20",
                index === JOURNEY_STEPS.length - 1 && "border-b border-border/70",
              )}
            >
              {index < JOURNEY_STEPS.length - 1 && (
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 1.1, ease: journeyEase }}
                  className="absolute left-8 top-[8.5rem] hidden h-[calc(100%-4rem)] w-px origin-top bg-border/80 md:block"
                />
              )}

              <div className="relative z-10 grid gap-8 sm:grid-cols-[8rem_1fr] md:grid-cols-1 lg:grid-cols-[9rem_1fr]">
                <p className="text-[clamp(4.5rem,12vw,8.5rem)] font-semibold leading-none tracking-[-0.08em] text-foreground/12">
                  {step.number}
                </p>
                <div className="max-w-md pt-1 md:pt-0 lg:pt-5">
                  <h3 className="text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {step.description}
                  </p>
                </div>
              </div>

              <motion.div
                variants={imageReveal}
                className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted md:aspect-[16/9]"
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover image-muted"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-transparent" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
