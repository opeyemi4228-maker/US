"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PromoBanner from "./PromoBanner";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isSeller = pathname.startsWith("/seller");
  return (
    <>
      {!isSeller && <PromoBanner />}
      {!isSeller && <Navbar />}
      {children}
      {!isSeller && <Footer />}
    </>
  );
}
