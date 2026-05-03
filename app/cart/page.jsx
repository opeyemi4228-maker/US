"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, Package } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const OrderSummary = dynamic(() => import("@/components/OrderSummary"), {
  ssr: false,
  loading: () => (
    <div className="w-full md:w-[380px] h-64 bg-white rounded-2xl animate-pulse" />
  ),
});
/* ── Empty state ──────────────────────────────────────────── */
const EmptyCart = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
    <div className="w-24 h-24 rounded-full bg-orange-50 flex items-center justify-center">
      <ShoppingBag size={40} className="text-orange-400" />
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
      className="inline-flex items-center gap-2 bg-orange-600 text-white text-sm uppercase tracking-[0.15em] px-8 py-3.5 rounded-full hover:bg-orange-700 transition-colors"
    >
      Browse Collection
    </Link>
  </div>
);

/* ── Cart Row ─────────────────────────────────────────────── */
const CartRow = ({ product, quantity, onIncrease, onDecrease, onRemove }) => (
  <div className="group flex items-start gap-4 md:gap-6 py-6 border-b border-neutral-100 last:border-0">
    {/* Image */}
    <Link
      href={`/product/${product._id}`}
      className="flex-shrink-0 w-20 h-24 md:w-28 md:h-32 rounded-xl overflow-hidden bg-neutral-100"
    >
      <Image
        src={product.image[0]}
        alt={product.name}
        width={200}
        height={240}
        className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </Link>

    {/* Details */}
    <div className="flex-1 min-w-0">
      <Link href={`/product/${product._id}`}>
        <p className="font-medium text-neutral-900 text-sm md:text-base truncate hover:text-orange-600 transition-colors">
          {product.name}
        </p>
      </Link>
      <p className="text-xs text-neutral-400 uppercase tracking-wide mt-0.5">
        {product.category}
      </p>

      {/* Price row on mobile */}
      <p className="text-orange-600 font-semibold mt-2 md:hidden">
        ${(product.offerPrice * quantity).toFixed(2)}
      </p>

      {/* Quantity control */}
      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
          aria-label="Decrease quantity"
        >
          <span className="text-lg leading-none mb-0.5">−</span>
        </button>
        <span className="w-6 text-center text-sm font-medium text-neutral-800">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-600 hover:border-orange-400 hover:text-orange-600 transition"
          aria-label="Increase quantity"
        >
          <span className="text-lg leading-none mb-0.5">+</span>
        </button>
      </div>
    </div>

    {/* Desktop price & remove */}
    <div className="hidden md:flex flex-col items-end gap-4">
      <p className="font-semibold text-neutral-900">
        ${(product.offerPrice * quantity).toFixed(2)}
      </p>
      <p className="text-xs text-neutral-400 line-through">
        ${(product.price * quantity).toFixed(2)}
      </p>
    </div>

    {/* Remove */}
    <button
      onClick={onRemove}
      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-neutral-300 hover:text-red-500 hover:bg-red-50 transition mt-1 md:mt-0"
      aria-label="Remove item"
    >
      <Trash2 size={15} />
    </button>
  </div>
);

/* ── Page ─────────────────────────────────────────────────── */
const Cart = () => {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
  } = useAppContext();

  const cartEntries = useMemo(
    () =>
      Object.keys(cartItems)
        .map((id) => ({
          product: products.find((p) => p._id === id),
          quantity: cartItems[id],
        }))
        .filter((e) => e.product && e.quantity > 0),
    [cartItems, products]
  );

  const count = getCartCount();

  return (
      <main className="min-h-screen bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-24">

          {/* Page header */}
          <header className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
              <span aria-hidden className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
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

              {/* Cart items card */}
              <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">

                {/* Column headers — desktop only */}
                <div className="hidden md:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 border-b border-neutral-100 text-[11px] uppercase tracking-[0.2em] text-neutral-400">
                  <span>Product</span>
                  <span className="text-right pr-14">Unit price</span>
                  <span>Qty</span>
                  <span className="text-right">Subtotal</span>
                </div>

                <div className="px-4 md:px-6">
                  {cartEntries.map(({ product, quantity }) => (
                    <CartRow
                      key={product._id}
                      product={product}
                      quantity={quantity}
                      onIncrease={() => addToCart(product._id)}
                      onDecrease={() =>
                        updateCartQuantity(product._id, quantity - 1)
                      }
                      onRemove={() => updateCartQuantity(product._id, 0)}
                    />
                  ))}
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between px-4 md:px-6 py-5 border-t border-neutral-100 bg-neutral-50/60">
                  <button
                    onClick={() => router.push("/all-products")}
                    className="group inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-orange-600 transition-colors"
                  >
                    <ArrowLeft
                      size={15}
                      className="group-hover:-translate-x-1 transition-transform"
                    />
                    Continue Shopping
                  </button>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Package size={13} />
                    Free shipping on orders over $150
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