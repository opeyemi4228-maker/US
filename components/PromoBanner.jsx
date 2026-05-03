"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const promotions = [
  { text: "Complimentary shipping & returns on every order", href: "/shipping" },
  { text: "Sign up for emails — get 10% off your first order", href: "/account" },
  { text: "Now showing: the new Women's collection", href: "/ShopWomen" },
  { text: "Free gift with every purchase over ₦200,000", href: "/all-products" },
];

const ROTATION_MS = 5000;

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, ROTATION_MS);
    return () => clearInterval(timer);
  }, [paused, reducedMotion]);

  const goTo = (index) => setCurrent(index);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 h-10 bg-neutral-950 text-white border-b border-white/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-label="Promotional announcements"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-4">
        {/* Rotation track */}
        <div
          className="relative flex-1 h-5 overflow-hidden text-center"
          aria-live="polite"
          aria-atomic="true"
        >
          {promotions.map((promo, i) => (
            <Link
              key={i}
              href={promo.href}
              tabIndex={current === i ? 0 : -1}
              aria-hidden={current !== i}
              className={`absolute inset-0 flex items-center justify-center text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/90 hover:text-white focus:outline-none focus-visible:underline underline-offset-4 transition-all duration-700 ease-out ${
                current === i
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <span className="truncate max-w-full px-2">{promo.text}</span>
            </Link>
          ))}
        </div>

        {/* Dot indicators — desktop only */}
        <div className="hidden sm:flex items-center gap-1.5" role="tablist" aria-label="Promotion slides">
          {promotions.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={current === i}
              aria-label={`Show promotion ${i + 1} of ${promotions.length}`}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                current === i ? "w-6 bg-white" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;