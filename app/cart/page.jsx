"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, Package, Minus, Plus } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const OrderSummary = dynamic(() => import("@/components/OrderSummary"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-white border border-neutral-200 animate-pulse" />
  ),
});

/* ── Empty state ──────────────────────────────────────────── */
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
    <div className="w-20 h-20 flex items-center justify-center bg-orange-50">
      <ShoppingBag size={36} className="text-orange-400" />
    </div>
    <div>
      <p className="font-serif text-2xl md:text-3xl text-neutral-900 mb-2">
        Your cart is empty
      </p>
      <p className="text-neutral-500 text-sm max-w-xs mx-auto leading-relaxed">
        Nothing here yet. Explore our collection and add something you love.
      </p>
    </div>
    <Link
      href="/all-products"
      className="inline-flex items-center gap-2 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      Browse Collection
    </Link>
  </div>
);

/* ── Cart Row ─────────────────────────────────────────────── */
const CartRow = ({ product, quantity, currency, onIncrease, onDecrease, onRemove }) => {
  const image = Array.isArray(product.image) ? product.image[0] : product.image;
  return (
    <div className="flex items-start gap-4 md:gap-6 py-6 border-b border-neutral-100 last:border-0">
      {/* Image */}
      <Link
        href={`/product/${product._id}`}
        className="flex-shrink-0 w-20 h-24 md:w-24 md:h-28 overflow-hidden bg-neutral-100 hover:opacity-80 transition-opacity"
      >
        {image && (
          <Image
            src={image}
            alt={product.name}
            width={200}
            height={240}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/product/${product._id}`}>
          <p className="font-medium text-neutral-900 text-sm truncate hover:text-orange-700 transition-colors">
            {product.name}
          </p>
        </Link>
        <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 mt-0.5">
          {product.category}
        </p>

        {/* Mobile price */}
        <p className="text-sm font-medium text-neutral-900 mt-2 md:hidden">
          {currency}{(product.offerPrice * quantity).toFixed(2)}
        </p>

        {/* Quantity control */}
        <div className="inline-flex items-center ring-1 ring-neutral-300 mt-3">
          <button
            type="button"
            onClick={onDecrease}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={12} aria-hidden="true" />
          </button>
          <span className="w-8 text-center text-sm text-neutral-800">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncrease}
            aria-label="Increase quantity"
            className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Plus size={12} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Desktop price */}
      <div className="hidden md:flex flex-col items-end gap-1">
        <p className="text-sm font-medium text-neutral-900">
          {currency}{(product.offerPrice * quantity).toFixed(2)}
        </p>
        {product.price > product.offerPrice && (
          <p className="text-xs text-neutral-400 line-through">
            {currency}{(product.price * quantity).toFixed(2)}
          </p>
        )}
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove item"
        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────────── */
const Cart = () => {
  const {
    products,
    router,
    currency,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  const cartEntries = useMemo(
    () =>
      Object.keys(cartItems)
        .map((id) => ({
          product: products?.find((p) => p._id === id),
          quantity: cartItems[id],
        }))
        .filter((e) => e.product && e.quantity > 0),
    [cartItems, products]
  );

  const count = getCartCount();

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 pb-24">

        {/* Page header */}
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
            Your Selection
          </p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-900 leading-tight">
              Shopping <em className="italic font-normal text-orange-700">Cart</em>
            </h1>
            {count > 0 && (
              <span className="text-sm text-neutral-400">
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </div>
        </header>

        {count === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Cart items */}
            <div className="flex-1 bg-white border border-neutral-200 overflow-hidden">
              {/* Column headers — desktop only */}
              <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-neutral-100 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                <span>Product</span>
                <span className="text-right pr-10">Unit price</span>
                <span>Qty</span>
                <span className="text-right">Subtotal</span>
              </div>

              <div className="px-4 md:px-6">
                {cartEntries.map(({ product, quantity }) => (
                  <CartRow
                    key={product._id}
                    product={product}
                    quantity={quantity}
                    currency={currency}
                    onIncrease={() => addToCart(product._id)}
                    onDecrease={() => updateCartQuantity(product._id, quantity - 1)}
                    onRemove={() => updateCartQuantity(product._id, 0)}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t border-neutral-100 bg-neutral-50/60">
                <button
                  type="button"
                  onClick={() => router.push("/all-products")}
                  className="group inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-orange-700 transition-colors"
                >
                  <ArrowLeft size={14} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
                  Continue shopping
                </button>
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Package size={13} aria-hidden="true" />
                  Free shipping on all orders
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-[360px] xl:w-[400px] flex-shrink-0">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
