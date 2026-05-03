"use client";
import React from "react";
import ShopCategoryPage from "@/components/ShopCategoryPage";
import { assets } from "@/assets/assets";

const WOMEN_SUBCATEGORIES = ["All", "Dresses", "Tailoring", "Knits", "Tops", "Skirts"];

const ShopWomen = () => {
  return (
    <ShopCategoryPage
      category="Women"
      eyebrow="The women's edit"
      title={
        <>
          New in for <em className="italic font-normal text-orange-400/95">women</em>
        </>
      }
      description="Soft structure, deliberate detail, and silhouettes that move with you — discover the new women's collection."
      image={assets.hero3}
      subcategories={WOMEN_SUBCATEGORIES}
    />
  );
};

export default ShopWomen;