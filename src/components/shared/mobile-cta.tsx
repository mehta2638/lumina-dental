"use client";

import { useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { Phone, CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

/** Sticky bottom action bar shown after the hero, mobile only. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 640);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.18 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        >
          <div className="glass flex items-center gap-2 border-t border-border p-3">
            <Button asChild variant="outline" size="md" className="flex-1">
              <a href={SITE.phoneHref} aria-label="Позвонить">
                <Phone className="size-4" />
                Позвонить
              </a>
            </Button>
            <Button asChild size="md" className="flex-1">
              <a href="#appointment">
                <CalendarCheck className="size-4" />
                Записаться
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
