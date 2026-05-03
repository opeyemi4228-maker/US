"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

/* ── Slide data ────────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    image: assets.hero,
    mobileImage: assets.header_headphone_image,
    eyebrow: "Spring · Summer 2026",
    headline: "Treasure is\non the horizon",
    body: "Some garments are made to be worn. Ours are made to be remembered — by the weight of the fabric and the way they hold your shape long after you've left the room.",
    cta: { label: "Shop the Collection", href: "/all-products" },
  },
  {
    id: 2,
    image: assets.hero00,
    mobileImage: assets.blue1,
    eyebrow: "Womenswear",
    headline: "Refined\nRadiance",
    body: "Soft structure meets sharp tailoring. The new women's collection arrives dressed in restraint and intention.",
    cta: { label: "Shop Women", href: "/ShopWomen" },
  },
  {
    id: 3,
    image: assets.hero3,
    mobileImage: assets.girl_with_headphone_image,
    eyebrow: "The Heritage Edit",
    headline: "Modern\nỌmọlúàbí",
    body: "Tradition, retold. A capsule built around craft, character, and quiet command — for those who choose presence over noise.",
    cta: { label: "Discover the Edit", href: "/collections/heritage" },
  },
];

const ROTATION_MS = 6500;

const HeaderSlider = React.memo(() => {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback((i) => {
    const next = ((i % slides.length) + slides.length) % slides.length;
    setPrev(index);
    setIndex(next);
    setAnimating(true);
    setTimeout(() => { setAnimating(false); setPrev(null); }, 900);
  }, [index]);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prv  = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(next, ROTATION_MS);
    return () => clearInterval(t);
  }, [paused, reducedMotion, next]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) dx > 0 ? prv() : next();
    touchX.current = null;
  };

  const current = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-neutral-950"
      style={{ marginTop: 0 }}
    >
      {/* ── Slide images ─────────────────────────────────── */}
      {slides.map((slide, i) => {
        const isActive = i === index;
        const isPrev   = i === prev;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              zIndex: isActive ? 2 : isPrev ? 1 : 0,
              opacity: isActive ? 1 : 0,
              transition: animating && isActive ? "opacity 0.9s ease" : "none",
            }}
          >
            {/* Desktop image */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
                style={{
                  transform: isActive && !reducedMotion ? "scale(1.04)" : "scale(1)",
                  transition: "transform 8s ease-out",
                }}
              />
            </div>
            {/* Mobile image */}
            <div className="sm:hidden absolute inset-0">
              <Image
                src={slide.mobileImage || slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        );
      })}

      {/* ── Scrim — bottom-heavy, matches reference image ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.08) 100%)",
        }}
      />
      {/* Subtle left vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 hidden md:block"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 55%)",
        }}
      />

      {/* ── Content — bottom-left (desktop), bottom-centre (mobile) ── */}
      <div className="absolute inset-0 z-20 flex items-end">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 pb-16 md:pb-20">
          <div
            key={index}
            className="max-w-2xl"
            style={{
              animation: !reducedMotion ? "slideUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) both" : "none",
            }}
          >
            {/* Eyebrow */}
            <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.35em] uppercase text-white/65 mb-5">
              <span aria-hidden className="inline-block w-8 h-px bg-white/65" />
              {current.eyebrow}
            </p>

            {/* Headline — italic serif like reference */}
            <h1
              className="font-serif italic font-normal text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", whiteSpace: "pre-line" }}
            >
              {current.headline}
            </h1>

            {/* Body — matches reference paragraph style */}
            <p className="text-[14px] md:text-[15px] text-white/75 leading-[1.75] max-w-md mb-8">
              {current.body}
            </p>

            {/* CTA — underline link style matching reference */}
            <Link
              href={current.cta.href}
              className="inline-flex items-center gap-0 text-[11px] font-bold tracking-[0.28em] uppercase text-white border-b border-white pb-0.5 hover:text-orange-300 hover:border-orange-300 transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {current.cta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: counter + dots + arrows ────────────── */}
      <div className="absolute bottom-6 left-0 right-0 z-30 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">

        {/* Slide counter */}
        <span
          className="font-serif text-white/70 text-sm tracking-widest"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-white/35 mx-2">/</span>
          <span className="text-white/40">{String(slides.length).padStart(2, "0")}</span>
        </span>

        {/* Dot indicators */}
        <div role="tablist" aria-label="Slides" className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={index === i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`block h-px rounded-full transition-all duration-500 focus:outline-none ${
                index === i ? "w-10 bg-white h-[2px]" : "w-5 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prv}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden="true"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="block w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
});

HeaderSlider.displayName = "HeaderSlider";
export default HeaderSlider;