'use client';
import React, { useEffect, useState } from "react";
import { orderDummyData } from "@/assets/assets";
import { Package } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setOrders(orderDummyData);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-auto flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-4">
          <h2 className="text-lg font-medium text-neutral-900">Orders</h2>
          <div className="max-w-4xl border border-neutral-200 bg-white overflow-hidden">
            {orders.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">No orders yet.</div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors"
                >
                  {/* Items */}
                  <div className="flex-1 flex gap-4 max-w-80">
                    <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 flex items-center justify-center">
                      <Package size={20} className="text-neutral-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 leading-snug">
                        {order.items.map((item) => `${item.product.name} × ${item.quantity}`).join(", ")}
                      </p>
                      <p className="text-neutral-400 text-xs mt-1">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="text-neutral-600 text-xs space-y-0.5">
                    <p className="font-medium text-neutral-900">{order.address.fullName}</p>
                    <p>{order.address.area}</p>
                    <p>{order.address.city}, {order.address.state}</p>
                    <p>{order.address.phoneNumber}</p>
                  </div>

                  {/* Amount */}
                  <p className="font-semibold text-neutral-900 md:my-auto">
                    {currency}{order.amount}
                  </p>

                  {/* Meta */}
                  <div className="text-neutral-500 text-xs space-y-0.5">
                    <p>Method: {order.paymentType ?? "COD"}</p>
                    <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p className={order.payment ? "text-emerald-600" : "text-amber-600"}>
                      Payment: {order.payment ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
