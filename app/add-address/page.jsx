"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";

const inputClass =
  "w-full px-3 py-3 text-sm border border-neutral-300 text-neutral-700 placeholder-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors";

const AddAddress = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-neutral-50 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
            Checkout
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-900 leading-tight">
            Shipping <em className="italic font-normal text-orange-700">Address</em>
          </h1>
        </header>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <form onSubmit={onSubmitHandler} className="w-full max-w-sm space-y-3">
            <input
              className={inputClass}
              type="text"
              placeholder="Full name"
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              value={address.fullName}
              required
            />
            <input
              className={inputClass}
              type="tel"
              placeholder="Phone number"
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
              value={address.phoneNumber}
              required
            />
            <input
              className={inputClass}
              type="text"
              placeholder="Pin code"
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              value={address.pincode}
            />
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Address (Area and Street)"
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
              value={address.area}
              required
            />
            <div className="flex gap-3">
              <input
                className={inputClass}
                type="text"
                placeholder="City / Town"
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                value={address.city}
                required
              />
              <input
                className={inputClass}
                type="text"
                placeholder="State"
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                value={address.state}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-neutral-950 text-white text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              Save Address
            </button>
          </form>

          <div className="hidden md:block flex-shrink-0">
            <Image
              src={assets.my_location_image}
              alt=""
              className="w-56 opacity-60"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddAddress;
