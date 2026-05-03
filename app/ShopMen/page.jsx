"use client";
import React from "react";
import ShopCategoryPage from "@/components/ShopCategoryPage";
import { assets } from "@/assets/assets";

const MEN_SUBCATEGORIES = ["All", "Tailoring", "Outerwear", "Knits", "Shirts", "Trousers"];

const ShopMen = () => {
  return (
    <ShopCategoryPage
      category="Men"
      eyebrow="The men's edit"
      title={
        <>
          New in for <em className="italic font-normal text-orange-400/95">men</em>
        </>
      }
      description="Considered tailoring, sharp outerwear, and the daily staples that hold their shape — built for wear, not display."
      image={assets.hero3}
      subcategories={MEN_SUBCATEGORIES}
    />
  );
};

export default ShopMen;