"use client";
import React, { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHero";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const AllProducts = () => {
  const { products } = useAppContext();
  const [sort, setSort] = useState("featured");

  const sorted = useMemo(() => {
    const list = [...(products ?? [])];
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => (a.offerPrice ?? a.price ?? 0) - (b.offerPrice ?? b.price ?? 0));
      case "price-desc":
        return list.sort((a, b) => (b.offerPrice ?? b.price ?? 0) - (a.offerPrice ?? a.price ?? 0));
      case "newest":
        return list.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <>
      <PageHeader
        eyebrow="The full edit"
        title={
          <>
            All <em className="italic font-normal text-orange-300">Pieces</em>
          </>
        }
        description="Every silhouette, every fabric, every detail — the complete Unice Stitches collection in one place."
        image={assets.hero}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 md:py-20">
        {/* Toolbar — count + sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-10 border-b border-neutral-200">
          <p className="text-sm text-neutral-600">
            <span className="text-neutral-900 font-medium">{sorted.length}</span>{" "}
            {sorted.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-transparent border-b border-neutral-300 py-1.5 pr-8 focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        {sorted.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
            {sorted.map((product) => (
              <li key={product._id ?? product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <ul
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16"
            aria-busy="true"
            aria-label="Loading products"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <li key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-neutral-100" />
                <div className="mt-3 h-4 w-2/3 bg-neutral-100 rounded" />
                <div className="mt-2 h-3 w-1/3 bg-neutral-100 rounded" />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default AllProducts;