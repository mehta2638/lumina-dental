"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
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

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      motionValue.set(value);
      return;
    }

    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, value, motionValue, reduced]);

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = format(value) + suffix;
      return;
    }
    return motionValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = format(latest) + suffix;
    });
  }, [motionValue, suffix, reduced, value]);

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
