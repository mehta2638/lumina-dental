"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition-colors hover:bg-muted",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.5 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: reducedMotion ? 0.18 : 0.25 }}
          >
            {isDark ? (
              <Moon className="size-5 text-accent" />
            ) : (
              <Sun className="size-5 text-accent" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
