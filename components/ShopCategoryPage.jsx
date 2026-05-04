"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { ChevronDown, ArrowRight } from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

/**
 * Shared category landing page used by ShopMen, ShopWomen, etc.
 * Eliminates the duplication that caused the "Men page describes Women" bug.
 */
const ShopCategoryPage = ({
  category,
  eyebrow,
  title,
  description,
  image,
  subcategories = ["All"],
}) => {
  const { products } = useAppContext();
  const [sub, setSub] = useState(subcategories[0] ?? "All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = (products ?? []).filter((p) => p.category === category);
    if (sub && sub !== "All") {
      list = list.filter((p) => p.subcategory === sub || p.tags?.includes?.(sub));
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => (a.offerPrice ?? a.price ?? 0) - (b.offerPrice ?? b.price ?? 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.offerPrice ?? b.price ?? 0) - (a.offerPrice ?? a.price ?? 0));
        break;
      case "newest":
        sorted.sort((a, b) => (b.date ?? b.createdAt ?? 0) - (a.date ?? a.createdAt ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, category, sub, sort]);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={image}
        height="lg"
      >
        <Link
          href="#shop-grid"
          className="inline-flex items-center gap-2 bg-white text-neutral-950 px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-orange-500 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Shop now
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </PageHero>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20" id="shop-grid">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-10 pb-6 border-b border-neutral-200">
          {subcategories.length > 1 && (
            <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
              <ul className="flex items-center gap-1" role="tablist" aria-label="Subcategories">
                {subcategories.map((s) => {
                  const active = sub === s;
                  return (
                    <li key={s}>
                      <button
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSub(s)}
                        className={`whitespace-nowrap text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                          active
                            ? "bg-neutral-950 text-white"
                            : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4 md:ml-auto">
            <span className="text-xs text-neutral-500">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </span>
            <label className="relative inline-flex items-center">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none text-xs uppercase tracking-[0.18em] bg-transparent ring-1 ring-neutral-300 rounded-full pl-4 pr-9 py-2 text-neutral-900 hover:ring-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort: {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              />
            </label>
          </div>
        </div>

        {!products ? (
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
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 md:py-28">
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">Coming soon.</p>
            <p className="mt-3 text-neutral-600 max-w-md mx-auto">
              We're still working on this corner of the catalogue. Check back shortly, or browse
              everything we have right now.
            </p>
            <Link
              href="/all-products"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-neutral-900 pb-1 hover:gap-3 transition-all"
            >
              Browse all pieces <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
            {filtered.map((product) => (
              <li key={product._id ?? product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default ShopCategoryPage;