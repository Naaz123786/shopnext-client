"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronRight, CreditCard, Truck, Wallet } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useOrdersStore } from "@/features/orders/store/orders.store";
import { useAddressStore } from "@/features/user/store/address.store";
import Footer from "@/shared/layout/Footer";

const STEPS = ["Delivery Address", "Payment", "Confirm"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const addOrder = useOrdersStore((state) => state.addOrder);
  const addresses = useAddressStore((state) => state.addresses);
  const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];
  
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    setMounted(true);
    if (items.length === 0) {
      router.push("/cart");
    }
    
    // Pre-fill address if available
    if (defaultAddress) {
      setAddress({
        fullName: defaultAddress.fullName,
        phone: defaultAddress.phone,
        addressLine1: defaultAddress.street,
        city: defaultAddress.city,
        state: defaultAddress.state,
        pincode: defaultAddress.zipCode,
      });
    }
  }, [items, router, defaultAddress]);

  if (!mounted || items.length === 0) return null;

  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep((p) => p + 1);
  };

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    addOrder({
      id: orderId,
      items: [...items],
      totalAmount: getTotalPrice(),
      status: "Processing",
      date: new Date().toISOString(),
      shippingAddress: address,
      paymentMethod,
    });
    clearCart();
    router.push(`/order-success?id=${orderId}`);
  };

  const isAddressValid = Object.values(address).every((val) => val.trim().length > 0);

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="mx-auto flex w-full xl:w-[75%] items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/cart" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
            <ArrowLeft size={18} />
            <span className="font-medium">Back to Cart</span>
          </Link>
          <div className="text-xl font-bold">
            Shop<span className="text-amber-500">Next</span>
          </div>
          <div className="w-24"></div> {/* spacer */}
        </div>
      </header>

      <div className="flex-1 py-8 sm:py-12">
        <div className="mx-auto grid w-full xl:w-[75%] gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1fr_400px]">
          
          {/* Main Content */}
          <div className="space-y-8">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-amber-500 transition-all duration-300 -z-10" style={{ width: `${(currentStep / 2) * 100}%` }} />
              
              {STEPS.map((step, index) => (
                <div key={step} className="flex flex-col items-center gap-2 bg-[#F8F8F8] dark:bg-black px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    currentStep > index ? "bg-amber-500 border-amber-500 text-white" :
                    currentStep === index ? "bg-white dark:bg-zinc-900 border-amber-500 text-amber-500" :
                    "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-400"
                  }`}>
                    {currentStep > index ? <CheckCircle2 size={16} /> : index + 1}
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${
                    currentStep >= index ? "text-zinc-900 dark:text-white" : "text-zinc-400"
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Step 1: Address */}
            {currentStep === 0 && (
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6">Delivery Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input 
                      type="text" 
                      value={address.fullName} 
                      onChange={(e) => setAddress({...address, fullName: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input 
                      type="tel" 
                      value={address.phone} 
                      onChange={(e) => setAddress({...address, phone: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium">Address Line 1</label>
                    <input 
                      type="text" 
                      value={address.addressLine1} 
                      onChange={(e) => setAddress({...address, addressLine1: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="House No, Building, Street"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <input 
                      type="text" 
                      value={address.city} 
                      onChange={(e) => setAddress({...address, city: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <input 
                      type="text" 
                      value={address.state} 
                      onChange={(e) => setAddress({...address, state: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pincode</label>
                    <input 
                      type="text" 
                      value={address.pincode} 
                      onChange={(e) => setAddress({...address, pincode: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 transition-colors"
                      placeholder="400001"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button 
                    onClick={handleNextStep}
                    disabled={!isAddressValid}
                    className="flex items-center gap-2 rounded-xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 disabled:opacity-50"
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 1 && (
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-amber-600">
                        <Truck size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Cash on Delivery</div>
                        <div className="text-sm text-zinc-500">Pay when your order arrives</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-amber-500' : 'border-zinc-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                    </div>
                    <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-blue-600">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">Credit / Debit Card</div>
                        <div className="text-sm text-zinc-500">Secure card payment (Demo only)</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-amber-500' : 'border-zinc-300'}`}>
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                    </div>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="hidden" />
                  </label>
                  
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10' : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-purple-600">
                        <Wallet size={20} />
                      </div>
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-white">UPI (GPay, PhonePe)</div>
                        <div className="text-sm text-zinc-500">Fast and secure (Demo only)</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-amber-500' : 'border-zinc-300'}`}>
                      {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                    </div>
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="hidden" />
                  </label>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(0)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium px-4 py-2">
                    Back
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="flex items-center gap-2 rounded-xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400"
                  >
                    Review Order <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {currentStep === 2 && (
              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-600">
                  <CheckCircle2 size={24} /> Almost there!
                </h2>
                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl mb-6 border border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Delivery Details</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {address.fullName}<br/>
                    {address.addressLine1}<br/>
                    {address.city}, {address.state} {address.pincode}<br/>
                    Phone: {address.phone}
                  </p>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 uppercase font-medium">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <button onClick={() => setCurrentStep(1)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-medium px-4 py-2">
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 shadow-lg hover:shadow-green-600/20"
                  >
                    Place Order Now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                      {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm border-t border-zinc-100 dark:border-zinc-800 pt-4 mb-4">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-medium text-zinc-900 dark:text-white">₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
              </div>
              
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between items-end">
                <span className="font-bold text-zinc-900 dark:text-white">Total</span>
                <span className="text-2xl font-black text-amber-500">₹{getTotalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
