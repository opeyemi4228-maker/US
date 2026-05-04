"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const OrderPlaced = () => {
  const { router } = useAppContext();

  useEffect(() => {
    const t = setTimeout(() => router.push("/my-orders"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-8">
          <CheckCircle size={40} className="text-emerald-600" aria-hidden="true" />
        </div>

        {/* Heading */}
        <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
          <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
          Confirmed
        </p>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-900 leading-[1.1] mb-4">
          Order <em className="italic font-normal text-orange-700">Placed</em>
        </h1>
        <p className="text-neutral-600 leading-relaxed mb-8">
          Thank you for your order. You'll receive a confirmation email shortly, and we'll
          notify you when your pieces are on the way.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/my-orders"
            className="inline-flex items-center gap-2 bg-neutral-950 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            <Package size={14} aria-hidden="true" />
            View Orders
          </Link>
          <Link
            href="/all-products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-700 ring-1 ring-neutral-300 px-8 py-3.5 hover:ring-neutral-900 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-8 text-xs text-neutral-400">
          Redirecting to your orders in a moment…
        </p>
      </div>
    </main>
  );
};

export default OrderPlaced;
