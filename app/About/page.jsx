"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHero";
import { assets } from "@/assets/assets";

const pillars = [
  {
    n: "01",
    title: "Craft",
    body:
      "Every garment is cut, stitched, and finished by hand in our Lagos atelier. No shortcuts, no compromises.",
  },
  {
    n: "02",
    title: "Character",
    body:
      "We design for the person who chooses presence over noise. Pieces that carry weight without demanding attention.",
  },
  {
    n: "03",
    title: "Continuity",
    body:
      "Built to outlast the season. We make fewer pieces, more carefully — so they live in your wardrobe for years.",
  },
];

const About = () => {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title={
          <>
            Tailored in Lagos. <em className="italic font-normal text-orange-300">Worn worldwide.</em>
          </>
        }
        description="A studio rooted in West African craft and contemporary tailoring — built around the belief that what you wear should hold its shape, and yours."
        image={assets.hero}
        height="tall"
      />

      <section className="max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-5">
          <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
          The beginning
        </p>
        <h2 className="font-serif text-3xl md:text-5xl tracking-tight text-neutral-900 leading-[1.15] mb-8">
          One studio. One philosophy. <em className="italic text-orange-700">Garments that mean something.</em>
        </h2>
        <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
          <p>
            Unice Stitches began in 2023 in a small Lagos studio, with a single sewing machine and a
            refusal to accept that fashion had to be disposable.
          </p>
          <p>
            Founder Unice grew up surrounded by the rhythm of Yoruba tailoring — a tradition where
            garments are not products but inheritances, where a stitch is a signature. She started
            the label to bring that same considered approach to a contemporary wardrobe: pieces that
            hold their shape, their story, and the wearer's attention.
          </p>
          <p>
            Today the studio has grown, but the philosophy hasn't shifted. Every piece is still cut
            and finished by hand. Every collection is still designed around restraint rather than
            volume. Every garment that leaves our doors is meant to be lived in, not just bought.
          </p>
        </div>
      </section>

      <section className="bg-neutral-950 text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <span aria-hidden="true" className="font-serif text-6xl text-orange-400/80 leading-none">
            &ldquo;
          </span>
          <blockquote className="mt-4 font-serif text-2xl md:text-4xl tracking-tight leading-[1.25] italic">
            We don&apos;t make garments for the season. We make them for the years they&apos;ll be worn after.
          </blockquote>
          <footer className="mt-8 text-[11px] uppercase tracking-[0.3em] text-white/60">
            — Unice, Founder
          </footer>
        </div>
      </section>

      <section
        aria-labelledby="pillars-heading"
        className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28"
      >
        <div className="max-w-2xl mb-14 md:mb-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
            What we hold to
          </p>
          <h2
            id="pillars-heading"
            className="font-serif text-3xl md:text-5xl tracking-tight text-neutral-900 leading-[1.1]"
          >
            Three things we will <em className="italic text-orange-700">not</em> compromise on.
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {pillars.map((p) => (
            <li key={p.n}>
              <span className="font-serif text-5xl text-orange-700/90 leading-none">{p.n}</span>
              <h3 className="mt-4 font-serif text-2xl text-neutral-900">{p.title}</h3>
              <p className="mt-3 text-neutral-600 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28">
        <div className="bg-stone-100 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center p-10 md:p-16">
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <Image
              src={assets.logo}
              alt="Unice Stitches"
              width={140}
              height={140}
              className="opacity-90"
            />
          </div>
          <div className="md:col-span-9">
            <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
              The mission
            </p>
            <p className="font-serif text-xl md:text-2xl text-neutral-900 leading-[1.45]">
              To empower individuals to express their unique style through high-quality, considered
              clothing — fostering a community where every wearer feels valued and inspired to
              embrace their own journey.
            </p>
            <Link
              href="/all-products"
              className="mt-8 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:gap-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 group"
            >
              See the collection
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;