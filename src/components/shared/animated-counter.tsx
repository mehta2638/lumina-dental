"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = format(value) + suffix;
      return;
    }
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest) + suffix;
    });
  }, [spring, suffix, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {reduced ? format(value) + suffix : "0" + suffix}
    </span>
  );
}

function format(n: number): string {
  const rounded = Math.round(n);
  // Keep the elegant "5.0" style for small decimal-labelled stats.
  return new Intl.NumberFormat("ru-RU").format(rounded);
}
