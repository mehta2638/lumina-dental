"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={reducedMotion ? { opacity: 0 } : { y: -100 }}
      animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
      transition={{ duration: reducedMotion ? 0.18 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="container-page py-3">
        <nav
          className={cn(
            "flex items-center justify-between rounded-3xl border px-4 py-2.5 transition-all duration-300 sm:px-6",
            scrolled ? "glass border-border" : "border-transparent bg-transparent",
          )}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label={SITE.name}>
                <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <LuminaMark />
            </span>
            <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="meta-caps rounded-full px-4 py-2 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:text-accent xl:flex"
            >
              <Phone className="size-4 text-accent" />
              {SITE.phone}
            </a>
            <ThemeToggle className="hidden sm:flex" />
            <Button asChild size="md" className="hidden sm:inline-flex" data-magnetic="true">
              <a href="#appointment">Записаться</a>
            </Button>
            <button
              type="button"
              aria-label="Открыть меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-border bg-card/60 backdrop-blur lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 lg:hidden"
          >
            <div className="container-page">
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0.18 : 0.25 }}
                className="glass flex flex-col gap-1 rounded-3xl p-4"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex items-center gap-2">
                  <ThemeToggle />
                  <Button asChild className="flex-1" size="lg">
                    <a href="#appointment" onClick={() => setOpen(false)}>
                      Записаться
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LuminaMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2c2.5 0 4.5 1.6 4.5 4.2 0 2-1 3.4-1.4 6.4-.3 2.3-.6 5.2-1.4 7.2-.3.8-.9 1.2-1.7 1.2s-1.1-.7-1.3-1.6c-.3-1.4-.4-3-.7-3-.3 0-.4 1.6-.7 3-.2.9-.5 1.6-1.3 1.6-.8 0-1.4-.4-1.7-1.2-.8-2-1.1-4.9-1.4-7.2C8.5 9.6 7.5 8.2 7.5 6.2 7.5 3.6 9.5 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
