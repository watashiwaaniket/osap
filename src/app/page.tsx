"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Head from "next/head";
import Dashboard from "./dashboard/page";
import Navbar from "./components/Navbar";

export default function Home() {
  const dashboardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], [50, 0]);

  return (
    <>
      <Head>
        <title>OSAP - Find. Contribute. Learn.</title>
        <meta name='description' content='Your next contribution starts here' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <div className="min-h-screen bg-cover bg-center text-white"
        style={{'backgroundImage' : 'url(/bg.png)', 'position' : 'absolute'}}>
        <motion.div
          className='flex flex-col items-center px-4 pt-20 pb-10 text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='px-3 py-1.5 my-6 rounded-full border border-gray-600
                       text-sm bg-black/60 backdrop-blur-md 
                       shadow-[0_0_15px_rgba(255,255,255,0.1)]'
            whileHover={{ scale: 1.05 }}
          >
            Large Library of Organizations
          </motion.div>

          <p className='text-gray-200 text-2xl font-bold my-2 mt-8'>
            Your next contribution starts here
          </p>

          <h1 className='text-4xl md:text-7xl font-extrabold mb-4 leading-snug'>
            Find. Contribute. Learn.
          </h1>

          <p className='text-gray-400 max-w-md mx-auto mb-8 text-xl md:text-base'>
            Finding contribution for your organization just got easier
          </p>

          <motion.button
            className='px-6 py-2.5 rounded-full font-medium
                       bg-gradient-to-r from-gray-800 via-gray-900 to-black
                       border border-gray-600 shadow-md relative overflow-visible text-sm md:text-base'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-10'>Get Started</span>
            <span className='absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-700 rounded-full blur-sm'></span>
          </motion.button>
        </motion.div>

        <div
          ref={dashboardRef}
          className='h-[150vh] flex items-center justify-center'
        >
          <motion.div
            style={{
              scale: scale,
              opacity: opacity,
              y: y,
            }}
            className='w-[90%] h-[90%] origin-top rounded-xl shadow-lg overflow-visible'
          >
            <Dashboard />
          </motion.div>
        </div>
      </div>
    </>
  );
}
