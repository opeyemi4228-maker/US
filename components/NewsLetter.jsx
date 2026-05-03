"use client";
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const trimmed = email.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    try {
      // Wire to your real endpoint:
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email: trimmed }) });
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="relative isolate overflow-hidden bg-neutral-50 my-20 md:my-28"
    >
      {/* Decorative serif glyph */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-10 -right-6 md:-top-20 md:-right-10 font-serif text-[18rem] md:text-[26rem] leading-none text-orange-700/[0.06]"
      >
        ✦
      </span>

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-20 md:py-28 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-5">
          <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
          Join the list
        </p>
        <h2
          id="newsletter-heading"
          className="font-serif text-3xl md:text-5xl tracking-tight text-neutral-900 leading-[1.1]"
        >
          Be the first to see what's <em className="italic text-orange-700">next</em>.
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-neutral-600 text-base leading-relaxed">
          New collections, private previews, and the occasional dispatch from the studio. No spam —
          just things worth opening.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Newsletter signup"
          className="mt-10 max-w-xl mx-auto"
        >
          <div
            className={`flex items-stretch border-b-2 transition-colors ${
              status === "error"
                ? "border-red-500"
                : "border-neutral-300 focus-within:border-neutral-900"
            }`}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              disabled={status === "submitting" || status === "success"}
              placeholder="your@email.com"
              aria-invalid={status === "error"}
              aria-describedby="newsletter-msg"
              className="flex-1 bg-transparent py-4 text-base md:text-lg text-neutral-900 placeholder-neutral-400 outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="ml-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-900 font-medium px-2 hover:gap-3 transition-all disabled:opacity-50 focus:outline-none focus-visible:underline underline-offset-4"
            >
              {status === "success" ? (
                <>
                  Subscribed <Check size={16} aria-hidden="true" />
                </>
              ) : status === "submitting" ? (
                "Joining…"
              ) : (
                <>
                  Subscribe <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          <p
            id="newsletter-msg"
            role={status === "error" ? "alert" : "status"}
            className={`mt-3 text-xs min-h-[1rem] ${
              status === "error"
                ? "text-red-600"
                : status === "success"
                ? "text-emerald-700"
                : "text-neutral-500"
            }`}
          >
            {status === "error"
              ? errorMsg
              : status === "success"
              ? "Welcome — your first dispatch is on its way."
              : "By subscribing, you agree to our Privacy Policy. Unsubscribe anytime."}
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;