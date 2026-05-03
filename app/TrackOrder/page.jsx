"use client";
import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Package, Mail, Phone, Check, Truck, Home as HomeIcon, ShoppingBag, Boxes } from "lucide-react";

const STEP_ICONS = [ShoppingBag, Boxes, Package, Truck, Truck, HomeIcon];

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [tracking, setTracking] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading
  const [error, setError] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();
    setError("");
    if (!orderId.trim()) {
      setError("Please enter your order ID.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    setTracking(null);

    setTimeout(() => {
      setTracking({
        id: orderId.toUpperCase(),
        currentStep: 3,
        steps: [
          { label: "Order placed", date: "May 1, 2026" },
          { label: "Order processed", date: "May 1, 2026" },
          { label: "Shipped", date: "May 2, 2026" },
          { label: "In transit", date: "May 3, 2026" },
          { label: "Out for delivery", date: null },
          { label: "Delivered", date: null },
        ],
        carrier: "DHL Express",
        carrierRef: "JJD0099887766",
        expected: "May 6, 2026",
      });
      setStatus("idle");
    }, 1200);
  };

  return (
    <>
      <PageHero
        eyebrow="Order tracking"
        title={
          <>
            Where's my <em className="italic font-normal text-orange-700">order</em>?
          </>
        }
        description="Enter your order ID and email below to see the latest status and expected delivery."
        height="md"
      />

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleTrack}
              aria-label="Track order"
              className="rounded-2xl bg-neutral-50 p-6 sm:p-10 ring-1 ring-neutral-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <Package size={16} aria-hidden="true" />
                </span>
                <h2 className="font-serif text-2xl text-neutral-900">Track an order</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="order-id" className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Order ID
                  </label>
                  <input
                    id="order-id"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. UNS-12345"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 outline-none focus:border-neutral-900 transition placeholder-neutral-400"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="track-email" className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Email
                  </label>
                  <input
                    id="track-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="The email used at checkout"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 outline-none focus:border-neutral-900 transition placeholder-neutral-400"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-orange-600 transition-colors disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                {status === "loading" ? "Looking it up…" : "Track order"}
              </button>

              {error && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-8 text-sm text-neutral-600 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Tips</p>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-orange-700 font-serif leading-none mt-0.5">·</span>
                  Your order ID is in the confirmation email we sent.
                </li>
                <li className="flex gap-2">
                  <span className="text-orange-700 font-serif leading-none mt-0.5">·</span>
                  Tracking can take up to 24 hours to update after shipping.
                </li>
              </ul>
              <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2">
                <a href="mailto:support@unicestitches.com" className="inline-flex items-center gap-2 hover:text-orange-700 transition-colors">
                  <Mail size={14} aria-hidden="true" /> support@unicestitches.com
                </a>
                <a href="tel:+12345678900" className="inline-flex items-center gap-2 hover:text-orange-700 transition-colors">
                  <Phone size={14} aria-hidden="true" /> +1 (234) 567-8900
                </a>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-7">
            {tracking ? (
              <div className="rounded-2xl bg-white ring-1 ring-neutral-200 p-6 sm:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-neutral-100">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Order</p>
                    <p className="font-serif text-2xl text-neutral-900 mt-1">{tracking.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Expected delivery</p>
                    <p className="font-serif text-2xl text-orange-700 mt-1">{tracking.expected}</p>
                  </div>
                </div>

                <ol className="mt-8 space-y-6" aria-label="Order progress">
                  {tracking.steps.map((step, i) => {
                    const Icon = STEP_ICONS[i] ?? Package;
                    const done = i <= tracking.currentStep;
                    const current = i === tracking.currentStep;
                    return (
                      <li key={i} className="relative flex items-start gap-4">
                        {i < tracking.steps.length - 1 && (
                          <span
                            aria-hidden="true"
                            className={`absolute left-[19px] top-10 w-px h-[calc(100%+0.5rem)] ${
                              done && i < tracking.currentStep ? "bg-orange-700" : "bg-neutral-200"
                            }`}
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={`relative z-10 inline-flex w-10 h-10 items-center justify-center rounded-full shrink-0 transition-colors ${
                            done
                              ? current
                                ? "bg-orange-700 text-white ring-4 ring-orange-100"
                                : "bg-orange-700 text-white"
                              : "bg-neutral-100 text-neutral-400"
                          }`}
                        >
                          {done && !current ? <Check size={16} /> : <Icon size={16} />}
                        </span>
                        <div className="pt-1.5 flex-1 flex items-baseline justify-between gap-3">
                          <p
                            className={`text-sm ${
                              current ? "font-medium text-neutral-900" : done ? "text-neutral-900" : "text-neutral-500"
                            }`}
                          >
                            {step.label}
                            {current && (
                              <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-orange-700">
                                Now
                              </span>
                            )}
                          </p>
                          {step.date && <p className="text-xs text-neutral-500 shrink-0">{step.date}</p>}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-sm">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Carrier</p>
                    <p className="text-neutral-900 mt-1">
                      {tracking.carrier} · <span className="font-mono text-neutral-600">{tracking.carrierRef}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-neutral-200 p-10 md:p-14 text-center min-h-[400px] flex flex-col items-center justify-center">
                <span className="inline-flex w-14 h-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 mb-5">
                  <Package size={22} aria-hidden="true" />
                </span>
                <p className="font-serif text-2xl text-neutral-900">No order looked up yet.</p>
                <p className="mt-3 text-sm text-neutral-500 max-w-sm mx-auto">
                  Enter your order ID and email to the left and we'll show you exactly where your package is.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default TrackOrder;