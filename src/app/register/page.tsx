"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { registerUser, saveToken } from "@/features/auth/api/auth.service";


export default function RegisterPage() {
    const router = useRouter();
const { refreshUser } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const res = await registerUser({ name, email, password });
            saveToken(res.token);

            saveToken(res.token);
            await refreshUser();
            router.push("/");
            router.refresh();
        } catch {
            setError("Registration failed. Email may already exist.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F6F7FB] dark:bg-black px-4 py-8 transition-colors">
            <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl overflow-hidden rounded-[2rem] bg-white dark:bg-zinc-950 shadow-2xl lg:grid-cols-2">
                <section className="hidden bg-[#0B1220] p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-black">
                                <ShoppingBag size={24} />
                            </div>
                            <h1 className="text-3xl font-bold">
                                Shop<span className="text-amber-400">Next</span>
                            </h1>
                        </div>

                        <div className="mt-20">
                            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-amber-400">
                                New here?
                            </p>
                            <h2 className="max-w-md text-5xl font-bold leading-tight">
                                Create your ShopNext account.
                            </h2>
                            <p className="mt-6 max-w-md text-base leading-7 text-zinc-300">
                                Save addresses, track orders, manage cart and checkout faster.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm text-zinc-300">
                            Your account connects profile, cart, orders, address and payment flow.
                        </p>
                    </div>
                </section>

                <section className="flex items-center justify-center p-6 sm:p-10">
                    <form onSubmit={handleRegister} className="w-full max-w-md">
                        <div className="mb-8 lg:hidden">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1220] text-white">
                                <ShoppingBag size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                Shop<span className="text-amber-500">Next</span>
                            </h1>
                        </div>

                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                            Create account
                        </h2>
                        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                            Fill details to start shopping.
                        </p>

                        {error && (
                            <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <div className="mt-8 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Full name
                                </label>
                                <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 focus-within:border-zinc-900 dark:focus-within:border-zinc-500">
                                    <User size={18} className="text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="w-full bg-transparent px-3 py-4 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Email address
                                </label>
                                <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 focus-within:border-zinc-900 dark:focus-within:border-zinc-500">
                                    <Mail size={18} className="text-zinc-400" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full bg-transparent px-3 py-4 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Password
                                </label>
                                <div className="flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 focus-within:border-zinc-900 dark:focus-within:border-zinc-500">
                                    <Lock size={18} className="text-zinc-400" />
                                    <input
                                        type="password"
                                        placeholder="Minimum 6 characters"
                                        className="w-full bg-transparent px-3 py-4 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full rounded-2xl bg-[#0B1220] dark:bg-amber-500 py-4 text-sm font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 disabled:opacity-60"
                            >
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-zinc-900 dark:text-white">
                                Login
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </main>
    );
}