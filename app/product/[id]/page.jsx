"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  Star,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

// ---------- Helpers ----------
const formatPrice = (n, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);

// Default sizes & colors used if the product object doesn't define its own
const DEFAULT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const DEFAULT_COLORS = [
  { name: "Charcoal", hex: "#2A2A2A" },
  { name: "Cream", hex: "#EBE3D3" },
  { name: "Camel", hex: "#A57B45" },
];

// ---------- Subcomponents ----------

/** Breadcrumb trail */
const Breadcrumbs = ({ category, name }) => (
  <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-neutral-500">
    <ol className="flex items-center flex-wrap gap-x-2 gap-y-1">
      <li>
        <Link href="/" className="hover:text-neutral-900 transition-colors">
          Home
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li>
        <Link href="/all-products" className="hover:text-neutral-900 transition-colors">
          Shop
        </Link>
      </li>
      {category && (
        <>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={category === "Women" ? "/ShopWomen" : category === "Men" ? "/ShopMen" : "/all-products"}
              className="hover:text-neutral-900 transition-colors"
            >
              {category}
            </Link>
          </li>
        </>
      )}
      <li aria-hidden="true">/</li>
      <li className="text-neutral-900 normal-case tracking-normal truncate max-w-[40ch]">
        {name}
      </li>
    </ol>
  </nav>
);

/** Sticky product gallery with vertical thumbnails on desktop, swipe on mobile */
const ProductGallery = ({ images, name }) => {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ active: false, x: 50, y: 50 });

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoom({ active: true, x, y });
  };

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="md:sticky md:top-28 lg:top-32 self-start">
      <div className="flex gap-4">
        {/* Vertical thumbnail rail — desktop only */}
        {images.length > 1 && (
          <ul className="hidden md:flex flex-col gap-3 w-20 lg:w-24 shrink-0">
            {images.map((img, i) => (
              <li key={i}>
                <button
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  aria-current={active === i}
                  className={`relative w-full aspect-[4/5] overflow-hidden bg-neutral-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                    active === i
                      ? "ring-1 ring-neutral-900"
                      : "ring-1 ring-transparent hover:ring-neutral-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Main image */}
        <div className="flex-1 relative">
          <div
            className="relative aspect-[4/5] overflow-hidden bg-neutral-100 cursor-zoom-in"
            onMouseMove={onMouseMove}
            onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
          >
            <Image
              src={images[active]}
              alt={`${name} — view ${active + 1} of ${images.length}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                zoom.active ? "scale-150" : "scale-100"
              }`}
              style={
                zoom.active
                  ? { transformOrigin: `${zoom.x}% ${zoom.y}%` }
                  : undefined
              }
            />
          </div>

          {/* Mobile arrows */}
          {images.length > 1 && (
            <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
              <button
                onClick={prev}
                aria-label="Previous image"
                className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 backdrop-blur-md ring-1 ring-neutral-200 text-neutral-900 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="pointer-events-auto inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/85 backdrop-blur-md ring-1 ring-neutral-200 text-neutral-900 hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Mobile dot indicators */}
          {images.length > 1 && (
            <div className="md:hidden flex items-center justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1 rounded-full transition-all ${
                    active === i ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Accordion item — collapsible product details */
const Accordion = ({ title, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left text-sm uppercase tracking-[0.18em] text-neutral-900 hover:text-orange-700 transition-colors focus:outline-none focus-visible:underline underline-offset-4"
      >
        <span>{title}</span>
        <span aria-hidden="true" className="ml-4 shrink-0">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 text-sm text-neutral-700 leading-relaxed space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Star rating row — restrained, used in reviews accordion only */
const StarRow = ({ value = 4.5, count }) => (
  <div className="flex items-center gap-2">
    <span className="flex items-center gap-0.5" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < Math.round(value) ? "fill-neutral-900 text-neutral-900" : "text-neutral-300"}
        />
      ))}
    </span>
    <span className="text-xs text-neutral-500">
      {value} {count ? `· ${count} review${count === 1 ? "" : "s"}` : ""}
    </span>
  </div>
);

// ---------- Main page ----------

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const product = useMemo(
    () => products?.find((p) => p._id === id || p.id === id),
    [products, id]
  );

  // Selection state
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [feedback, setFeedback] = useState(""); // "added" | "size-required" | ""

  // Reset feedback after a moment
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(""), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  if (!product) return <Loading />;

  const images = Array.isArray(product.image) ? product.image : [product.image].filter(Boolean);
  const sizes = product.sizes ?? DEFAULT_SIZES;
  const colors = product.colors ?? DEFAULT_COLORS;
  const hasDiscount = product.price && product.offerPrice && product.price > product.offerPrice;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;
  const inStock = product.stock !== 0;
  const lowStock = typeof product.stock === "number" && product.stock > 0 && product.stock <= 3;

  const handleAddToCart = (goToCart = false) => {
    if (!selectedSize) {
      setFeedback("size-required");
      return;
    }
    addToCart(product._id, { size: selectedSize, color: colors[selectedColor]?.name, quantity });
    setFeedback("added");
    if (goToCart) {
      setTimeout(() => router.push("/cart"), 400);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard?.writeText(url);
      setFeedback("link-copied");
    }
  };

  // Curated "you may also like" — same category, exclude self, take 4
  const related = (products ?? [])
    .filter((p) => p._id !== product._id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <Navbar />

      <article
        // pt offsets the fixed Navbar height (16/20)
        className="pt-20 md:pt-28"
      >
        {/* Top bar with breadcrumbs */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-6">
          <Breadcrumbs category={product.category} name={product.name} />
        </div>

        {/* Two-column layout: gallery + details */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20">
            {/* LEFT — gallery */}
            <ProductGallery images={images} name={product.name} />

            {/* RIGHT — product details */}
            <div className="md:py-2">
              {product.collection && (
                <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
                  {product.collection}
                </p>
              )}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-neutral-900">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="mt-3 text-neutral-600 italic font-serif text-lg">
                  {product.subtitle}
                </p>
              )}

              {/* Price */}
              <div className="mt-6 flex items-baseline flex-wrap gap-x-4 gap-y-1">
                <span className="text-2xl md:text-3xl text-neutral-900">
                  {formatPrice(product.offerPrice ?? product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-neutral-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-orange-700">
                      −{discountPct}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-neutral-500">
                Tax included. Shipping calculated at checkout.
              </p>

              {/* Stock indicator */}
              {!inStock ? (
                <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-red-600">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  Sold out
                </p>
              ) : lowStock ? (
                <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-700">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  Only {product.stock} left
                </p>
              ) : (
                <p className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-700">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  In stock
                </p>
              )}

              <hr className="my-8 border-neutral-200" />

              {/* Color picker */}
              {colors.length > 0 && (
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Colour</p>
                    <p className="text-sm text-neutral-900">{colors[selectedColor]?.name}</p>
                  </div>
                  <ul className="flex flex-wrap items-center gap-3" role="radiogroup" aria-label="Colour">
                    {colors.map((c, i) => (
                      <li key={c.name}>
                        <button
                          role="radio"
                          aria-checked={selectedColor === i}
                          aria-label={c.name}
                          onClick={() => setSelectedColor(i)}
                          className={`relative w-9 h-9 rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                            selectedColor === i ? "scale-110" : "hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {selectedColor === i && (
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 rounded-full ring-2 ring-neutral-900 ring-offset-2"
                            />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Size picker */}
              {sizes.length > 0 && (
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Size</p>
                    <Link
                      href="/SizeGuide"
                      className="text-xs text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                    >
                      Size guide
                    </Link>
                  </div>
                  <ul
                    className="grid grid-cols-3 sm:grid-cols-6 gap-2"
                    role="radiogroup"
                    aria-label="Size"
                  >
                    {sizes.map((s) => {
                      const unavailable = product.unavailableSizes?.includes?.(s);
                      const active = selectedSize === s;
                      return (
                        <li key={s}>
                          <button
                            role="radio"
                            aria-checked={active}
                            disabled={unavailable}
                            onClick={() => {
                              setSelectedSize(s);
                              if (feedback === "size-required") setFeedback("");
                            }}
                            className={`w-full py-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${
                              active
                                ? "bg-neutral-950 text-white"
                                : unavailable
                                ? "text-neutral-400 line-through cursor-not-allowed ring-1 ring-neutral-200"
                                : "text-neutral-900 ring-1 ring-neutral-300 hover:ring-neutral-900"
                            }`}
                          >
                            {s}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {feedback === "size-required" && (
                    <p role="alert" className="mt-3 text-xs text-red-600">
                      Please select a size before adding to bag.
                    </p>
                  )}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-7">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
                  Quantity
                </p>
                <div className="inline-flex items-center ring-1 ring-neutral-300">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    className="w-11 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus size={14} aria-hidden="true" />
                  </button>
                  <span className="w-12 text-center text-sm" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => handleAddToCart(false)}
                  disabled={!inStock}
                  className="w-full inline-flex items-center justify-center gap-3 bg-neutral-950 text-white py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                >
                  {feedback === "added" ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      Added to bag
                    </>
                  ) : !inStock ? (
                    "Sold out"
                  ) : (
                    "Add to bag"
                  )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleAddToCart(true)}
                    disabled={!inStock}
                    className="inline-flex items-center justify-center py-3.5 text-xs uppercase tracking-[0.2em] ring-1 ring-neutral-900 text-neutral-900 hover:bg-neutral-950 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                  >
                    Buy now
                  </button>
                  <button
                    onClick={() => setWishlisted((w) => !w)}
                    aria-pressed={wishlisted}
                    className={`inline-flex items-center justify-center gap-2 py-3.5 text-xs uppercase tracking-[0.2em] ring-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${
                      wishlisted
                        ? "ring-orange-700 text-orange-700 bg-orange-50"
                        : "ring-neutral-300 text-neutral-700 hover:ring-neutral-900 hover:text-neutral-900"
                    }`}
                  >
                    <Heart
                      size={14}
                      aria-hidden="true"
                      className={wishlisted ? "fill-current" : ""}
                    />
                    {wishlisted ? "Saved" : "Save"}
                  </button>
                </div>

                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.2em] text-neutral-600 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:underline underline-offset-4"
                >
                  <Share2 size={13} aria-hidden="true" />
                  {feedback === "link-copied" ? "Link copied" : "Share"}
                </button>
              </div>

              {/* Service strip */}
              <div className="mt-10 pt-8 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                <div className="flex items-start gap-3">
                  <Truck size={16} aria-hidden="true" className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-900 font-medium">Complimentary shipping</p>
                    <p className="text-neutral-500 mt-0.5">On all orders</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw size={16} aria-hidden="true" className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-900 font-medium">Free returns</p>
                    <p className="text-neutral-500 mt-0.5">Within 30 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck size={16} aria-hidden="true" className="text-neutral-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-neutral-900 font-medium">Authenticated</p>
                    <p className="text-neutral-500 mt-0.5">Made in Lagos</p>
                  </div>
                </div>
              </div>

              {/* Accordion details */}
              <div className="mt-10">
                <Accordion title="Description" defaultOpen>
                  <p>{product.description}</p>
                </Accordion>
                <Accordion title="Composition & Care">
                  {product.composition ? (
                    <p>{product.composition}</p>
                  ) : (
                    <ul className="space-y-1.5 list-disc pl-5">
                      <li>Premium fabric, sourced and finished by hand</li>
                      <li>Dry clean only</li>
                      <li>Iron on low heat</li>
                      <li>Store on a hanger to maintain shape</li>
                    </ul>
                  )}
                </Accordion>
                <Accordion title="Size & Fit">
                  <p>
                    Model is 5'10" / 178cm and wears a size M. For a relaxed fit, size up. See our{" "}
                    <Link
                      href="/SizeGuide"
                      className="underline underline-offset-4 hover:text-neutral-950"
                    >
                      complete size guide
                    </Link>{" "}
                    for measurements.
                  </p>
                </Accordion>
                <Accordion title="Shipping & Returns">
                  <p>
                    Complimentary standard shipping on every order. Express options available at
                    checkout. Items can be returned for a full refund within 30 days, provided they
                    are unworn and in original condition.
                  </p>
                </Accordion>
                <Accordion title="Reviews">
                  <StarRow value={product.rating ?? 4.5} count={product.reviewCount ?? 24} />
                  <p className="text-neutral-500 text-xs mt-2">
                    Based on verified-purchase reviews. Full reviews coming soon.
                  </p>
                </Accordion>
              </div>
            </div>
          </div>
        </div>

        {/* You may also like — curated, not random */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-24 md:mt-32 mb-20 md:mb-28"
          >
            <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
                  <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
                  Curated
                </p>
                <h2
                  id="related-heading"
                  className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-900"
                >
                  You may also <em className="italic font-normal text-orange-700">like</em>
                </h2>
              </div>
              <Link
                href={
                  product.category === "Women"
                    ? "/ShopWomen"
                    : product.category === "Men"
                    ? "/ShopMen"
                    : "/all-products"
                }
                className="text-xs uppercase tracking-[0.2em] text-neutral-900 border-b border-neutral-900 pb-1 hover:opacity-70 transition self-start sm:self-end"
              >
                Browse the {product.category ? product.category.toLowerCase() : "full"} edit
              </Link>
            </header>

            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16">
              {related.map((p) => (
                <li key={p._id ?? p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Mobile sticky add-to-bag bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center gap-3 shadow-[0_-2px_20px_rgba(0,0,0,0.04)]">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900 truncate">
            {formatPrice(product.offerPrice ?? product.price)}
          </p>
          {selectedSize ? (
            <p className="text-[11px] text-neutral-500 uppercase tracking-[0.18em]">
              Size {selectedSize}
            </p>
          ) : (
            <p className="text-[11px] text-neutral-500 uppercase tracking-[0.18em]">
              Select a size
            </p>
          )}
        </div>
        <button
          onClick={() => handleAddToCart(false)}
          disabled={!inStock}
          className="flex-1 py-3 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {!inStock ? "Sold out" : "Add to bag"}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Product;