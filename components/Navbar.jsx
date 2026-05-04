"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useClerk, UserButton } from "@clerk/nextjs";
import { Menu, X, ShoppingBag, Package, User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/all-products" },
  { label: "Women", href: "/ShopWomen" },
  { label: "Men", href: "/ShopMen" },
  { label: "About Us", href: "/About" },
];

// Simplified — no requestAnimationFrame which can stall on mobile
const useScrolled = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
};

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerCloseRef = useRef(null);

  const isHome = pathname === "/";
  const scrolled = useScrolled(80);
  const isTransparent = isHome && !scrolled && !mobileOpen;

  // Body scroll lock + ESC — defer focus to avoid iOS tap interference
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => drawerCloseRef.current?.focus(), 150);
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const userMenu = (
    <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }}>
      <UserButton.MenuItems>
        <UserButton.Action label="Cart" labelIcon={<ShoppingBag size={15} />} onClick={() => router.push("/cart")} />
        <UserButton.Action label="My Orders" labelIcon={<Package size={15} />} onClick={() => router.push("/my-orders")} />
      </UserButton.MenuItems>
    </UserButton>
  );

  const linkClass = useCallback(
    (active) =>
      `relative text-sm tracking-wide transition-colors py-1
       ${isTransparent ? "text-white/90 hover:text-white" : "text-neutral-700 hover:text-neutral-950"}
       ${active ? (isTransparent ? "text-white" : "text-neutral-950") : ""}
       focus:outline-none focus-visible:underline underline-offset-8`,
    [isTransparent]
  );

  return (
    <>
      <header
        className={`fixed top-10 inset-x-0 z-40 transition-all duration-500 ease-out
          ${isTransparent
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"}`}
      >
        <nav
          aria-label="Primary"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-4"
        >
          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="flex items-center gap-1 md:gap-8 flex-1 md:flex-initial">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileOpen(true)}
              style={{ touchAction: "manipulation" }}
              className={`md:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 rounded-full transition-colors focus:outline-none active:scale-95
                ${isTransparent ? "text-white active:bg-white/20" : "text-neutral-900 active:bg-neutral-100"}`}
            >
              <Menu size={24} aria-hidden="true" />
            </button>

            <ul className="hidden md:flex items-center gap-7 lg:gap-9">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass(active)}>
                      {link.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className={`absolute left-0 right-0 -bottom-1 h-px ${isTransparent ? "bg-white" : "bg-neutral-900"}`}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Centre — logo */}
          <Link
            href="/"
            aria-label="Unice Stitches — home"
            className="absolute left-1/2 -translate-x-1/2 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm"
          >
            <span className={`font-serif text-xl md:text-2xl tracking-tight transition-colors ${isTransparent ? "text-white" : "text-neutral-950"}`}>
              Unice<em className="italic font-normal"> Stitches</em>
            </span>
          </Link>

          {/* Right — actions */}
          <div className="flex items-center gap-1 md:gap-3 flex-1 justify-end md:flex-initial">
            <Link
              href="/cart"
              aria-label="Cart"
              className={`hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-current
                ${isTransparent ? "text-white hover:bg-white/10" : "text-neutral-900 hover:bg-neutral-100"}`}
            >
              <ShoppingBag size={18} aria-hidden="true" />
            </Link>

            {user ? (
              <div className="ml-1">{userMenu}</div>
            ) : (
              <button
                type="button"
                onClick={openSignIn}
                style={{ touchAction: "manipulation" }}
                className={`hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] py-2 px-4 rounded-full ring-1 transition-colors focus:outline-none focus-visible:ring-2
                  ${isTransparent
                    ? "text-white ring-white/60 hover:bg-white hover:text-neutral-950"
                    : "text-neutral-900 ring-neutral-300 hover:bg-neutral-900 hover:text-white hover:ring-neutral-900"}`}
              >
                <User size={14} aria-hidden="true" />
                Account
              </button>
            )}

            {isSeller && (
              <button
                type="button"
                onClick={() => router.push("/seller")}
                className={`hidden lg:inline-flex text-[10px] uppercase tracking-[0.2em] py-1.5 px-3 rounded-full ring-1 transition-colors
                  ${isTransparent
                    ? "text-white ring-amber-300/80 hover:bg-amber-300 hover:text-neutral-950"
                    : "text-neutral-900 ring-amber-500 hover:bg-amber-500"}`}
              >
                Seller
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile drawer — conditionally rendered (most reliable for mobile tap) */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-[60] md:hidden"
        >
          {/* Scrim */}
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200">
              <Link href="/" className="font-serif text-xl text-neutral-950">
                Unice<em className="italic font-normal"> Stitches</em>
              </Link>
              <button
                ref={drawerCloseRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                style={{ touchAction: "manipulation" }}
                className="inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-full text-neutral-900 active:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                aria-label="Close menu"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                          active
                            ? "bg-neutral-100 text-neutral-950"
                            : "text-neutral-700 active:bg-neutral-50 active:text-neutral-950"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 pt-6 border-t border-neutral-200 px-2 space-y-3">
                {!user && (
                  <button
                    type="button"
                    style={{ touchAction: "manipulation" }}
                    onClick={() => { setMobileOpen(false); openSignIn(); }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-neutral-950 text-white text-sm font-medium active:bg-neutral-800 transition-colors"
                  >
                    <User size={15} aria-hidden="true" />
                    Sign in / Create account
                  </button>
                )}
                <Link
                  href="/cart"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full ring-1 ring-neutral-300 text-neutral-900 text-sm font-medium active:bg-neutral-50 transition-colors"
                >
                  <ShoppingBag size={15} aria-hidden="true" />
                  View cart
                </Link>
                {isSeller && (
                  <button
                    type="button"
                    onClick={() => { router.push("/seller"); setMobileOpen(false); }}
                    className="w-full py-3 rounded-full ring-1 ring-amber-500 bg-amber-50 text-neutral-900 text-sm font-medium active:bg-amber-100 transition-colors"
                  >
                    Seller Dashboard
                  </button>
                )}
              </div>
            </nav>

            <div className="px-6 py-5 border-t border-neutral-200 text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Tailored in Lagos · Worn worldwide
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
