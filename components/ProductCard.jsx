"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
  const { currency } = useAppContext();

  const image = Array.isArray(product.image) ? product.image[0] : product.image;
  const hasDiscount =
    product.price && product.offerPrice && product.price > product.offerPrice;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <Link
      href={`/product/${product._id}`}
      className="group block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
        )}

        {/* Discount badge */}
        {discountPct > 0 && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-orange-700 text-white px-2 py-0.5">
            −{discountPct}%
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Save ${product.name}`}
          onClick={(e) => e.preventDefault()}
          className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity hover:text-orange-700 focus:outline-none focus-visible:opacity-100"
        >
          <Heart size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="text-sm font-medium text-neutral-900 truncate leading-snug group-hover:text-orange-700 transition-colors">
          {product.name}
        </p>
        {product.category && (
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 truncate">
            {product.category}
          </p>
        )}
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-medium text-neutral-900">
            {currency}{product.offerPrice ?? product.price}
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through">
              {currency}{product.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
