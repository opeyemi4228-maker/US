'use client'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import Head from 'next/head';
import { assets } from "@/assets/assets";
import Image from 'next/image';

const About = () => {
  return (
    <>
      <Head>
        <title>Unice Stitches</title>
      </Head>
      <Navbar />
      <div className="bg-white w-full min-h-screen flex flex-col items-center">
        {/* Hero Section with asset image */}
        <div className="w-full h-[350px] md:h-[500px] relative flex items-center justify-center transition-all duration-700">
          <Image
            src={assets.hero}
            alt="Unice Stitches Hero"
            fill
            priority
            className="object-cover"
            style={{ zIndex: 1 }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white bg-black bg-opacity-40 px-8 py-4 rounded-lg animate-fade-in">
              About Unice Stitches
            </h1>
          </div>
        </div>
        {/* Content Section with fade-in motion */}
        <div className="max-w-4xl w-full px-6 md:px-0 mx-auto py-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 tracking-wide">
            Our Story
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6">
            Welcome to Unice Stitches, your number one source for all things fashion. We're dedicated to providing you the very best of clothing, with an emphasis on quality, affordability, and style.
          </p>
          <p className="text-lg text-gray-700 text-center mb-6">
            Founded in 2023 by Unice, Unice Stitches has come a long way from its beginnings. When Unice first started out, her passion for fashion and desire to create unique, stylish clothing drove her to start her own business.
          </p>
          <p className="text-lg text-gray-700 text-center mb-6">
            We hope you enjoy our products as much as we enjoy offering them to you.
          </p>
          <h3 className="text-2xl font-semibold text-center mt-12 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 text-center mb-8">
            At Unice Stitches, our mission is to empower individuals to express their unique style through high-quality, affordable, and fashionable clothing. We strive to inspire confidence and creativity in every customer by offering thoughtfully designed pieces that blend comfort, elegance, and innovation. Our commitment is to foster a vibrant fashion community where everyone feels valued and inspired to embrace their personal journey.
          </p>
          <div className="flex justify-center mt-10 animate-fade-in-up">
            {/* Example: Import and show another asset image */}
            <Image
              src={assets.logo}
              alt="Unice Stitches Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
      <Footer />
      {/* Motion CSS */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </>
  );
};

export default About;