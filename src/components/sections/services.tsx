"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { SERVICES } from "@/lib/data";
import { stagger, viewportOnce } from "@/lib/animations";
import { cn, formatPrice } from "@/lib/utils";

const spring = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.8,
} as const;

const serviceLayout = [
  "md:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "md:col-span-2 lg:col-span-12",
  "lg:col-span-6",
  "lg:col-span-6",
] as const;

const mediaRatio = [
  "aspect-[16/11] lg:aspect-[16/12]",
  "aspect-[16/10]",
  "aspect-[16/10]",
  "aspect-[21/9]",
  "aspect-[16/10]",
  "aspect-[16/10]",
] as const;

const details: Record<
  string,
  {
    badge?: string;
    short: string;
    benefits: Array<{ icon: LucideIcon; label: string }>;
  }
> = {
  implants: {
    badge: "Premium",
    short:
      "Цифровое планирование имплантации с системами Straumann и Nobel. Точная хирургия и комфортное восстановление.",
    benefits: [
      { icon: Clock, label: "60–90 мин" },
      { icon: ShieldCheck, label: "Гарантия" },
      { icon: Cpu, label: "3D-навигация" },
      { icon: HeartHandshake, label: "Комфорт" },
    ],
  },
  veneers: {
    badge: "Популярно",
    short:
      "Керамические виниры E.max по Digital Smile Design: естественная форма, оттенок и прогнозируемая эстетика.",
    benefits: [
      { icon: Clock, label: "2–3 визита" },
      { icon: ShieldCheck, label: "До 5 лет" },
      { icon: Cpu, label: "Smile Design" },
      { icon: Sparkles, label: "Эстетика" },
    ],
  },
  caries: {
    short:
      "Лечение под микроскопом с сохранением здоровых тканей и незаметными реставрациями.",
    benefits: [
      { icon: Clock, label: "45–75 мин" },
      { icon: ShieldCheck, label: "Контроль" },
      { icon: Cpu, label: "Микроскоп" },
      { icon: HeartHandshake, label: "Без боли" },
    ],
  },
  hygiene: {
    badge: "Новинка",
    short:
      "Комплексная гигиена Air Flow и ультразвук для свежести, здоровья дёсен и естественной белизны.",
    benefits: [
      { icon: Clock, label: "60 мин" },
      { icon: ShieldCheck, label: "Профилактика" },
      { icon: Cpu, label: "Air Flow" },
      { icon: Sparkles, label: "Белизна" },
    ],
  },
  ortho: {
    short:
      "Элайнеры и брекет-системы с 3D-прогнозом результата и контролем каждого этапа.",
    benefits: [
      { icon: Clock, label: "От 6 мес." },
      { icon: ShieldCheck, label: "План этапов" },
      { icon: Cpu, label: "3D-контроль" },
      { icon: HeartHandshake, label: "Адаптация" },
    ],
  },
  kids: {
    short:
      "Детский приём без страха: игровой подход, бережная коммуникация и профилактика.",
    benefits: [
      { icon: Clock, label: "30–45 мин" },
      { icon: ShieldCheck, label: "Без стресса" },
      { icon: Cpu, label: "Щадяще" },
      { icon: HeartHandshake, label: "Игра" },
    ],
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  hover: {
    y: -6,
    transition: spring,
  },
};

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Услуги"
          title={<>Полный спектр стоматологии<br className="hidden sm:block" /> под одной крышей</>}
          description="От профилактики до сложной имплантации — каждое направление ведут врачи с профильной специализацией и опытом от 10 лет."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6"
        >
          {SERVICES.map((service, index) => {
            const serviceDetails = details[service.id];

            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                className={cn(
                  "group flex min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card tonal-hover",
                  serviceLayout[index],
                )}
              >
                <div className={cn("relative overflow-hidden border-b border-border", mediaRatio[index])}>
                  {service.image ? (
                    <motion.div
                      variants={{ hover: { scale: 1.03, transition: spring } }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={service.image}
                        alt={`${service.title} в клинике Lumina`}
                        fill
                        sizes={
                          index === 0 || index === 3
                            ? "(max-width: 1024px) 100vw, 70vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
                        }
                        className="image-muted object-cover"
                      />
                    </motion.div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/88 to-transparent" />

                  {serviceDetails?.badge ? (
                    <span className="meta-caps absolute left-6 top-6 text-accent">
                      {serviceDetails.badge}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7 lg:p-8">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-[-0.035em] md:text-3xl">
                      {service.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                      {serviceDetails?.short ?? service.description}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {(serviceDetails?.benefits ?? []).map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/45 px-3 py-2 text-xs font-medium text-foreground/80"
                      >
                        <Icon className="size-4 text-accent" />
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-5">
                    <div>
                      <p className="meta-caps">От</p>
                      <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                        {formatPrice(service.priceFrom)}
                      </p>
                    </div>
                    <a
                      href="#appointment"
                      data-magnetic="true"
                      className="group/cta inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold underline-offset-8 transition-colors hover:text-accent hover:underline"
                      aria-label={`Подробнее: ${service.title}`}
                    >
                      Подробнее
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
