"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { SITE, ROUTE_MAP_URL } from "@/lib/constants";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export function Contacts() {
  const { lat, lng } = SITE.geo;
  const d = 0.006;
  const bbox = `${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <section id="contacts" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Контакты"
          title="Как нас найти"
          description="Мы в самом центре города, в двух минутах от метро. Ждём вас в удобное время."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4"
          >
            {[
              { icon: MapPin, label: "Адрес", value: SITE.address },
              { icon: Phone, label: "Телефон", value: SITE.phone, href: SITE.phoneHref },
              { icon: Mail, label: "Email", value: SITE.email, href: SITE.emailHref },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                  <item.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-semibold transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent">
                <Clock className="size-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Часы работы</p>
                {SITE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between font-semibold">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button asChild size="lg" className="w-full">
                <a href={ROUTE_MAP_URL} target="_blank" rel="noreferrer">
                  <Navigation className="size-5" />
                  Построить маршрут
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[360px] overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]"
          >
            <iframe
              title={`Карта: ${SITE.address}`}
              src={mapSrc}
              loading="lazy"
              className="size-full min-h-[360px] grayscale-[0.2]"
              style={{ border: 0 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
