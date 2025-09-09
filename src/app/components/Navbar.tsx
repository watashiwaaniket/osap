"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export default function Navbar() {
  return (
    <motion.nav
      className='flex items-center justify-between w-[600px] md:w-[700px] mx-auto mt-6 px-4 py-2 
                 bg-black/80 backdrop-blur-sm rounded-full border border-gray-700
                 shadow-[0_4px_15px_rgba(0,0,0,0.5)] text-sm'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className='flex items-center space-x-2'>
        <div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>
          <span className='text-black text-xs'>🌍</span>
        </div>
      </div>

      {/* Nav Links */}
      <div className='flex items-center space-x-6'>
        <a href='#' className='hover:text-gray-300 transition-colors'>
          About
        </a>
        <a href='#' className='hover:text-gray-300 transition-colors'>
          Organizations
        </a>
        <a href='#' className='hover:text-gray-300 transition-colors'>
          Github
        </a>
      </div>

      {/* Login Button */}
      <Link href='/signin'>
        <motion.button
          className='px-4 py-1.5 rounded-full font-medium text-sm
                   bg-gradient-to-r from-gray-800 via-gray-900 to-black
                   text-white border border-gray-600 shadow-md
                   relative overflow-hidden transition-all'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className='relative z-10'>Login</span>
          <span
            className='absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20
                     opacity-0 hover:opacity-100 transition-opacity duration-700
                     rounded-full blur-sm'
          ></span>
        </motion.button>
      </Link>
    </motion.nav>
  );
}
