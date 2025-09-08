'use client';
import React, { useState } from "react";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { assets } from '@/assets/assets';

const AGE_OPTIONS = [
  { label: "Select Age", value: "" },
  { label: "2-4 years", value: "2-4" },
  { label: "5-7 years", value: "5-7" },
  { label: "8-10 years", value: "8-10" },
  { label: "11-13 years", value: "11-13" },
  { label: "14-17 years", value: "14-17" },
  { label: "18-25 years", value: "18-25" },
  { label: "26-35 years", value: "26-35" },
  { label: "36-50 years", value: "36-50" },
  { label: "51+ years", value: "51+" },
];

const BODY_SIZE_OPTIONS = [
  { label: "Select Body Size", value: "" },
  { label: "Slim", value: "slim" },
  { label: "Average", value: "average" },
  { label: "Big", value: "big" },
  { label: "Fat", value: "fat" },
  { label: "Athletic", value: "athletic" },
  { label: "Petite", value: "petite" },
];

const SIZE_GUIDE = {
  "2-4":    { slim: "XS (Kids)", average: "S (Kids)", big: "M (Kids)", fat: "L (Kids)", athletic: "S (Kids)", petite: "XS (Kids)" },
  "5-7":    { slim: "S (Kids)", average: "M (Kids)", big: "L (Kids)", fat: "XL (Kids)", athletic: "M (Kids)", petite: "S (Kids)" },
  "8-10":   { slim: "M (Kids)", average: "L (Kids)", big: "XL (Kids)", fat: "XXL (Kids)", athletic: "L (Kids)", petite: "M (Kids)" },
  "11-13":  { slim: "XS", average: "S", big: "M", fat: "L", athletic: "S", petite: "XS" },
  "14-17":  { slim: "S", average: "M", big: "L", fat: "XL", athletic: "M", petite: "S" },
  "18-25":  { slim: "S", average: "M", big: "L", fat: "XL", athletic: "M", petite: "S" },
  "26-35":  { slim: "M", average: "L", big: "XL", fat: "XXL", athletic: "L", petite: "M" },
  "36-50":  { slim: "M", average: "L", big: "XL", fat: "XXL", athletic: "L", petite: "M" },
  "51+":    { slim: "L", average: "XL", big: "XXL", fat: "XXXL", athletic: "XL", petite: "L" },
};

const SizeGuide = () => {
  const [age, setAge] = useState("");
  const [bodySize, setBodySize] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age && bodySize) {
      const size = SIZE_GUIDE[age]?.[bodySize];
      setResult(size ? size : "No size found for this combination.");
    } else {
      setResult("Please select both age and body size.");
    }
  };

  return (
    <>
      <Head>
        <title>Size Guide | Unice Stitches</title>
      </Head>
      <Navbar />
      <div className="bg-white w-full min-h-screen flex flex-col items-center">
        {/* Hero Section with background image */}
        <div
          className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${assets.hero1?.src || ""})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
          <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white bg-black bg-opacity-60 px-8 py-4 rounded-lg animate-fade-in">
            Size Guide
          </h1>
        </div>
        {/* Size Guide Form */}
        <div className="max-w-3xl w-full px-6 md:px-0 mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 tracking-wide">
            Find Your Perfect Fit
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Size Guide Form */}
            <form
              className="md:w-1/2 flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow"
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-semibold mb-2">Simulate Your Size</h3>
              <label className="block mb-1 font-medium text-gray-700">Age Group</label>
              <select
                className="w-full border rounded px-3 py-2 mb-2"
                value={age}
                onChange={e => setAge(e.target.value)}
                required
              >
                {AGE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <label className="block mb-1 font-medium text-gray-700">Body Size</label>
              <select
                className="w-full border rounded px-3 py-2 mb-2"
                value={bodySize}
                onChange={e => setBodySize(e.target.value)}
                required
              >
                {BODY_SIZE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-orange-600 text-white rounded-full py-2 font-semibold hover:bg-orange-700 transition"
              >
                Show My Size
              </button>
              {result && (
                <div className="mt-6 text-center">
                  <h2 className="text-xl font-semibold mb-2 text-orange-700">Recommended Size:</h2>
                  <div className="text-2xl font-bold text-gray-800">{result}</div>
                </div>
              )}
            </form>
            {/* Size Guide Info */}
            <div className="md:w-1/2 flex flex-col gap-6 justify-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">How our size guide works</h3>
                <ul className="list-disc pl-5 text-gray-700 text-sm">
                  <li>Recommendations are based on typical body measurements for each age and body type.</li>
                  <li>If you are between sizes, we recommend choosing the larger size for comfort.</li>
                  <li>For custom measurements, please contact our support team.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:support@unicestitches.com" className="underline">support@unicestitches.com</a>
                </p>
                <p className="text-gray-700">
                  Phone: <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a>
                </p>
                <p className="text-gray-700">
                  Our team is happy to assist you with sizing or custom orders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SizeGuide;