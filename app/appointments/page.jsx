"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { Calendar, Clock, MapPin, CheckCircle, ChevronRight } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: "consultation",
    label: "Style Consultation",
    duration: "45 min",
    price: "Free",
    description: "Discuss your vision, fabric options, and design direction with our lead tailor.",
  },
  {
    id: "fitting",
    label: "Custom Fitting",
    duration: "60 min",
    price: "$30",
    description:
      "Full-body measurement session. We capture every detail for a garment that's truly yours.",
  },
  {
    id: "alteration",
    label: "Alteration Review",
    duration: "30 min",
    price: "$20",
    description:
      "Bring your existing piece. Our tailors assess and advise on the perfect alterations.",
  },
  {
    id: "collection",
    label: "Collection Preview",
    duration: "45 min",
    price: "Free",
    description: "Private in-studio walkthrough of the current and upcoming Unice Stitches season.",
  },
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

const LOCATIONS = [
  { id: "lagos", label: "Lagos Atelier", address: "14 Bode Thomas Street, Surulere, Lagos" },
  { id: "virtual", label: "Virtual (Google Meet)", address: "Link sent after booking" },
];

/* ─── Step indicator ──────────────────────────────────────── */
const Steps = ({ current }) => {
  const steps = ["Service", "Date & Time", "Details", "Confirm"];
  return (
    <nav aria-label="Booking progress" className="mb-10 md:mb-14">
      <ol className="flex items-center justify-center gap-0">
        {steps.map((label, i) => {
          const idx = i + 1;
          const done = current > idx;
          const active = current === idx;
          return (
            <React.Fragment key={label}>
              <li className="flex flex-col items-center gap-1.5">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${done ? "bg-orange-600 text-white" : active ? "bg-neutral-900 text-white ring-4 ring-neutral-900/10" : "bg-neutral-100 text-neutral-400"}`}
                >
                  {done ? <CheckCircle size={16} /> : idx}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.15em] hidden sm:block ${active ? "text-neutral-900 font-semibold" : "text-neutral-400"}`}
                >
                  {label}
                </span>
              </li>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 max-w-[60px] h-px mx-1 transition-colors duration-300 ${done ? "bg-orange-600" : "bg-neutral-200"}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

/* ─── Step 1: Service ─────────────────────────────────────── */
const StepService = ({ selected, onSelect }) => (
  <div className="space-y-4">
    <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-6">
      Choose a <em className="italic text-orange-700">service</em>
    </h2>
    {SERVICES.map((s) => (
      <button
        key={s.id}
        onClick={() => onSelect(s.id)}
        className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
          ${selected === s.id
            ? "border-orange-600 bg-orange-50"
            : "border-neutral-100 bg-white hover:border-orange-200 hover:bg-orange-50/40"
          }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-neutral-900">{s.label}</p>
            <p className="text-sm text-neutral-500 mt-1 leading-relaxed">{s.description}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="text-sm font-semibold text-orange-600">{s.price}</span>
            <p className="text-xs text-neutral-400 mt-0.5">{s.duration}</p>
          </div>
        </div>
      </button>
    ))}
  </div>
);

/* ─── Step 2: Date & Time ─────────────────────────────────── */
const StepDateTime = ({ date, time, location, onChange }) => {
  // Generate next 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    // Skip Sundays
    if (d.getDay() === 0) return null;
    return d;
  }).filter(Boolean);

  const fmt = (d) =>
    d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
        Pick a <em className="italic text-orange-700">date & time</em>
      </h2>

      {/* Location */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">Location</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onChange("location", loc.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all
                ${location === loc.id ? "border-orange-600 bg-orange-50" : "border-neutral-100 bg-white hover:border-orange-200"}`}
            >
              <p className="font-medium text-sm text-neutral-900">{loc.label}</p>
              <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1">
                <MapPin size={10} />
                {loc.address}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">Date</p>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {days.map((d) => {
            const iso = d.toISOString().split("T")[0];
            const sel = date === iso;
            return (
              <button
                key={iso}
                onClick={() => onChange("date", iso)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 text-center transition-all
                  ${sel ? "border-orange-600 bg-orange-600 text-white" : "border-neutral-100 bg-white hover:border-orange-300 text-neutral-700"}`}
              >
                <span className="text-[10px] uppercase tracking-wide opacity-70">
                  {fmt(d).split(" ")[0]}
                </span>
                <span className="text-lg font-semibold leading-tight">{d.getDate()}</span>
                <span className="text-[10px] opacity-70">{fmt(d).split(" ")[2]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-3">Time</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              onClick={() => onChange("time", t)}
              className={`py-3 rounded-xl text-sm font-medium border-2 transition-all
                ${time === t ? "border-orange-600 bg-orange-600 text-white" : "border-neutral-100 bg-white hover:border-orange-300 text-neutral-700"}`}
            >
              <Clock size={12} className="inline mr-1.5 opacity-60" />
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Step 3: Personal Details ────────────────────────────── */
const StepDetails = ({ form, onChange }) => (
  <div className="space-y-6">
    <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
      Your <em className="italic text-orange-700">details</em>
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {[
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        { name: "email", label: "Email Address", type: "email", required: true, full: true },
        { name: "phone", label: "Phone Number", type: "tel", required: false },
      ].map(({ name, label, type, required, full }) => (
        <div key={name} className={full ? "sm:col-span-2" : ""}>
          <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
            {label}{required && <span className="text-orange-600 ml-0.5">*</span>}
          </label>
          <input
            type={type}
            name={name}
            value={form[name] || ""}
            onChange={(e) => onChange(name, e.target.value)}
            required={required}
            className="w-full bg-white border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-orange-400 transition-colors"
            placeholder={label}
          />
        </div>
      ))}
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
        Additional Notes
      </label>
      <textarea
        name="notes"
        value={form.notes || ""}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={3}
        placeholder="Share anything you'd like us to know before the appointment…"
        className="w-full bg-white border-2 border-neutral-100 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-orange-400 transition-colors resize-none"
      />
    </div>
  </div>
);

/* ─── Step 4: Confirm ─────────────────────────────────────── */
const StepConfirm = ({ booking }) => {
  const service = SERVICES.find((s) => s.id === booking.service);
  const loc = LOCATIONS.find((l) => l.id === booking.location);
  const dateLabel = booking.date
    ? new Date(booking.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const rows = [
    { label: "Service", value: service?.label },
    { label: "Date", value: dateLabel },
    { label: "Time", value: booking.time },
    { label: "Location", value: loc?.label },
    { label: "Duration", value: service?.duration },
    { label: "Name", value: `${booking.firstName} ${booking.lastName}`.trim() },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone || "—" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
        Review your <em className="italic text-orange-700">booking</em>
      </h2>
      <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100">
        {rows.map(({ label, value }, i) => (
          <div
            key={label}
            className={`flex justify-between items-center px-5 py-4 text-sm ${i < rows.length - 1 ? "border-b border-neutral-100" : ""}`}
          >
            <span className="text-neutral-400 text-xs uppercase tracking-[0.15em]">{label}</span>
            <span className="font-medium text-neutral-900 text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>
      {booking.notes && (
        <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-600 border border-neutral-100">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-1">Notes</p>
          {booking.notes}
        </div>
      )}
    </div>
  );
};

/* ─── Success screen ──────────────────────────────────────── */
const Success = ({ booking }) => {
  const service = SERVICES.find((s) => s.id === booking.service);
  return (
    <div className="flex flex-col items-center text-center py-10 gap-6">
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircle size={38} className="text-green-500" />
      </div>
      <div>
        <p className="font-serif text-3xl text-neutral-900 mb-2">
          You&apos;re booked!
        </p>
        <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed text-sm">
          Your <strong>{service?.label}</strong> appointment is confirmed. A confirmation has been sent to{" "}
          <strong>{booking.email}</strong>.
        </p>
      </div>
      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 w-full max-w-sm text-left space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-600 font-semibold mb-3">
          What to expect
        </p>
        {[
          "A confirmation email will arrive shortly.",
          "We'll send a reminder 24 hours before your appointment.",
          "Arrive 5 minutes early to settle in.",
        ].map((t) => (
          <p key={t} className="text-sm text-neutral-700 flex items-start gap-2">
            <ChevronRight size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
            {t}
          </p>
        ))}
      </div>
      <a
        href="/"
        className="text-sm uppercase tracking-[0.2em] text-neutral-600 border-b border-neutral-300 hover:text-orange-600 hover:border-orange-400 transition pb-0.5"
      >
        Return Home
      </a>
    </div>
  );
};

/* ─── Main page ───────────────────────────────────────────── */
const GOOGLE_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPOINTMENT_SCRIPT_URL || "";

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [booking, setBooking] = useState({
    service: "",
    date: "",
    time: "",
    location: "lagos",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const update = (key, val) => setBooking((b) => ({ ...b, [key]: val }));

  const canAdvance = () => {
    if (step === 1) return !!booking.service;
    if (step === 2) return !!(booking.date && booking.time && booking.location);
    if (step === 3) return !!(booking.firstName && booking.lastName && booking.email);
    return true;
  };

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      if (GOOGLE_SCRIPT_URL) {
        const res = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book an Appointment | Unice Stitches</title>
        <meta name="description" content="Book a style consultation or custom fitting at Unice Stitches." />
      </Head>
      <Navbar />

      {/* Hero banner */}
      <div className="bg-neutral-950 text-white py-16 md:py-20 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-orange-400 mb-4">
          <span aria-hidden className="inline-block w-6 h-px bg-orange-400 align-middle mr-2.5" />
          Atelier Appointments
        </p>
        <h1 className="font-serif text-4xl md:text-6xl tracking-tight leading-tight">
          Book a <em className="italic text-orange-400">private session</em>
        </h1>
        <p className="mt-4 text-neutral-400 max-w-md mx-auto text-sm leading-relaxed">
          Step into the studio for a fitting, consultation, or collection preview — entirely tailored to you.
        </p>
      </div>

      {/* Form card */}
      <main className="bg-[#f5f5f5] min-h-screen py-14 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
              <Success booking={booking} />
            </div>
          ) : (
            <>
              <Steps current={step} />

              <div className="bg-white rounded-3xl shadow-sm p-6 md:p-10">
                {step === 1 && (
                  <StepService
                    selected={booking.service}
                    onSelect={(v) => update("service", v)}
                  />
                )}
                {step === 2 && (
                  <StepDateTime
                    date={booking.date}
                    time={booking.time}
                    location={booking.location}
                    onChange={update}
                  />
                )}
                {step === 3 && <StepDetails form={booking} onChange={update} />}
                {step === 4 && <StepConfirm booking={booking} />}

                {error && (
                  <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-100">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="text-sm text-neutral-500 hover:text-orange-600 transition uppercase tracking-[0.15em]"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={handleNext}
                      disabled={!canAdvance()}
                      className="inline-flex items-center gap-2 bg-orange-600 text-white text-sm uppercase tracking-[0.15em] px-8 py-3.5 rounded-full hover:bg-orange-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Continue
                      <ChevronRight size={15} />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="inline-flex items-center gap-2 bg-neutral-950 text-white text-sm uppercase tracking-[0.15em] px-8 py-3.5 rounded-full hover:bg-neutral-800 disabled:opacity-50 transition-all"
                    >
                      {loading ? "Confirming…" : "Confirm Booking"}
                      {!loading && <CheckCircle size={15} />}
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Appointment;