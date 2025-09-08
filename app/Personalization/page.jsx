'use client';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { assets } from '@/assets/assets';

// Google Sheets Script Web App URL (replace with your deployed script URL)
const GOOGLE_SCRIPT_URL = "https://docs.google.com/spreadsheets/d/1_O4J0l9fw5NZDG0J26MaWStcP4MTgOQngWl2m3rWwOg/edit?usp=sharing";
// You must deploy a Google Apps Script Web App that writes to your sheet and allows POST requests.

const Personalization = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    garmentType: "",
    color: "",
    measurements: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSubmitted(false);

    // Send data to Google Sheets via Apps Script Web App
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          garmentType: "",
          color: "",
          measurements: "",
          notes: "",
        });
      } else {
        setError("Failed to submit. Please try again later.");
      }
    } catch (err) {
      setError("Failed to submit. Please check your connection.");
    }
  };

  return (
    <>
      <Head>
        <title>Personalization | Unice Stitches</title>
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
            Personalization
          </h1>
        </div>
        {/* Personalization Info & Form */}
        <div className="max-w-3xl w-full px-6 md:px-0 mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 tracking-wide">
            Make It Yours – Personalize Your Unice Stitches Garment
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Info Section */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">How Personalization Works</h3>
                <ul className="list-disc pl-5 text-gray-700 text-sm">
                  <li>Choose your garment type and preferred color.</li>
                  <li>Provide your measurements for a perfect fit.</li>
                  <li>Add any special requests or notes (e.g. embroidery, sleeve length, etc).</li>
                  <li>Our team will contact you to confirm your order and details.</li>
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
                  Our team is happy to assist you with your custom order.
                </p>
              </div>
            </div>
            {/* Personalization Form */}
            <form
              className="md:w-1/2 flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow"
              onSubmit={handleSubmit}
            >
              <h3 className="text-lg font-semibold mb-2">Personalize Your Order</h3>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={form.phone}
                onChange={handleChange}
              />
              <select
                name="garmentType"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={form.garmentType}
                onChange={handleChange}
                required
              >
                <option value="">Select Garment Type</option>
                <option value="agbada">Agbada</option>
                <option value="kaftan">Kaftan</option>
                <option value="senator">Senator</option>
                <option value="dress">Dress</option>
                <option value="shirt">Shirt</option>
                <option value="skirt">Skirt</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="color"
                placeholder="Preferred Color"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={form.color}
                onChange={handleChange}
                required
              />
              <textarea
                name="measurements"
                placeholder="Your Measurements (e.g. Chest, Waist, Hips, Height)"
                rows={2}
                className="border-b py-2 px-2 outline-none bg-transparent resize-none"
                value={form.measurements}
                onChange={handleChange}
                required
              />
              <textarea
                name="notes"
                placeholder="Special Requests / Notes (optional)"
                rows={2}
                className="border-b py-2 px-2 outline-none bg-transparent resize-none"
                value={form.notes}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-orange-600 text-white py-2 rounded mt-2 font-medium hover:bg-orange-700 transition"
                disabled={submitted}
              >
                {submitted ? "Submitted!" : "Submit Personalization"}
              </button>
              {error && (
                <div className="text-red-600 text-center mt-2 font-semibold">
                  {error}
                </div>
              )}
              {submitted && (
                <div className="text-green-600 text-center mt-2 font-semibold">
                  Thank you! We have received your personalization request.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Personalization;

