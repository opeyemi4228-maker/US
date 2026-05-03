"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";

const linkColumns = [
  {
    heading: "Customer Care",
    links: [
      { label: "Contact Us", href: "/ContactUs" },
      { label: "Size Guide", href: "/SizeGuide" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Personalization", href: "/Personalization" },
      { label: "Book an Appointment", href: "/appointments" },
    ],
  },
  {
    heading: "The Company",
    links: [
      { label: "About Us", href: "/About" },
      { label: "Contact Us", href: "/ContactUs" },

    ],
  },
];

const socials = [
  { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

const Footer = () => {
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
      // Replace with your real endpoint:
      // await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email: trimmed }) });
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Top: brand + newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block group">
              <span className="block font-serif text-3xl md:text-4xl tracking-tight text-white">
                Unice <em className="italic text-orange-400/90">Stitches</em>
              </span>
              <span className="block mt-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
                Tailored in Lagos · Worn worldwide
              </span>
            </Link>
            <p className="mt-6 text-sm leading-relaxed text-white/70 max-w-md">
              Garments built to outlast the season. Every stitch is intentional, every silhouette
              considered — designed for the modern wearer who values craft over noise.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-white/10">
            <p className="text-[11px] uppercase tracking-[0.25em] text-orange-400/90 mb-3">
              The Newsletter
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-white leading-snug max-w-lg">
              Front-row access to new releases, private sales, and the stories behind each piece.
            </h3>

            <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-md" aria-label="Newsletter signup">
              <div
                className={`flex items-center border-b transition-colors ${
                  status === "error"
                    ? "border-red-400"
                    : "border-white/30 focus-within:border-white"
                }`}
              >
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
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
                  aria-describedby="footer-newsletter-msg"
                  className="flex-1 bg-transparent py-3 text-sm text-white placeholder-white/40 outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="ml-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white py-3 px-2 hover:gap-3 transition-all disabled:opacity-50 focus:outline-none focus-visible:underline underline-offset-4"
                >
                  {status === "success" ? (
                    <>
                      Subscribed <Check size={14} />
                    </>
                  ) : status === "submitting" ? (
                    "Joining…"
                  ) : (
                    <>
                      Subscribe <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
              <p
                id="footer-newsletter-msg"
                role={status === "error" ? "alert" : "status"}
                className={`mt-3 text-xs min-h-[1rem] ${
                  status === "error"
                    ? "text-red-400"
                    : status === "success"
                    ? "text-emerald-400"
                    : "text-white/40"
                }`}
              >
                {status === "error"
                  ? errorMsg
                  : status === "success"
                  ? "Welcome aboard. Check your inbox to confirm."
                  : "By subscribing, you agree to our Privacy Policy. Unsubscribe anytime."}
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Middle: link columns + contact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {linkColumns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/80 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      {l.label}
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-5">
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:18774822430"
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Phone size={15} className="mt-0.5 text-white/40 shrink-0" aria-hidden="true" />
                  <span>1-877-482-2430</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@unicestitches.com"
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors break-all"
                >
                  <Mail size={15} className="mt-0.5 text-white/40 shrink-0" aria-hidden="true" />
                  <span>hello@unicestitches.com</span>
                </a>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="flex items-start gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <MapPin size={15} className="mt-0.5 text-white/40 shrink-0" aria-hidden="true" />
                  <span>Find a store near you</span>
                </Link>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/50 mb-3">
                Follow
              </p>
              <ul className="flex items-center gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex w-9 h-9 items-center justify-center rounded-full ring-1 ring-white/15 text-white/70 hover:text-white hover:ring-white/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-xs text-white/50">
          <p>© {year} Unice Stitches. All rights reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <li>
              <Link href="/Privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;