"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { usePathname } from "next/navigation";
import { assets, CartIcon, BagIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import dynamic from "next/dynamic";

// Dynamically import HeaderSlider for home page only
const HeaderSlider = dynamic(() => import("./HeaderSlider"), { ssr: false, loading: () => <div style={{height: 320}} /> });

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Only add scroll listener on home page
  useEffect(() => {
    if (pathname === "/") {
      const onScroll = () => {
        setScrolled(window.scrollY > window.innerHeight - 80);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [pathname]);

  // Memoized nav links for performance
  const navLinks = useCallback(
    () => (
      <>
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">
          New Arrivals
        </Link>
        <Link href="/ShopMen" className="hover:text-gray-900 transition">
          Shop Men
        </Link>
        <Link href="/ShopWomen" className="hover:text-gray-900 transition">
          Shop Women
        </Link>
      </>
    ),
    []
  );

  // UserButton with Cart action (optimized, no fragment)
  const userButtonWithCart = (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Cart"
          labelIcon={<CartIcon />}
          onClick={() => router.push('/cart')}
        />
      </UserButton.MenuItems>
      <UserButton.MenuItems>
        <UserButton.Action
          label="My Orders"
          labelIcon={<CartIcon />}
          onClick={() => router.push('/my-orders')}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  const userButtonWithMyOrders = (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="My Orders"
          labelIcon={<BagIcon />}
          onClick={() => router.push('/my-orders')}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  // Home page with HeaderSlider and drop logo
  if (pathname === "/") {
    return (
      <>
        <div className="w-screen relative" style={{ minHeight: "0" }}>
          <div className="relative" style={{ height: "50vh", minHeight: "320px" }}>
            <Suspense fallback={<div style={{height:320}} />}>
              <HeaderSlider />
            </Suspense>
            {/* Animated Large Logo Overlay (drops on all screens) */}
            <style>{`
              .logo-drop-anim {
                position: absolute;
                left: 50%;
                z-index: 50;
                transform: translateX(-50%);
                transition:
                  top 0.9s cubic-bezier(.39,.575,.565,1),
                  width 0.9s cubic-bezier(.39,.575,.565,1),
                  filter 0.7s cubic-bezier(.39,.575,.565,1),
                  opacity 0.7s cubic-bezier(.39,.575,.565,1),
                  background 0.7s cubic-bezier(.39,.575,.565,1);
                pointer-events: none;
                user-select: none;
              }
              .logo-dropped {
                top: -160px;
                width: 2200px;
                opacity: 1;
                border-radius: 50%;
                filter: brightness(0) invert(1) drop-shadow(0 8px 32px #0005);
                background: transparent;
              }
              .logo-navbar {
                top: 32px;
                width: 64px;
                opacity: 1;
                background: transparent;
                filter: brightness(0) invert(1);
              }
              @media (max-width: 1200px) {
                .logo-dropped { width: 900px; top: 60px; }
              }
              @media (max-width: 800px) {
                .logo-dropped { width: 400px; top: 80px; }
              }
              @media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait),
                     (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
                .logo-dropped { top: 84px !important; }
              }
              @media (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape) {
                .logo-dropped { top: 84px !important; }
              }
              @media (min-width: 820px) and (max-width: 1024px) and (orientation: portrait) {
                .logo-dropped { top: 84px !important; }
              }
              @media (min-width: 800px) and (max-width: 1100px) {
                .logo-dropped { top: 84px !important; }
              }
            `}</style>
          </div>
          {/* Navbar overlays HeaderSlider */}
          <nav
            className={`w-full fixed top-0 left-0 z-50 transition-all duration-700 ${
              scrolled
                ? "bg-white border-b border-gray-200 shadow-md backdrop-blur-md"
                : "bg-transparent"
            }`}
            style={{
              animation: "fadeInDown 0.7s cubic-bezier(.39,.575,.565,1) both",
            }}
          >
            <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 relative z-100 transition-all duration-700">
              {/* Mobile Nav */}
              <div className="flex w-full md:hidden items-center justify-between">
                {/* Login/Signup button left */}
                <div className="flex items-center">
                  {user ? userButtonWithCart : (
                    <button
                      onClick={openSignIn}
                      className={`px-3 flex items-center gap-4 hover:text-gray-900 transition ${
                        scrolled ? "text-gray-900" : "text-black"
                      }`}
                    >
                      <Image src={assets.user_icon} alt="user icon" />
                      <p>Account</p>
                    </button>
                  )}
                </div>
                {/* Hide logo in mobile nav while drop logo is visible */}
                <div className="flex-1 mr-10 flex justify-center">
                  {!(!scrolled) && (
                    <Image
                      className="mx-auto w-20 h-10"
                      onClick={() => router.push('/')}
                      src={assets.logo}
                      alt="logo"
                      priority
                    />
                  )}
                </div>
                {/* Menu button right */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="focus:outline-none ml-2"
                  aria-label="Toggle Menu"
                >
                  {mobileOpen ? (
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l16 16M6 22L22 6" />
                    </svg>
                  ) : (
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7h20M4 14h20M4 21h20" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Desktop Nav */}
              <div
                className={`hidden md:flex items-center gap-4 lg:gap-8 text-sm transition-colors duration-500 ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {navLinks()}
              </div>

              {/* Desktop Icons */}
              <ul className="hidden md:flex items-center gap-7 ">
                {user ? userButtonWithCart : (
                  <button
                    onClick={openSignIn}
                    className={`text-sm border px-4 py-1.5 rounded-full ${
                      scrolled ? "text-gray-900 border-gray-300" : "text-white border-white"
                    }`}
                  >
                    Login / Sign up
                  </button>
                )}
                {isSeller && (
                  <button
                    onClick={() => router.push('/seller')}
                    className={`text-xs border px-4 py-1.5 rounded-full ${
                      scrolled ? "text-gray-900 border-yellow-400" : "text-white border-white"
                    }`}
                  >
                    Seller Dashboard
                  </button>
                )}
              </ul>
            </div>

            {/* Mobile Menu Drawer */}
            {mobileOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-white to-gray-300 bg-opacity-90 backdrop-blur-lg"></div>
                <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-[90vw] max-w-[350px] mx-auto py-10 rounded-xl shadow-2xl">
                  {/* Centered Logo */}
                  <div className="flex justify-center w-full mb-4 ml-200">
                    <Image
                      className="mx-auto w-20 h-auto"
                      src={assets.logo}
                      alt="logo"
                      priority={false}
                      loading="lazy"
                      
                    />
                  </div>
                  {navLinks()}
                  {/* Always black text and original button style in menu drawer */}
                 {user ? userButtonWithCart : (
                   <button
                    className="flex items-center gap-2 text-lg font-semibold hover:text-black transition text-black"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image src={assets.user_icon} alt="user icon" />
                    Account
                  </button>)}
                  <button
                    onClick={() => {
                      router.push('/seller');
                      setMobileOpen(false);
                    }}
                    className="w-full text-xs border px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold"
                  >
                    Seller Dashboard
                  </button>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-4 right-4 text-gray-700"
                    aria-label="Close Menu"
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l16 16M6 22L22 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </>
    );
  }

  // Normal Navbar for other pages (no HeaderSlider, no drop logo, black text on white)
  return (
    <nav
      className="w-full border-b border-gray-200 text-black bg-white fixed top-0 left-0 z-50"
      style={{
        animation: "fadeInDown 0.7s cubic-bezier(.39,.575,.565,1) both"
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 relative z-100">
        {/* Mobile: Login/Signup left, Logo center, Menu button right */}
        <div className="flex w-full md:hidden items-center justify-between">
          {/* Login/Signup button left */}
          <div className="flex items-center">
            {user ? userButtonWithCart : (
              <button
                onClick={openSignIn}
                className="px-3 flex items-center gap-4 hover:text-gray-900 transition text-black"
              >
                <Image src={assets.user_icon} alt="user icon" />
                <p>Account</p>
              </button>
            )}
          </div>
          {/* Logo center */}
          <div className="flex-1 ml-100 flex justify-center">
            <Image
              className="mx-auto w-20 h-10"
              onClick={() => router.push('/')}
              src={assets.logo}
              alt="logo"
              priority={false}
              loading="lazy"
              
            />
          </div>
          {/* Menu button right */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="focus:outline-none ml-2"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? (
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l16 16M6 22L22 6" />
              </svg>
            ) : (
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h20M4 14h20M4 21h20" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="pr--48">
        <div className="hidden md:flex items-center gap-4 lg:gap-8 text-sm text-black">
          {navLinks()}
          <Image
            className="cursor-pointer w-10 md:w-16"
            onClick={() => router.push('/')}
            src={assets.logo}
            alt="logo"
            priority={false}
            loading="lazy"
          />
        </div>
        </div>

        {/* Desktop Icons */}
        <ul className="hidden md:flex items-center gap-5 ">
          {user ? userButtonWithCart : (
            <button
              onClick={openSignIn}
              className="text-sm border px-4 py-1.5 rounded-full text-black border-gray-300"
            >
              Login / Sign up
            </button>
          )}
          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="text-xs border px-4 py-1.5 rounded-full text-black border-yellow-400"
            >
              Seller Dashboard
            </button>
          )}
        </ul>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-white to-gray-300 bg-opacity-90 backdrop-blur-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-[90vw] max-w-[350px] mx-auto py-10 rounded-xl shadow-2xl">
            {/* Centered Logo */}
            <div className="flex justify-center w-full mb-4">
              <Image
                className="mx-auto w-20 h-auto"
                src={assets.logo}
                alt="logo"
                priority={false}
                loading="lazy"
              />
            </div>
            {navLinks()}
            <button
              className="flex items-center gap-2 text-lg font-semibold hover:text-black transition text-black"
              onClick={() => setMobileOpen(false)}
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
            <button
              onClick={() => {
                router.push('/seller');
                setMobileOpen(false);
              }}
              className="w-full text-xs border px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold"
            >
              Seller Dashboard
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-700"
              aria-label="Close Menu"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l16 16M6 22L22 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;