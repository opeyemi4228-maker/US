import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ClientShell from "@/components/ClientShell";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

export const metadata = {
  title: "Unice Stitches — Tailored in Lagos, worn worldwide",
  description: "Next-Level Style Starts Here, Discover Unice Stitches Today! E-Commerce with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${montserrat.className} antialiased text-neutral-800 bg-white selection:bg-orange-200 selection:text-neutral-900`}
        >
          <AppContextProvider>
            <ClientShell>
              {children}
            </ClientShell>
            <Toaster position="top-right" reverseOrder={false} />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
