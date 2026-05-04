"use client";
import { addressDummyData } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import { ChevronDown, MapPin, Tag } from "lucide-react";

const OrderSummary = () => {
  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    setUserAddresses(addressDummyData);
  }, []);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {};

  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  return (
    <div className="bg-white border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-neutral-100">
        <h2 className="font-serif text-2xl tracking-tight text-neutral-900">
          Order <em className="italic font-normal text-orange-700">Summary</em>
        </h2>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Address */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
            Delivery Address
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-between text-left px-4 py-3 bg-white border border-neutral-300 text-sm text-neutral-700 hover:border-neutral-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
            >
              <span className="flex items-center gap-2 min-w-0">
                <MapPin size={13} aria-hidden="true" className="text-neutral-400 shrink-0" />
                <span className="truncate">
                  {selectedAddress
                    ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}`
                    : "Select address"}
                </span>
              </span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`shrink-0 ml-2 text-neutral-500 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <ul className="absolute z-20 w-full bg-white border border-neutral-300 border-t-0 shadow-lg">
                {userAddresses.map((address, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => handleAddressSelect(address)}
                      className="w-full text-left px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      {address.fullName}, {address.area}, {address.city}, {address.state}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => { setIsDropdownOpen(false); router.push("/add-address"); }}
                    className="w-full text-center px-4 py-3 text-sm text-orange-700 hover:bg-orange-50 transition-colors border-t border-neutral-100"
                  >
                    + Add new address
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo code */}
        <div>
          <label className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 block mb-2">
            Promo Code
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag size={13} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                className="w-full pl-8 pr-3 py-3 text-sm border border-neutral-300 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>
            <button
              type="button"
              className="px-5 py-3 bg-neutral-950 text-white text-xs uppercase tracking-[0.18em] hover:bg-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>

        <hr className="border-neutral-100" />

        {/* Totals */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal ({getCartCount()} {getCartCount() === 1 ? "item" : "items"})</span>
            <span className="font-medium text-neutral-900">{currency}{subtotal}</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Shipping</span>
            <span className="text-emerald-700 font-medium">Free</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Tax (2%)</span>
            <span className="font-medium text-neutral-900">{currency}{tax}</span>
          </div>
          <div className="flex justify-between text-base font-semibold text-neutral-900 pt-3 border-t border-neutral-200">
            <span>Total</span>
            <span>{currency}{total}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={createOrder}
          className="w-full py-4 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Place Order
        </button>
        <p className="mt-3 text-center text-[11px] text-neutral-400">
          Secure checkout · Free returns · Made in Lagos
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
