"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/lib/data";
import { fadeUp, stagger, viewportOnce } from "@/lib/animations";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-muted/40 py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Вопросы"
            title="Отвечаем на частые вопросы"
            description="Не нашли ответ? Позвоните нам — с радостью проконсультируем."
          />
          <Button asChild className="mt-6" variant="dark">
            <a href="#appointment">Задать вопрос врачу</a>
          </Button>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQ.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <AccordionItem value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
