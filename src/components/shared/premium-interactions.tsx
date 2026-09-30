"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]';
const magneticSelector = '[data-magnetic="true"]';

export function PremiumInteractions() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let frame = 0;
    let activeMagnetic: HTMLElement | null = null;

    const tick = () => {
      cursorX += (pointerX - cursorX) * 0.28;
      cursorY += (pointerY - cursorY) * 0.28;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    };

    const resetMagnetic = () => {
      if (!activeMagnetic) return;
      activeMagnetic.style.transform = "";
      activeMagnetic = null;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.style.opacity = "1";

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = target?.closest(interactiveSelector);
      cursor.dataset.active = isInteractive ? "true" : "false";

      const magnetic = target?.closest(magneticSelector) as HTMLElement | null;
      if (!magnetic) {
        resetMagnetic();
        return;
      }

      const rect = magnetic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

      if (distance > 40) {
        resetMagnetic();
        return;
      }

      if (activeMagnetic && activeMagnetic !== magnetic) resetMagnetic();
      activeMagnetic = magnetic;
      const x = (event.clientX - centerX) * 0.18;
      const y = (event.clientY - centerY) * 0.18;
      magnetic.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onPointerLeave = () => {
      cursor.style.opacity = "0";
      cursor.dataset.active = "false";
      resetMagnetic();
    };

    frame = window.requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      resetMagnetic();
    };
  }, []);

  return <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />;
}
