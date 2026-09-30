"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, CalendarCheck, ShieldCheck, Star } from "lucide-react";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { STATS } from "@/lib/data";

const heroEase = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: heroEase },
  }),
};

const buttonSpring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.7,
} as const;

const metaItems = ["Пожизненная гарантия", "Свободно сегодня", "3D-диагностика"];

const cardStats = [
  { value: "5.0", label: "Google Rating", prefix: "★★★★★" },
  { value: "2500+", label: "Happy Patients" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Digital Dentistry" },
];

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, reducedMotion ? 0 : 81]);
  const copyVariants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: (delay = 0) => ({
          opacity: 1,
          transition: { duration: 0.18, delay, ease: heroEase },
        }),
      }
    : fadeUp;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-[7.5rem] pb-16 md:pt-[9.5rem] md:pb-24 lg:min-h-[calc(100svh-1rem)]"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-px w-[80rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] xl:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-start"
        >
          <motion.span
            variants={copyVariants}
            custom={0}
            className="meta-caps inline-flex items-center gap-2"
          >
            <Star className="size-3.5 fill-accent text-accent" />
            5.0 · 2400 отзывов
          </motion.span>

          <motion.h1
            variants={copyVariants}
            custom={0.08}
            className="mt-6 max-w-4xl text-[clamp(3.4rem,11vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-foreground md:text-[clamp(4.5rem,7vw,5.5rem)]"
          >
            Улыбка, которой доверяют
          </motion.h1>

          <motion.p
            variants={copyVariants}
            custom={0.2}
            className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            Премиальная стоматология полного цикла: имплантация, виниры и эстетика
            мирового уровня. Точная диагностика, комфорт и результат без компромиссов.
          </motion.p>

          <motion.div
            variants={copyVariants}
            custom={0.28}
            className="mt-8 flex w-full max-w-xl flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-4"
          >
            {metaItems.map((item, index) => (
              <span key={item} className="meta-caps flex items-center gap-4">
                {index > 0 ? <span className="hidden h-3 w-px bg-border sm:block" /> : null}
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={copyVariants}
            custom={0.36}
            className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center"
          >
            <motion.a
              href="#appointment"
              data-magnetic="true"
              whileHover={reducedMotion ? undefined : { scale: 1.025, y: -1 }}
              whileTap={reducedMotion ? undefined : { scale: 0.99 }}
              transition={buttonSpring}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <CalendarCheck className="size-4" />
              Записаться на приём
            </motion.a>

            <a
              href="#cases"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-1 text-sm font-semibold text-foreground underline-offset-8 transition-colors hover:text-accent hover:underline"
            >
              Виртуальный тур
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div
            variants={copyVariants}
            custom={0.46}
            className="mt-10 grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-2xl font-semibold tracking-[-0.04em]">
                  {stat.value === 5 ? (
                    <span>5.0</span>
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </p>
                <p className="meta-caps !text-[0.62rem]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.975 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.12, ease: heroEase }}
          className="relative mx-auto w-full max-w-[760px] lg:max-w-none"
        >
          <motion.div
            style={{ y: imageY }}
            whileHover={reducedMotion ? undefined : { scale: 1.006 }}
            transition={buttonSpring}
            className="relative aspect-[1.02/1] overflow-hidden rounded-[1.75rem] border border-border bg-card lg:aspect-[0.96/1]"
          >
            <Image
              src="/images/hero.jpg"
              alt="Современный интерьер стоматологической клиники Lumina"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="scale-[1.035] object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgb(17_17_17/0.36)_100%)]" />

            {cardStats.map((card, index) => (
              <motion.div
                key={card.label}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={reducedMotion ? undefined : { scale: 1.035, y: -3 }}
                transition={{ ...buttonSpring, delay: 0.36 + index * 0.08 }}
                className="absolute bottom-4 w-[calc(50%-1.25rem)] rounded-2xl border border-white/22 bg-white/72 px-4 py-3 backdrop-blur-xl dark:bg-primary/55 sm:w-40"
                style={{
                  left: index % 2 === 0 ? "1rem" : undefined,
                  right: index % 2 === 1 ? "1rem" : undefined,
                  bottom: index < 2 ? "6.75rem" : "1rem",
                }}
              >
                {card.prefix ? <p className="mb-1 text-[0.62rem] tracking-[0.16em] text-accent">{card.prefix}</p> : null}
                <p className="text-2xl font-semibold leading-none tracking-[-0.04em] text-foreground dark:text-primary-foreground">
                  {card.value}
                </p>
                <p className="meta-caps mt-1 !text-[0.58rem] dark:text-primary-foreground/70">
                  {card.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
