"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products } = useAppContext();

  // Cap items shown on the home grid; everything else lives on /all-products
  const displayed = products?.slice(0, 10) ?? [];

  return (
    <section
      aria-labelledby="popular-collection-heading"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-28"
    >
      {/* Section header */}
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12 mb-12 md:mb-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
            <span aria-hidden="true" className="inline-block w-8 h-px bg-orange-700 align-middle mr-3" />
            This season's edit
          </p>
          <h2
            id="popular-collection-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 leading-[1.05]"
          >
            Popular <em className="italic font-normal text-orange-700">Collection</em>
          </h2>
        </div>
        <p className="md:max-w-sm text-neutral-600 text-base leading-relaxed">
          The pieces our community is reaching for right now — restocked, refined, ready to wear.
        </p>
      </header>

      {/* Product grid */}
      {!products ? (
        // Loading skeleton
        <ul
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16"
          aria-busy="true"
          aria-label="Loading products"
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-neutral-100 rounded-sm" />
              <div className="mt-3 h-4 w-2/3 bg-neutral-100 rounded" />
              <div className="mt-2 h-3 w-1/3 bg-neutral-100 rounded" />
            </li>
          ))}
        </ul>
      ) : displayed.length === 0 ? (
        // Empty state
        <div className="text-center py-16 md:py-20">
          <p className="font-serif text-2xl md:text-3xl text-neutral-900">Nothing here yet.</p>
          <p className="mt-3 text-neutral-600 max-w-md mx-auto">
            We're restocking now. Check back shortly for the new edit.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
          {displayed.map((product) => (
            <li key={product._id ?? product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {/* See more — refined link instead of generic button */}
      {displayed.length > 0 && (
        <div className="mt-16 md:mt-20 flex justify-center">
          <Link
            href="/all-products"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:gap-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
          >
            View all pieces
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomeProducts;