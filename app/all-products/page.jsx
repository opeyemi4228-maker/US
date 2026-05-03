"use client";
import React, { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHero";
import { useAppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import {
  SlidersHorizontal,
  X,
  Plus,
  Minus,
  ChevronDown,
  LayoutGrid,
  Grid3x3,
} from "lucide-react";

// ---------- Config ----------
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const FILTER_GROUPS = [
  {
    key: "category",
    label: "Category",
    type: "checkbox",
    options: ["Women", "Men", "Accessories", "Heritage"],
  },
  {
    key: "size",
    label: "Size",
    type: "checkbox",
    options: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    key: "color",
    label: "Colour",
    type: "swatch",
    options: [
      { name: "Black", hex: "#171717" },
      { name: "Cream", hex: "#EBE3D3" },
      { name: "Camel", hex: "#A57B45" },
      { name: "Olive", hex: "#5B6346" },
      { name: "Navy", hex: "#1F2A44" },
      { name: "Burgundy", hex: "#5B1A24" },
      { name: "White", hex: "#F4F1EC" },
      { name: "Rust", hex: "#A04A2A" },
    ],
  },
  {
    key: "price",
    label: "Price",
    type: "checkbox",
    options: ["Under $100", "$100 – $250", "$250 – $500", "$500 – $1,000", "Over $1,000"],
  },
];

const PRICE_RANGES = {
  "Under $100": [0, 100],
  "$100 – $250": [100, 250],
  "$250 – $500": [250, 500],
  "$500 – $1,000": [500, 1000],
  "Over $1,000": [1000, Infinity],
};

const PAGE_SIZE = 16;

// ---------- Subcomponents ----------

const FilterGroup = ({ group, applied, toggle }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left text-[11px] uppercase tracking-[0.2em] text-neutral-900 hover:text-orange-700 transition-colors focus:outline-none focus-visible:underline underline-offset-4"
      >
        <span>{group.label}</span>
        <span aria-hidden="true">{open ? <Minus size={14} /> : <Plus size={14} />}</span>
      </button>
      <div
        className={`grid transition-all duration-400 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5">
            {group.type === "swatch" ? (
              <ul className="flex flex-wrap gap-2.5" role="group" aria-label={group.label}>
                {group.options.map((c) => {
                  const active = applied[group.key]?.includes(c.name);
                  return (
                    <li key={c.name}>
                      <button
                        onClick={() => toggle(group.key, c.name)}
                        aria-pressed={active}
                        aria-label={c.name}
                        title={c.name}
                        className={`relative w-7 h-7 rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                          active ? "scale-110" : "hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {active && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full ring-2 ring-neutral-900 ring-offset-2"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul className="space-y-2.5">
                {group.options.map((opt) => {
                  const active = applied[group.key]?.includes(opt);
                  return (
                    <li key={opt}>
                      <label className="flex items-center gap-3 cursor-pointer text-sm text-neutral-700 hover:text-neutral-950 transition-colors group">
                        <span
                          className={`relative w-4 h-4 inline-flex items-center justify-center border transition-colors ${
                            active
                              ? "bg-neutral-950 border-neutral-950"
                              : "border-neutral-300 group-hover:border-neutral-700"
                          }`}
                        >
                          {active && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2 5l2 2 4-4"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={!!active}
                          onChange={() => toggle(group.key, opt)}
                        />
                        <span className={active ? "text-neutral-950" : ""}>{opt}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- Page ----------

const AllProducts = () => {
  const { products } = useAppContext();
  const [sort, setSort] = useState("featured");
  const [density, setDensity] = useState("comfortable"); // comfortable | compact
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerCloseRef = useRef(null);

  // Applied filters: { category: [], size: [], color: [], price: [] }
  const [applied, setApplied] = useState({
    category: [],
    size: [],
    color: [],
    price: [],
  });

  const toggle = (key, value) => {
    setApplied((prev) => {
      const list = prev[key] ?? [];
      return {
        ...prev,
        [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      };
    });
    setPage(1); // reset pagination on filter change
  };

  const removePill = (key, value) => toggle(key, value);

  const clearAll = () =>
    setApplied({ category: [], size: [], color: [], price: [] });

  const totalApplied = Object.values(applied).reduce((n, arr) => n + arr.length, 0);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = products ?? [];

    if (applied.category.length) {
      list = list.filter((p) => applied.category.includes(p.category));
    }
    if (applied.size.length) {
      list = list.filter((p) =>
        (p.sizes ?? []).some((s) => applied.size.includes(s))
      );
    }
    if (applied.color.length) {
      list = list.filter((p) =>
        (p.colors ?? []).some((c) => applied.color.includes(c.name ?? c))
      );
    }
    if (applied.price.length) {
      list = list.filter((p) => {
        const price = p.offerPrice ?? p.price ?? 0;
        return applied.price.some((label) => {
          const [min, max] = PRICE_RANGES[label] ?? [0, Infinity];
          return price >= min && price < max;
        });
      });
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
        sorted.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, applied, sort]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = filtered.length > visible.length;

  // Drawer scroll lock + ESC to close
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const gridClass =
    density === "compact"
      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-10 md:gap-x-5"
      : "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16";

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
        height="md"
      />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
        <div className="flex gap-10 lg:gap-14">
          {/* ---------- Desktop sticky filter rail ---------- */}
          <aside
            aria-label="Filters"
            className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 -mr-2"
          >
            <div className="flex items-center justify-between pb-5 border-b border-neutral-300">
              <h2 className="text-[11px] uppercase tracking-[0.25em] text-neutral-900">
                Refine
              </h2>
              {totalApplied > 0 && (
                <button
                  onClick={clearAll}
                  className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-900 underline underline-offset-4"
                >
                  Clear all ({totalApplied})
                </button>
              )}
            </div>
            {FILTER_GROUPS.map((g) => (
              <FilterGroup key={g.key} group={g} applied={applied} toggle={toggle} />
            ))}
          </aside>

          {/* ---------- Main content ---------- */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 mb-6 border-b border-neutral-200">
              <div className="flex items-center gap-4">
                {/* Mobile filter trigger */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-900 ring-1 ring-neutral-300 px-4 py-2 rounded-full hover:ring-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                >
                  <SlidersHorizontal size={13} aria-hidden="true" />
                  Filter
                  {totalApplied > 0 && (
                    <span className="ml-1 text-[10px] bg-neutral-950 text-white rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {totalApplied}
                    </span>
                  )}
                </button>
                <p className="text-sm text-neutral-600">
                  <span className="text-neutral-900 font-medium">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Density toggle — desktop only */}
                <div
                  className="hidden sm:inline-flex items-center gap-1 ring-1 ring-neutral-200 rounded-full p-1"
                  role="radiogroup"
                  aria-label="Grid density"
                >
                  <button
                    role="radio"
                    aria-checked={density === "comfortable"}
                    aria-label="Spacious view"
                    onClick={() => setDensity("comfortable")}
                    className={`p-1.5 rounded-full transition-colors ${
                      density === "comfortable"
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    <LayoutGrid size={14} aria-hidden="true" />
                  </button>
                  <button
                    role="radio"
                    aria-checked={density === "compact"}
                    aria-label="Dense view"
                    onClick={() => setDensity("compact")}
                    className={`p-1.5 rounded-full transition-colors ${
                      density === "compact"
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    <Grid3x3 size={14} aria-hidden="true" />
                  </button>
                </div>

                {/* Sort */}
                <label className="relative inline-flex items-center">
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 mr-3">
                    Sort
                  </span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none text-sm bg-transparent border-b border-neutral-300 py-1.5 pr-7 focus:outline-none focus:border-neutral-900 transition-colors cursor-pointer"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-neutral-500"
                  />
                </label>
              </div>
            </div>

            {/* Applied filter pills */}
            {totalApplied > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {Object.entries(applied).map(([key, values]) =>
                  values.map((v) => (
                    <button
                      key={`${key}-${v}`}
                      onClick={() => removePill(key, v)}
                      className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-700 ring-1 ring-neutral-300 hover:ring-neutral-900 hover:text-neutral-900 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {v}
                      <X size={12} aria-hidden="true" className="opacity-60 group-hover:opacity-100" />
                    </button>
                  ))
                )}
                <button
                  onClick={clearAll}
                  className="text-xs uppercase tracking-[0.16em] text-neutral-500 hover:text-neutral-900 underline underline-offset-4 ml-2"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Grid */}
            {!products ? (
              // Loading skeleton — matches density
              <ul className={gridClass} aria-busy="true" aria-label="Loading products">
                {Array.from({ length: density === "compact" ? 15 : 12 }).map((_, i) => (
                  <li key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-neutral-100" />
                    <div className="mt-3 h-3 w-2/3 bg-neutral-100 rounded" />
                    <div className="mt-2 h-3 w-1/3 bg-neutral-100 rounded" />
                  </li>
                ))}
              </ul>
            ) : filtered.length === 0 ? (
              // Empty state
              <div className="text-center py-24 md:py-32">
                <p className="font-serif text-3xl md:text-4xl text-neutral-900">No matches.</p>
                <p className="mt-3 text-neutral-600 max-w-md mx-auto">
                  Nothing in our catalogue fits all those filters at once. Try removing one, or
                  start fresh.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-neutral-900 pb-1 hover:gap-3 transition-all"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <ul className={gridClass}>
                  {visible.map((product) => (
                    <li key={product._id ?? product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>

                {/* Load more */}
                {hasMore && (
                  <div className="mt-16 md:mt-20 flex flex-col items-center gap-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                      Showing {visible.length} of {filtered.length}
                    </p>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="inline-flex items-center gap-3 ring-1 ring-neutral-900 text-neutral-900 px-10 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-neutral-950 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                    >
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ---------- Mobile filter drawer ---------- */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={() => setDrawerOpen(false)}
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div
          className={`absolute inset-y-0 right-0 w-[92%] max-w-md bg-white flex flex-col shadow-2xl transition-transform duration-500 ease-out ${
            drawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200 shrink-0">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-xl text-neutral-950">Filter</h2>
              {totalApplied > 0 && (
                <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                  {totalApplied} applied
                </span>
              )}
            </div>
            <button
              ref={drawerCloseRef}
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-full text-neutral-900 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              aria-label="Close filters"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-2">
            {FILTER_GROUPS.map((g) => (
              <FilterGroup key={g.key} group={g} applied={applied} toggle={toggle} />
            ))}
          </div>

          <div className="px-5 py-4 border-t border-neutral-200 shrink-0 flex gap-3">
            <button
              onClick={clearAll}
              disabled={totalApplied === 0}
              className="flex-1 py-3 ring-1 ring-neutral-300 text-neutral-900 text-xs uppercase tracking-[0.2em] hover:ring-neutral-900 transition-colors disabled:opacity-40"
            >
              Clear
            </button>
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex-[2] py-3 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-colors"
            >
              View {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;