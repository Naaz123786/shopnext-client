"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, MapPin, Edit2, Trash2, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/shared/layout/Footer";
import { useAddressStore } from "@/features/user/store/address.store";

export default function AddressPage() {
  const { addresses, addAddress, deleteAddress, setDefaultAddress } = useAddressStore();
  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(formData);
    toast.success("Address added successfully");
    setShowAddForm(false);
    setFormData({
      fullName: "", phone: "", street: "", city: "", state: "", zipCode: ""
    });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <div className="flex-1 py-10 sm:py-16">
        <div className="mx-auto w-full xl:w-[60%] px-4 sm:px-6 lg:px-8">
          
          <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft size={16} /> Back to Profile
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MapPin size={28} className="text-amber-500" />
              My Addresses
            </h1>
            {!showAddForm && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#0B1220] dark:bg-white px-4 py-2.5 text-sm font-bold text-white dark:text-black transition hover:bg-black dark:hover:bg-zinc-200"
              >
                <Plus size={18} /> Add New Address
              </button>
            )}
          </div>

          {showAddForm && (
            <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl mb-8 animate-in slide-in-from-top-4 fade-in duration-300">
              <h2 className="text-xl font-bold mb-6">Add New Address</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                    <input required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone Number</label>
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="+91 9876543210" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Street Address</label>
                  <input required value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="123 Main St, Apartment 4B" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">City</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">State</label>
                    <input required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="Maharashtra" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">PIN Code</label>
                    <input required value={formData.zipCode} onChange={e => setFormData({...formData, zipCode: e.target.value})} type="text" className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-amber-500 transition-colors" placeholder="400001" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="px-6 py-3 bg-[#0B1220] dark:bg-amber-500 text-white dark:text-black rounded-xl font-bold hover:bg-black dark:hover:bg-amber-400 transition">Save Address</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition">Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {addresses.map(address => (
              <div key={address.id} className={`relative p-6 rounded-3xl border ${address.isDefault ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/5' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950'} transition-colors`}>
                
                {address.isDefault && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 bg-amber-100 dark:bg-amber-500/20 px-2 py-1 rounded-full">
                    <Check size={12} /> Default
                  </div>
                )}

                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-1">{address.fullName}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">{address.phone}</p>
                
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed mb-6">
                  {address.street}<br/>
                  {address.city}, {address.state} {address.zipCode}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800/50">
                  {!address.isDefault && (
                    <button 
                      onClick={() => setDefaultAddress(address.id)}
                      className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  <div className="flex-1" />
                  <button className="p-2 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      deleteAddress(address.id);
                      toast("Address deleted");
                    }}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
