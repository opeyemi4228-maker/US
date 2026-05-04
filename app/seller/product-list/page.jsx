'use client';
import React, { useEffect, useState } from "react";
import { productsDummyData } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const ProductList = () => {
  const { currency } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsDummyData);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium text-neutral-900">All Products</h2>
          <div className="max-w-4xl w-full overflow-hidden border border-neutral-200 bg-white">
            <table className="table-fixed w-full">
              <thead className="text-neutral-700 text-xs uppercase tracking-[0.18em] text-left border-b border-neutral-200">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium max-sm:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-neutral-600">
                {products.map((product, index) => (
                  <tr key={index} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center gap-3 truncate">
                      <div className="bg-neutral-100 p-2 flex-shrink-0">
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover"
                          width={48}
                          height={48}
                        />
                      </div>
                      <span className="truncate">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden text-neutral-500">{product.category}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900">{currency}{product.offerPrice}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      <Link
                        href={`/product/${product._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.18em] hover:bg-orange-700 transition-colors focus:outline-none"
                      >
                        Visit
                        <ExternalLink size={12} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
