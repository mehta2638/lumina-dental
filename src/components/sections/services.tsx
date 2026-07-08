"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.article
              key={service.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lifted)]",
                service.featured && "ring-1 ring-accent/20",
              )}
            >
              {service.featured && (
                <span className="absolute right-6 top-6 z-10 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground shadow-[var(--shadow-soft)]">
                  Хит
                </span>
              )}

              {service.image && (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} в клинике Lumina`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent" />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-5 p-7">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-accent/12 to-sky/12 text-accent transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="size-7" />
                </span>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Стоимость</span>
                    <span className="text-lg font-bold">
                      от {formatPrice(service.priceFrom)}
                    </span>
                  </div>
                  <Button asChild size="icon" variant="outline" aria-label={`Записаться на ${service.title}`}>
                    <a href="#appointment">
                      <ArrowUpRight className="size-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
