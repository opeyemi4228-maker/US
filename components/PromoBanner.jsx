import React, { useEffect, useState } from "react";

const promotions = [
  "Enjoy Complimentary Shipping & Returns On All Orders",
  "Sign Up For Unice Stitches Emails & Get 10% Off Your First Order",
  "Shop The Latest Women's Collection Now",
  "Exclusive: Free Gift With Every Purchase Over $200",
];

const PromoBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % promotions.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black text-black text-center py-2 px-4 text-sm font-medium tracking-wide uppercase z-40 overflow-hidden">
      <div
        key={current}
        className="inline-block animate-fadeInDown"
        style={{
          animation: "fadeInDown 0.7s cubic-bezier(.39,.575,.565,1)",
          minWidth: "100%",
        }}
      >
        {promotions[current]}
      </div>
      <style jsx>{`
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-20px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default PromoBanner;