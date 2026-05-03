'use client'
import React from "react";

import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderSlider from "@/components/HeaderSlider";

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="">
        <HeaderSlider/>
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
