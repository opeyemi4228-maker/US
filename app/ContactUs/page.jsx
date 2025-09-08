import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import { assets } from '@/assets/assets';

const ContactUs = () => {
  return (
    <>
      <Head>
        <title>Contact Us | Unice Stitches</title>
      </Head>
      <Navbar />
      <div className="bg-white w-full min-h-screen flex flex-col items-center">
        {/* Hero Section with background image */}
        <div
          className="w-full h-[300px] md:h-[400px] flex items-center justify-center relative"
          style={{
            backgroundImage: `url(${assets.hero1.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
          <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-white  bg-black bg-opacity-60 px-8 py-4 rounded-lg animate-fade-in">
            Contact Us
          </h1>
        </div>
        {/* Contact Info & Form */}
        <div className="max-w-3xl w-full px-6 md:px-0 mx-auto py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 tracking-wide">
            We're Here to Help
          </h2>
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Details */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Service</h3>
                <p className="text-gray-700">Email: <a href="mailto:support@unicestitches.com" className="underline">support@unicestitches.com</a></p>
                <p className="text-gray-700">Phone: <a href="tel:+1234567890" className="underline">+1 (234) 567-890</a></p>
                <p className="text-gray-700">Hours: Mon-Fri, 9am - 6pm</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Store Address</h3>
                <p className="text-gray-700">123 Fashion Avenue, Suite 100<br />New York, NY 10001</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                <div className="flex gap-4 mt-2">
                  <a href="https://facebook.com/unicestitches" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Facebook</a>
                  <a href="https://instagram.com/unicestitches" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">Instagram</a>
                  <a href="https://twitter.com/unicestitches" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <form className="md:w-1/2 flex flex-col gap-4 bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Send Us a Message</h3>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="border-b py-2 px-2 outline-none bg-transparent"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="border-b py-2 px-2 outline-none bg-transparent"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone (optional)"
                className="border-b py-2 px-2 outline-none bg-transparent"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                className="border-b py-2 px-2 outline-none bg-transparent resize-none"
                required
              />
              <button
                type="submit"
                className="bg-black text-white py-2 rounded mt-2 font-medium hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
          {/* Additional Info */}
          <div className="mt-12 text-center text-gray-600">
            <p>
              For press inquiries, partnership opportunities, or wholesale requests, please email <a href="mailto:info@unicestitches.com" className="underline">info@unicestitches.com</a>.
            </p>
            <p className="mt-4">
              We aim to respond to all messages within 24 hours. Thank you for reaching out to Unice Stitches!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;