import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    id: 1,
    href: "/all-products",
    image: assets.girl_with_headphone_image,
    eyebrow: "Heritage",
    title: "Modern Ọmọlúàbí",
    description:
      "Tailoring rooted in tradition, cut for the present. Command respect with every thread.",
  },
  {
    id: 2,
    href: "/all-products",
    image: assets.girl_with_earphone_image,
    eyebrow: "Womenswear",
    title: "Refined Radiance",
    description:
      "Considered silhouettes, soft structure, deliberate detail — sophistication for the modern woman.",
  },
  {
    id: 3,
    href: "/all-products",
    image: assets.boy_with_laptop_image,
    eyebrow: "Daywear",
    title: "Styled to Explore",
    description:
      "Outfitted for every adventure. Built from the city out, ready to take on the world.",
  },
];

const FeaturedProduct = () => {
  return (
    <section
      aria-labelledby="featured-collections-heading"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28"
    >
      {/* Section header */}
      <header className="mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 font-medium mb-4">
              <span aria-hidden="true" className="inline-block w-8 h-px bg-orange-700 align-middle mr-3" />
              Spring / Summer Edit
            </p>
            <h2
              id="featured-collections-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.05]"
            >
              Featured <em className="italic font-normal text-orange-700">Collections</em>
            </h2>
          </div>
          <p className="md:max-w-sm text-neutral-600 text-base leading-relaxed">
            Three edits. One philosophy: garments that hold their shape, their story, and your attention.
          </p>
        </div>
      </header>

      {/* Asymmetric collection grid */}
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {collections.map(({ id, href, image, eyebrow, title, description }, index) => (
          <li
            key={id}
            // Middle card sits lower to break the rigid grid (desktop only)
            className={index === 1 ? "md:mt-16" : ""}
          >
            <Link
              href={href}
              aria-label={`Explore the ${title} collection`}
              className="group block relative focus:outline-none"
            >
              {/* Lookbook number */}
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-1 z-20 font-serif text-5xl md:text-6xl text-orange-700/90 leading-none mix-blend-multiply select-none"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Image with fixed aspect ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100 ring-1 ring-neutral-200 group-focus-visible:ring-2 group-focus-visible:ring-orange-700 group-focus-visible:ring-offset-2 transition">
                <Image
                  src={image}
                  alt={`${title} — ${eyebrow.toLowerCase()} collection`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                {/* Readability scrim */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80"
                />

                {/* Eyebrow tag */}
                <span className="absolute top-5 right-5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white bg-white/10 backdrop-blur-md ring-1 ring-white/20 rounded-full">
                  {eyebrow}
                </span>

                {/* Card content */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-2">
                    {title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/85 max-w-[28ch] mb-4 md:max-h-0 md:opacity-0 md:overflow-hidden md:translate-y-2 md:group-hover:max-h-32 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-focus-visible:max-h-32 md:group-focus-visible:opacity-100 md:group-focus-visible:translate-y-0 transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:md:max-h-32 motion-reduce:md:opacity-100 motion-reduce:md:translate-y-0">
                    {description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium tracking-wide">
                    <span className="relative">
                      Explore collection
                      <span
                        aria-hidden="true"
                        className="absolute left-0 -bottom-0.5 h-px w-full bg-white origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:scale-x-100"
                      />
                    </span>
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    >
                      <path
                        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturedProduct;