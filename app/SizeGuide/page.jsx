"use client";
import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Ruler, Mail, Phone, Sparkles } from "lucide-react";

const AGE_OPTIONS = [
  { label: "Select age range", value: "" },
  { label: "2 – 4 years", value: "2-4" },
  { label: "5 – 7 years", value: "5-7" },
  { label: "8 – 10 years", value: "8-10" },
  { label: "11 – 13 years", value: "11-13" },
  { label: "14 – 17 years", value: "14-17" },
  { label: "18 – 25 years", value: "18-25" },
  { label: "26 – 35 years", value: "26-35" },
  { label: "36 – 50 years", value: "36-50" },
  { label: "51+ years", value: "51+" },
];

const BODY_SIZE_OPTIONS = [
  { label: "Select build", value: "" },
  { label: "Slim", value: "slim" },
  { label: "Average", value: "average" },
  { label: "Athletic", value: "athletic" },
  { label: "Petite", value: "petite" },
  { label: "Fuller", value: "big" },
  { label: "Plus", value: "fat" },
];

const SIZE_GUIDE = {
  "2-4": { slim: "XS (Kids)", average: "S (Kids)", big: "M (Kids)", fat: "L (Kids)", athletic: "S (Kids)", petite: "XS (Kids)" },
  "5-7": { slim: "S (Kids)", average: "M (Kids)", big: "L (Kids)", fat: "XL (Kids)", athletic: "M (Kids)", petite: "S (Kids)" },
  "8-10": { slim: "M (Kids)", average: "L (Kids)", big: "XL (Kids)", fat: "XXL (Kids)", athletic: "L (Kids)", petite: "M (Kids)" },
  "11-13": { slim: "XS", average: "S", big: "M", fat: "L", athletic: "S", petite: "XS" },
  "14-17": { slim: "S", average: "M", big: "L", fat: "XL", athletic: "M", petite: "S" },
  "18-25": { slim: "S", average: "M", big: "L", fat: "XL", athletic: "M", petite: "S" },
  "26-35": { slim: "M", average: "L", big: "XL", fat: "XXL", athletic: "L", petite: "M" },
  "36-50": { slim: "M", average: "L", big: "XL", fat: "XXL", athletic: "L", petite: "M" },
  "51+": { slim: "L", average: "XL", big: "XXL", fat: "XXXL", athletic: "XL", petite: "L" },
};

const MEASUREMENTS = [
  { size: "XS", chest: "82–86", waist: "62–66", hips: "88–92" },
  { size: "S", chest: "86–90", waist: "66–70", hips: "92–96" },
  { size: "M", chest: "90–94", waist: "70–74", hips: "96–100" },
  { size: "L", chest: "94–100", waist: "74–80", hips: "100–106" },
  { size: "XL", chest: "100–108", waist: "80–88", hips: "106–114" },
  { size: "XXL", chest: "108–116", waist: "88–96", hips: "114–122" },
];

const SizeGuide = () => {
  const [age, setAge] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [unit, setUnit] = useState("cm");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!age || !bodySize) {
      setError("Please select both age and build to see your size.");
      return;
    }
    const size = SIZE_GUIDE[age]?.[bodySize];
    if (size) {
      setResult({ size, age, bodySize });
    } else {
      setError("No match for that combination. Try our support team for help.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Size & fit"
        title={
          <>
            Find your <em className="italic font-normal text-orange-700">perfect</em> fit
          </>
        }
        description="Two questions, one answer. Or check the full measurement chart below if you prefer to size yourself manually."
        height="md"
      />

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Calculator */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              aria-label="Size calculator"
              className="rounded-2xl bg-neutral-50 p-6 sm:p-10 ring-1 ring-neutral-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-neutral-950 text-white">
                  <Ruler size={16} aria-hidden="true" />
                </span>
                <h2 className="font-serif text-2xl text-neutral-900">Size calculator</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="age" className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Age range
                  </label>
                  <select
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 outline-none focus:border-neutral-900 transition cursor-pointer"
                    required
                  >
                    {AGE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="build" className="block text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Build
                  </label>
                  <select
                    id="build"
                    value={bodySize}
                    onChange={(e) => setBodySize(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-lg px-4 py-3 text-neutral-900 outline-none focus:border-neutral-900 transition cursor-pointer"
                    required
                  >
                    {BODY_SIZE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto mt-6 inline-flex items-center justify-center gap-2 bg-neutral-950 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium hover:bg-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
              >
                <Sparkles size={14} aria-hidden="true" />
                Show my size
              </button>

              {error && (
                <p role="alert" className="mt-4 text-sm text-red-600">
                  {error}
                </p>
              )}

              {result && (
                <div
                  role="status"
                  className="mt-8 rounded-xl bg-white ring-1 ring-orange-200 p-6 text-center"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
                    Your recommended size
                  </p>
                  <p className="font-serif text-5xl md:text-6xl text-neutral-900 leading-none">
                    {result.size}
                  </p>
                  <p className="mt-3 text-sm text-neutral-600">
                    Based on age {result.age} · {result.bodySize} build
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Fit notes */}
          <aside className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
                <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
                How this works
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-neutral-900 leading-tight">
                A starting point — not a verdict.
              </h2>
            </div>
            <ul className="space-y-4 text-neutral-700 text-sm leading-relaxed">
              <li className="flex gap-3">
                <span className="font-serif text-orange-700 text-xl leading-none mt-0.5">·</span>
                Recommendations are based on typical body measurements for each age and build.
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-orange-700 text-xl leading-none mt-0.5">·</span>
                Between sizes? We recommend going up for outerwear, down for fitted pieces.
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-orange-700 text-xl leading-none mt-0.5">·</span>
                Each product page lists garment-specific measurements — always check before ordering.
              </li>
              <li className="flex gap-3">
                <span className="font-serif text-orange-700 text-xl leading-none mt-0.5">·</span>
                Custom measurements available — reach out below.
              </li>
            </ul>

            <div className="pt-6 border-t border-neutral-200">
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Need a hand?</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="mailto:support@unicestitches.com"
                    className="inline-flex items-center gap-2 text-neutral-900 hover:text-orange-700 transition-colors"
                  >
                    <Mail size={14} aria-hidden="true" />
                    support@unicestitches.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12345678900"
                    className="inline-flex items-center gap-2 text-neutral-900 hover:text-orange-700 transition-colors"
                  >
                    <Phone size={14} aria-hidden="true" />
                    +1 (234) 567-8900
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Reference chart */}
        <section aria-labelledby="chart-heading" className="mt-20 md:mt-24 pt-14 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
                <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
                Reference
              </p>
              <h2 id="chart-heading" className="font-serif text-2xl md:text-3xl text-neutral-900">
                Measurement chart
              </h2>
            </div>
            <div role="radiogroup" aria-label="Unit" className="inline-flex ring-1 ring-neutral-200 rounded-full p-1">
              {["cm", "in"].map((u) => (
                <button
                  key={u}
                  role="radio"
                  aria-checked={unit === u}
                  onClick={() => setUnit(u)}
                  className={`text-xs uppercase tracking-[0.18em] px-4 py-1.5 rounded-full transition-colors ${
                    unit === u ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl ring-1 ring-neutral-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 text-left text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  <th className="px-5 py-4 font-medium">Size</th>
                  <th className="px-5 py-4 font-medium">Chest</th>
                  <th className="px-5 py-4 font-medium">Waist</th>
                  <th className="px-5 py-4 font-medium">Hips</th>
                </tr>
              </thead>
              <tbody>
                {MEASUREMENTS.map((m) => (
                  <tr key={m.size} className="border-t border-neutral-100">
                    <td className="px-5 py-4 font-medium text-neutral-900">{m.size}</td>
                    <td className="px-5 py-4 text-neutral-700">{m.chest} {unit}</td>
                    <td className="px-5 py-4 text-neutral-700">{m.waist} {unit}</td>
                    <td className="px-5 py-4 text-neutral-700">{m.hips} {unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            All measurements taken with a soft tape, with the body relaxed. If you're between values, size up.
          </p>
        </section>
      </main>
    </>
  );
};

export default SizeGuide;