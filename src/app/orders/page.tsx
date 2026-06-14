"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, Clock, CheckCircle2, Truck, XCircle } from "lucide-react";
import { useOrdersStore, Order } from "@/features/orders/store/orders.store";
import Footer from "@/shared/layout/Footer";

export default function OrdersPage() {
  const { orders } = useOrdersStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
        <div className="flex-1 py-10 sm:py-16">
          <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">My Orders</h1>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return <Clock className="text-amber-500" size={18} />;
      case "Processing":
        return <Package className="text-blue-500" size={18} />;
      case "Shipped":
        return <Truck className="text-purple-500" size={18} />;
      case "Delivered":
        return <CheckCircle2 className="text-green-500" size={18} />;
      case "Cancelled":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Package size={18} />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-500";
      case "Processing":
        return "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-500";
      case "Shipped":
        return "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-500";
      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-500";
      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-500";
      default:
        return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <div className="flex-1 py-10 sm:py-16">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-zinc-900 dark:text-white">My Orders</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Track and manage your order history.</p>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center shadow-sm">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 mb-6">
                <Package size={40} className="text-zinc-400" />
              </div>
              <h2 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">No Orders Yet</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">
                Looks like you haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Order ID:</span>
                        <span className="font-mono font-semibold text-zinc-900 dark:text-white">{order.id}</span>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-zinc-900 dark:text-white truncate">{item.name}</p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-zinc-900 dark:text-white">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 sm:p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-zinc-900 dark:text-white">₹{order.totalAmount}</p>
                    </div>
                    <Link href={`/orders/${order.id}`} className="flex items-center justify-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition">
                      View Order Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
