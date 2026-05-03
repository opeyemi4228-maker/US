import React from "react";
import Image from "next/image";

/**
 * Editorial page hero — used by interior pages (About, Contact, Size Guide, etc.)
 * Replaces the inline "background image + dark overlay + chunky h1" pattern.
 *
 * Props:
 *   eyebrow?    string — small uppercase label above title
 *   title       string — main heading (italic word optional via <em>)
 *   description? string
 *   image?      StaticImageData | string — background image
 *   align?      "left" | "center" (default: "center")
 *   height?     "sm" | "md" | "lg" (default: "md")
 */
const heightMap = {
  sm: "h-[40vh] min-h-[280px] md:h-[50vh] md:min-h-[360px]",
  md: "h-[55vh] min-h-[360px] md:h-[65vh] md:min-h-[480px]",
  lg: "h-[75vh] min-h-[480px] md:h-[85vh] md:min-h-[600px]",
  tall: "h-[85vh] min-h-[560px] md:h-screen md:min-h-[700px]",
};

const PageHero = ({
  eyebrow,
  title,
  description,
  image,
  align = "center",
  height = "md",
  children,
}) => {
  const isLeft = align === "left";

  return (
    <section
      aria-label={typeof title === "string" ? title : "Page header"}
      // pt offsets promo banner (h-10 = 40px) + navbar (h-16 md:h-20)
      className={`relative w-full ${heightMap[height] ?? heightMap.md} pt-[104px] md:pt-[120px] overflow-hidden ${
        image ? "bg-neutral-900" : "bg-neutral-50"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Layered scrim for readability */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          />
        </>
      )}

      <div
        className={`relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex flex-col justify-center ${
          isLeft ? "items-start text-left" : "items-center text-center"
        }`}
      >
        {eyebrow && (
          <p
            className={`text-[11px] uppercase tracking-[0.3em] mb-5 ${
              image ? "text-white/85" : "text-orange-700"
            }`}
          >
            <span
              aria-hidden="true"
              className={`inline-block w-8 h-px align-middle mr-3 ${
                image ? "bg-white/85" : "bg-orange-700"
              }`}
            />
            {eyebrow}
          </p>
        )}
        <h1
          className={`font-serif tracking-tight leading-[1.05] ${
            image ? "text-white" : "text-neutral-900"
          } text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${isLeft ? "" : "max-w-3xl"}`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-5 text-base md:text-lg leading-relaxed ${
              image ? "text-white/85" : "text-neutral-600"
            } ${isLeft ? "max-w-xl" : "max-w-2xl"}`}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;