'use client';
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { assets } from '@/assets/assets';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulate tracking lookup
  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    setTracking(null);
    setTimeout(() => {
      // Simulated result
      setTracking({
        status: "In Transit",
        steps: [
          { label: "Order Placed", date: "2025-09-01", done: true },
          { label: "Order Processed", date: "2025-09-02", done: true },
          { label: "Shipped", date: "2025-09-03", done: true },
          { label: "In Transit", date: "2025-09-04", done: true },
          { label: "Out for Delivery", date: null, done: false },
          { label: "Delivered", date: null, done: false },
        ],
        expected: "2025-09-08",
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Track Order | Unice Stitches</title>
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
            Track Your Order
          </h1>
        </div>
        {/* Track Order Form */}
        <div className="max-w-3xl w-full px-6 md:px-0 mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 tracking-wide">
            Enter your Order ID and Email to track your order status
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Tracking Form */}
            <form
              className="md:w-1/2 flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow"
              onSubmit={handleTrack}
            >
              <h3 className="text-lg font-semibold mb-2">Track Order</h3>
              <input
                type="text"
                name="orderId"
                placeholder="Order ID"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border-b py-2 px-2 outline-none bg-transparent"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white py-2 rounded mt-2 font-medium hover:bg-gray-800 transition"
                disabled={loading}
              >
                {loading ? "Tracking..." : "Track Order"}
              </button>
              {tracking && (
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-2 text-orange-700">Order Status: {tracking.status}</h4>
                  <ul className="mb-2">
                    {tracking.steps.map((step, idx) => (
                      <li key={idx} className={`flex items-center gap-2 mb-1 ${step.done ? "text-green-700" : "text-gray-500"}`}>
                        <span className={`inline-block w-3 h-3 rounded-full ${step.done ? "bg-green-500" : "bg-gray-300"}`}></span>
                        <span>{step.label}</span>
                        {step.date && <span className="text-xs text-gray-400 ml-2">{step.date}</span>}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-700">
                    Expected Delivery: <span className="font-semibold">{tracking.expected}</span>
                  </div>
                </div>
              )}
            </form>
            {/* Info Section */}
            <div className="md:w-1/2 flex flex-col gap-6 justify-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-700">
                  Email: <a href="mailto:support@unicestitches.com" className="underline">support@unicestitches.com</a>
                </p>
                <p className="text-gray-700">
                  Phone: <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a>
                </p>
                <p className="text-gray-700">
                  Our team is happy to assist you with your order status or delivery questions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Tracking Tips</h3>
                <ul className="list-disc pl-5 text-gray-700 text-sm">
                  <li>Order ID can be found in your confirmation email.</li>
                  <li>Tracking updates may take up to 24 hours after shipping.</li>
                  <li>Contact us if you have not received your order by the expected date.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackOrder;