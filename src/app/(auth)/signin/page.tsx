"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Signin() {
    const handleSignIn = async (provider: "google" | "twitter") => {
        await signIn(provider, { callbackUrl: "/dashboard" });
    };

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
                {/* Left: Form panel */}
                <div className="flex items-center justify-center px-6 md:px-12">
                    <motion.div
                        className="w-full max-w-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Brand */}
                        <div className="flex items-center gap-2 mb-10">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <span className="text-black text-sm">🌍</span>
                            </div>
                            <div className="font-semibold">OSAP</div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back to OSAP! 👋</h1>
                        <p className="text-neutral-400 mb-8 text-sm md:text-base max-w-sm">
                            Sign in to discover projects, find organizations, and start contributing.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleSignIn("google")}
                                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md
                                           bg-neutral-100 text-neutral-950 hover:bg-neutral-200 transition-colors
                                           border border-neutral-300 hover:cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 8.2 8.9 6.3 14.7z"/>
                                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 15.5 4 8.2 8.9 6.3 14.7z"/>
                                    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.1C29.2 36 26.8 37 24 37c-5.1 0-9.5-3.3-11.3-7.9l-6.4 5C8.2 39.1 15.5 44 24 44z"/>
                                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.6 6.5-8.3 6.5-5.1 0-9.5-3.3-11.3-7.9l-6.4 5C12.9 39.7 18 44 24 44c9.4 0 17-7.6 17-17 0-1.3-.1-2.7-.4-3.5z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <button
                                onClick={() => handleSignIn("twitter")}
                                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md
                                           bg-neutral-800 text-neutral-100 hover:bg-neutral-700 transition-colors
                                           border border-neutral-600 hover:cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.27 4.27 0 0 0-7.28 3.89A12.12 12.12 0 0 1 3.15 5.1a4.27 4.27 0 0 0 1.32 5.7 4.22 4.22 0 0 1-1.93-.53v.05a4.27 4.27 0 0 0 3.43 4.18 4.28 4.28 0 0 1-1.92.07 4.27 4.27 0 0 0 3.98 2.96 8.57 8.57 0 0 1-5.31 1.83c-.34 0-.68-.02-1.01-.06A12.09 12.09 0 0 0 8.29 21c7.86 0 12.16-6.51 12.16-12.16 0-.19 0-.39-.01-.58A8.68 8.68 0 0 0 22.46 6z"/>
                                </svg>
                                Continue with Twitter
                            </button>
                        </div>

                        <div className="mt-6 text-neutral-400 text-sm">
                            <Link href="/" className="hover:text-neutral-200 underline">Back to Home</Link>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Illustration panel */}
                <div className="hidden md:flex relative items-center justify-center bg-gradient-to-br from-indigo-600/60 via-purple-600/60 to-blue-600/60">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_40%)]" />
                    <motion.div
                        className="relative w-4/5 max-w-lg bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mx-auto mb-4">
                            <span className="text-black">🔒</span>
                        </div>
                        <h2 className="text-center text-xl font-semibold mb-2">Secure sign-in</h2>
                        <p className="text-center text-sm text-white/80">
                            "Small steps today. Big dreams tomorrow."
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
