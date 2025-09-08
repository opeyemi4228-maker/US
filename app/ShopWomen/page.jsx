'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { assets } from "@/assets/assets";

const ShopWomen = () => {
  const { products } = useAppContext();

  // Filter products for women (assuming a category property exists)
  const WomenProducts = products.filter(product => product.category === 'Women');

  return (
    <>
      <Navbar />
      {/* Add mt-[300px] to bring the section down by about 300px */}

       <section className="w-full flex flex-col items-center justify-center py-12 px-4 md:px-16 lg:px-32 relative min-h-[350px] md:min-h-[500px] mt-[50px]">
                {/* Background Image */}
                <Image
                  src={assets.hero3}
                  alt="Shop Women Hero"
                  fill
                  priority
                  className="object-cover z-0"
                  style={{ filter: "brightness(0.7)" }}
                />
                {/* Overlay Content */}
                <div className="relative z-10 flex flex-col items-center justify-center w-full">
                  <h1 className="text-4xl md:text-5xl font-semibold tracking-wide uppercase text-center mb-4 text-white drop-shadow-lg">
                    New In For Women
                  </h1>
                  <p className="text-base md:text-lg text-gray-100 mt-2 max-w-2xl text-center mb-6 drop-shadow-lg">
                    Discover the latest arrivals for women. Shop new collections, exclusive styles, and more.
                  </p>
                  <div className="w-24 h-0.5 bg-white mt-2 mb-4"></div>
                  <button className="px-8 py-3 bg-yellow-600 text-white rounded-full font-semibold text-base shadow hover:bg-gray-900 transition">
                    Shop Now
                  </button>
                </div>
              </section>

      <div className="flex flex-col items-center px-6 md:px-16 lg:px-32 pt-14 mt-[20px]">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-medium">Shop Women</h1>
          <p className="text-sm text-gray-500 mt-2">Discover the latest arrivals for women</p>
          <div className="w-16 h-0.5 bg-orange-600 mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
          {WomenProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopWomen;