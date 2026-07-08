"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Star, ShieldCheck, CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { blurIn, stagger, spring } from "@/lib/animations";
import { STATS } from "@/lib/data";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Ambient aurora background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="aurora left-[-10%] top-[-5%] size-[420px] bg-accent/40" />
        <div className="aurora right-[-8%] top-[10%] size-[380px] bg-sky/30" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(15 23 42 / 0.05) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={blurIn}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-[var(--shadow-soft)]"
          >
            <span className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-5 rounded-full border-2 border-card bg-gradient-to-br from-accent to-sky"
                />
              ))}
            </span>
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <strong>5.0</strong> · 2 400+ отзывов
            </span>
          </motion.span>

          <motion.h1
            variants={blurIn}
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          >
            Улыбка, которой
            <br />
            <span className="text-gradient">доверяют</span> с первого
            взгляда
          </motion.h1>

          <motion.p
            variants={blurIn}
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Премиальная стоматология полного цикла: имплантация, виниры и эстетика
            мирового уровня. Точная диагностика, комфорт и результат без
            компромиссов.
          </motion.p>

          <motion.div variants={blurIn} className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#appointment">
                <CalendarCheck className="size-5" />
                Записаться на приём
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={SITE.phoneHref}>
                <Phone className="size-5" />
                Позвонить
              </a>
            </Button>
          </motion.div>

          <motion.dl
            variants={blurIn}
            className="mt-4 grid w-full max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-xs text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-bold tracking-tight">
                  {stat.value === 5 ? (
                    <span>5.0</span>
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-lifted)]">
            <Image
              src="/images/hero.jpg"
              alt="Современный интерьер стоматологической клиники Lumina"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>

          {/* Floating card — guarantee */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-4 top-10 flex items-center gap-3 rounded-2xl p-4 shadow-[var(--shadow-lifted)] sm:-left-8"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent/12 text-accent">
              <ShieldCheck className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold">Пожизненная гарантия</p>
              <p className="text-xs text-muted-foreground">на импланты</p>
            </div>
          </motion.div>

          {/* Floating card — next slot */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -right-4 bottom-12 flex items-center gap-3 rounded-2xl p-4 shadow-[var(--shadow-lifted)] sm:-right-8"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-success/12 text-success">
              <CalendarCheck className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold">Свободно сегодня</p>
              <p className="text-xs text-muted-foreground">запись за 2 минуты</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
