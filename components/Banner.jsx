"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { assets } from "@/assets/assets";

const Banner = () => {
  return (
    <section
      aria-labelledby="banner-heading"
      className="relative isolate my-20 md:my-28 overflow-hidden bg-gradient-to-br from-stone-100 via-orange-50/40 to-stone-100"
    >
      {/* Decorative serif glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[16rem] md:text-[24rem] leading-none text-orange-700/[0.05]"
      >
        ✦
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-10 px-6 md:px-10 py-14 md:py-20">
        {/* Left image */}
        <div className="md:col-span-3 flex justify-center md:justify-start">
          <Image
            src={assets.md_controller_image}
            alt=""
            className="max-w-[200px] md:max-w-[240px] h-auto"
          />
        </div>

        {/* Center content */}
        <div className="md:col-span-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
            <span
              aria-hidden="true"
              className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5"
            />
            The new arrivals
          </p>
          <h2
            id="banner-heading"
            className="font-serif text-3xl md:text-5xl tracking-tight text-neutral-900 leading-[1.1]"
          >
            Upgrade your fashion <em className="italic text-orange-700">experience</em>
          </h2>
          <p className="mt-5 max-w-md mx-auto text-neutral-600 leading-relaxed">
            From striking silhouettes to flawless tailoring — everything you need to stand out, in
            one considered edit.
          </p>
          <Link
            href="/all-products"
            className="mt-8 inline-flex items-center gap-3 bg-neutral-950 text-white px-8 py-3.5 text-sm uppercase tracking-[0.2em] hover:bg-orange-700 transition-colors duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            Shop the edit
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Right image */}
        <div className="md:col-span-3 flex justify-center md:justify-end">
          <Image
            src={assets.jbl_soundbox_image}
            alt=""
            className="max-w-[260px] md:max-w-[320px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;