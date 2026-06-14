import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};

type AddressState = {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Omit<Address, "id" | "isDefault">) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      addresses: [
        {
          id: "1",
          fullName: "John Doe",
          phone: "+91 9876543210",
          street: "123 Main Street, Apartment 4B",
          city: "Mumbai",
          state: "Maharashtra",
          zipCode: "400001",
          isDefault: true,
        }
      ],
      addAddress: (address) =>
        set((state) => {
          const newAddress = { ...address, id: Date.now().toString(), isDefault: state.addresses.length === 0 };
          return { addresses: [...state.addresses, newAddress] };
        }),
      updateAddress: (id, address) =>
        set((state) => ({
          addresses: state.addresses.map((a) => (a.id === id ? { ...a, ...address } : a)),
        })),
      deleteAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
        })),
    }),
    {
      name: "shopnext-addresses",
    }
  )
);
