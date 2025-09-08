import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <>
      {/* Spacer to match HeaderSlider height and prevent overlap */}
      <div className="header-slider-spacer" aria-hidden="true"></div>
      <style>{`
        .header-slider-spacer {
          display: block;
          width: 100%;
        }
        @media (min-width: 1280px) {
          .header-slider-spacer { margin-top: -400.0px !important; }
        }
        @media (width: 540px) {
          .header-slider-spacer { margin-top: -380px !important; }
        }
        @media (min-width: 1024px) {
          .header-slider-spacer { margin-top: -300px !important; }
        }
        @media (max-width: 1023px) {
          .header-slider-spacer { margin-top: -300px !important; }
        }
        
      `}</style>
      <div
        className="
          flex flex-col items-center
          
        "
      >
        <p className="text-sm mb-4 font-weight: 400">This Season's</p>
        <p className="text-2xl font-medium text-center w-full font-weight: 500">POPULAR COLLECTION</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-3 md:mt-4 lg:mt-6 pb-14 w-full">
          {products.map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
        <button
          onClick={() => { router.push('/all-products') }}
          className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
        >
          See more
        </button>
      </div>
    </>
  );
};

export default HomeProducts;