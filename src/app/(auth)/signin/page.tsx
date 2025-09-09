"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Signin() {
  const handleSignIn = async (provider: "google") => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="bg-[url('/bg.png')] min-h-screen bg-cover bg-center ">
      <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
        <div className='flex items-center justify-center px-6 md:px-12'>
          <motion.div
            className='w-full max-w-md'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className='flex items-center justify-center space-x-2'>
              <Image
                src='/my_icon.png'
                alt='Logo'
                width={50}
                height={50}
                className='rounded-full'
                priority
              />
            </div>

            <h1 className='text-3xl md:text-4xl text-center font-bold mb-2'>
              Welcome back to OSAP!
            </h1>
            <p className='text-white text-center mb-8 text-sm md:text-base '>
              Enter your details to kickstart contributing.
            </p>

            <div className='space-y-3'>
              <button
                onClick={() => handleSignIn("google")}
                className='w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md
                                           bg-neutral-300 text-neutral-950 hover:bg-neutral-400 hover:text-black transition-colors
                                            hover:cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 48 48'
                  className='w-5 h-5'
                >
                  <path
                    fill='#FFC107'
                    d='M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 8.2 8.9 6.3 14.7z'
                  />
                  <path
                    fill='#FF3D00'
                    d='M6.3 14.7l6.6 4.8C14.5 16.2 18.9 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 15.5 4 8.2 8.9 6.3 14.7z'
                  />
                  <path
                    fill='#4CAF50'
                    d='M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.1C29.2 36 26.8 37 24 37c-5.1 0-9.5-3.3-11.3-7.9l-6.4 5C8.2 39.1 15.5 44 24 44z'
                  />
                  <path
                    fill='#1976D2'
                    d='M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-4.6 6.5-8.3 6.5-5.1 0-9.5-3.3-11.3-7.9l-6.4 5C12.9 39.7 18 44 24 44c9.4 0 17-7.6 17-17 0-1.3-.1-2.7-.4-3.5z'
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <div className='flex items-center gap-4 mt-3'>
              <button
                onClick={() => router.push("/home")} //put the home page path here
                className='flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors group'
              >
                <svg
                  className='w-5 h-5 transform group-hover:-translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                <span>Go Back</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className='hidden md:flex relative items-center justify-center bg-gradient-to-br from-indigo-600/60 via-purple-600/60 to-blue-600/60'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_0,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.05),transparent_40%)]' />
          <motion.div
            className='relative w-4/5 max-w-lg bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-md'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            go nuts put smth here
          </motion.div>
        </div>
      </div>
    </div>
  );
}
