import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/features/cart/store/cart.store";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  date: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
};

type OrdersState = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),
    }),
    {
      name: "shopnext-orders-storage",
    }
  )
);
