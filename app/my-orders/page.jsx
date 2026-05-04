"use client";
import React, { useEffect, useState } from "react";
import { orderDummyData } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { Package, MapPin, CreditCard, Clock, ChevronRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";

const STATUS_STYLES = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Pending: "bg-neutral-100 text-neutral-600",
  Cancelled: "bg-red-50 text-red-700",
};

const OrderCard = ({ order, currency }) => {
  const status = order.status ?? "Pending";
  const statusClass = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  const firstImage = order.items?.[0]?.product?.image;
  const imgSrc = Array.isArray(firstImage) ? firstImage[0] : firstImage;

  return (
    <article className="bg-white border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <Package size={16} aria-hidden="true" className="text-neutral-400 shrink-0" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              Order · {new Date(order.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
            </p>
            {order._id && (
              <p className="text-xs text-neutral-400 mt-0.5 font-mono">#{order._id.slice(-8).toUpperCase()}</p>
            )}
          </div>
        </div>
        <span className={`text-[10px] uppercase tracking-[0.18em] px-3 py-1 font-medium ${statusClass}`}>
          {status}
        </span>
      </div>

      {/* Items */}
      <div className="px-5 py-4 space-y-3">
        {order.items.map((item, i) => {
          const img = Array.isArray(item.product.image) ? item.product.image[0] : item.product.image;
          return (
            <div key={i} className="flex items-start gap-4">
              <Link
                href={`/product/${item.product._id}`}
                className="flex-shrink-0 w-14 h-16 overflow-hidden bg-neutral-100 hover:opacity-80 transition-opacity"
              >
                {img && (
                  <Image
                    src={img}
                    alt={item.product.name}
                    width={56}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product._id}`}>
                  <p className="text-sm font-medium text-neutral-900 truncate hover:text-orange-700 transition-colors">
                    {item.product.name}
                  </p>
                </Link>
                <p className="text-xs text-neutral-500 mt-0.5 uppercase tracking-wide">
                  {item.product.category}
                  {item.size ? ` · ${item.size}` : ""}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Qty: {item.quantity} · {currency}{item.product.offerPrice ?? item.product.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-neutral-100 bg-neutral-50/50">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} aria-hidden="true" className="text-neutral-400" />
            {order.address.city}, {order.address.state}
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard size={12} aria-hidden="true" className="text-neutral-400" />
            {order.paymentType ?? "COD"}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" className="text-neutral-400" />
            {new Date(order.date).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-6">
          <p className="font-medium text-neutral-900 text-sm">
            {currency}{order.amount}
          </p>
          <Link
            href={`/track-order?id=${order._id ?? ""}`}
            className="group inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-neutral-700 hover:text-orange-700 transition-colors border-b border-neutral-300 hover:border-orange-700 pb-0.5"
          >
            Track
            <ChevronRight size={12} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

const MyOrders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrders(orderDummyData);
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10">
        <header className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-orange-700 mb-3">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-orange-700 align-middle mr-2.5" />
            Your account
          </p>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-900 leading-tight">
            My <em className="italic font-normal text-orange-700">Orders</em>
          </h1>
        </header>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <Package size={40} className="mx-auto text-neutral-300 mb-5" />
            <p className="font-serif text-2xl md:text-3xl text-neutral-900">No orders yet.</p>
            <p className="mt-3 text-neutral-500 max-w-sm mx-auto">
              Your order history will appear here once you make your first purchase.
            </p>
            <Link
              href="/all-products"
              className="mt-8 inline-flex items-center gap-2 bg-neutral-950 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-colors"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, i) => (
              <OrderCard key={order._id ?? i} order={order} currency={currency} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyOrders;
