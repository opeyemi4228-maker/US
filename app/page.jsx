'use client'
import React from "react";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import HeaderSlider from "@/components/HeaderSlider";

const Home = () => {
  return (
    <>
      <HeaderSlider />
      <HomeProducts />
      <FeaturedProduct />
      <Banner />
      <NewsLetter />
    </>
  );
};

export default Home;
