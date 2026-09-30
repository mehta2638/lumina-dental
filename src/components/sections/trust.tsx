"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { AnimatedCounter } from "@/components/shared/animated-counter";
import { stagger, viewportOnce } from "@/lib/animations";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const TRUST_STATS = [
  { value: 24000, suffix: "+", label: "Smiles Transformed" },
  { value: 18, suffix: "+", label: "Years of Excellence" },
  { value: 98, suffix: "%", label: "Patient Satisfaction" },
] as const;

export function Trust() {
  const reducedMotion = useReducedMotion();

  const reveal: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.35, ease: smoothEase } },
      }
    : {
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.05, ease: smoothEase },
        },
      };

  return (
    <section
      id="trust"
      aria-label="Trust and results"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/clinic.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(17_17_17/0.72)_0%,rgb(17_17_17/0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgb(17_17_17/0.35)_100%)]" />
      </div>

      <div className="container-page relative z-10 w-full py-24 md:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center gap-20 md:gap-28"
        >
          <div className="grid w-full max-w-6xl gap-16 md:grid-cols-3 md:gap-10 lg:gap-16">
            {TRUST_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={reveal}
                className="flex flex-col items-center text-center md:items-start md:text-left"
              >
                <p className="text-[clamp(3.5rem,14vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-primary-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="meta-caps mt-5 max-w-[14rem] text-primary-foreground/62">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={reveal}
            className="flex max-w-2xl flex-col items-center gap-4 text-center"
          >
            <p
              className="text-lg tracking-[0.35em] text-accent md:text-xl"
              aria-hidden
            >
              ★★★★★
            </p>
            <p className="text-lg font-medium leading-relaxed tracking-[-0.02em] text-primary-foreground/88 md:text-xl">
              Rated 5.0 by hundreds of patients
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
