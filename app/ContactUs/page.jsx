"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { assets } from "@/assets/assets";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "general",
  message: "",
};

const SUBJECTS = [
  { value: "general", label: "General Inquiry" },
  { value: "order", label: "Order Support" },
  { value: "wholesale", label: "Wholesale & Partnerships" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
];

const ContactUs = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitMsg, setSubmitMsg] = useState("");

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Please enter a valid email.";
    }
    if (!form.message.trim()) {
      e.message = "Please add a message.";
    } else if (form.message.trim().length < 10) {
      e.message = "Message is too short — give us a bit more detail.";
    }
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitMsg("");
    const e1 = validate();
    if (Object.keys(e1).length) {
      setErrors(e1);
      setStatus("error");
      setSubmitMsg("Please fix the highlighted fields.");
      return;
    }
    setStatus("submitting");
    try {
      // Replace with your real endpoint:
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setSubmitMsg("Thank you — we'll be in touch within 24 hours.");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setSubmitMsg("Something went wrong. Please try again or email us directly.");
    }
  };

  const fieldCls = (hasError) =>
    `w-full bg-transparent border-b py-3 text-base text-neutral-900 placeholder-neutral-400 outline-none transition-colors ${
      hasError
        ? "border-red-400 focus:border-red-500"
        : "border-neutral-300 focus:border-neutral-900"
    }`;

  return (
    <>
      <PageHeader
        eyebrow="We're listening"
        title={
          <>
            Get in <em className="italic font-normal text-orange-300">touch</em>
          </>
        }
        description="Questions about a piece, an order, a partnership? Drop us a line — a real person reads every message."
        image={assets.hero1 ?? assets.hero}
      />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <aside className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
              The studio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-900 leading-[1.15] mb-10">
              Reach us directly, or send a note — we&apos;ll be in your inbox within a day.
            </h2>

            <ul className="space-y-7">
              <li className="flex gap-4">
                <span className="shrink-0 mt-1 w-9 h-9 inline-flex items-center justify-center rounded-full bg-stone-100 text-neutral-900">
                  <Mail size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:hello@unicestitches.com"
                    className="text-neutral-900 hover:text-orange-700 transition-colors"
                  >
                    hello@unicestitches.com
                  </a>
                  <p className="text-sm text-neutral-500 mt-1">
                    For press: <a href="mailto:press@unicestitches.com" className="underline underline-offset-2">press@unicestitches.com</a>
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="shrink-0 mt-1 w-9 h-9 inline-flex items-center justify-center rounded-full bg-stone-100 text-neutral-900">
                  <Phone size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:+12345678900"
                    className="text-neutral-900 hover:text-orange-700 transition-colors"
                  >
                    +1 (234) 567-8900
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="shrink-0 mt-1 w-9 h-9 inline-flex items-center justify-center rounded-full bg-stone-100 text-neutral-900">
                  <MapPin size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                    Studio
                  </p>
                  <p className="text-neutral-900">
                    123 Fashion Avenue, Suite 100
                    <br />
                    New York, NY 10001
                  </p>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="shrink-0 mt-1 w-9 h-9 inline-flex items-center justify-center rounded-full bg-stone-100 text-neutral-900">
                  <Clock size={16} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-1">
                    Hours
                  </p>
                  <p className="text-neutral-900">Mon – Fri, 9am – 6pm ET</p>
                  <p className="text-sm text-neutral-500 mt-1">
                    We respond to messages within 24 hours.
                  </p>
                </div>
              </li>
            </ul>
          </aside>

          <div className="lg:col-span-7 lg:pl-12 lg:border-l lg:border-neutral-200">
            <form onSubmit={onSubmit} noValidate aria-label="Contact form">
              <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-4">
                Send a message
              </p>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tight text-neutral-900 mb-10">
                Tell us what you need.
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                <div className="md:col-span-1">
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    className={fieldCls(!!errors.name)}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-err" role="alert" className="mt-2 text-xs text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    className={fieldCls(!!errors.email)}
                    placeholder="you@email.com"
                  />
                  {errors.email && (
                    <p id="email-err" role="alert" className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    className={fieldCls(false)}
                    placeholder="+1 (___) ___-____"
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={update("subject")}
                    className={`${fieldCls(false)} cursor-pointer`}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "msg-err" : undefined}
                    className={`${fieldCls(!!errors.message)} resize-none`}
                    placeholder="How can we help?"
                  />
                  {errors.message && (
                    <p id="msg-err" role="alert" className="mt-2 text-xs text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="inline-flex items-center justify-center gap-3 bg-neutral-950 text-white px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-orange-700 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed group focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                >
                  {status === "success" ? (
                    <>
                      Message sent <Check size={16} aria-hidden="true" />
                    </>
                  ) : status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      Send message
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p
                  role={status === "error" ? "alert" : "status"}
                  className={`text-sm ${
                    status === "error"
                      ? "text-red-600"
                      : status === "success"
                      ? "text-emerald-700"
                      : "text-neutral-500"
                  }`}
                >
                  {submitMsg || "Required fields are marked with an asterisk."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactUs;