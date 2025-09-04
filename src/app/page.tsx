"use client";
import Link from "next/link";
import { ArrowRight, Github, Code, Users } from "lucide-react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const featureVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LandingPage() {
  return (
    
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black overflow-hidden'>
      {/* Hero Section */}
      <motion.div
        className='container mx-auto px-6 py-20'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='text-center'>
          {/* OSAP Logo/Title */}
          <motion.div className='mb-8' variants={itemVariants}>
            <motion.h1
              className='text-8xl font-black text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text mb-2'
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              OSAP
            </motion.h1>
            <motion.p
              className='text-xl text-gray-300 font-light tracking-wider'
              variants={itemVariants}
            >
              Open Source Application Platform
            </motion.p>
          </motion.div>

          <motion.h2
            className='text-5xl font-bold text-white mb-6'
            variants={itemVariants}
          >
            Showcase Your
            <motion.span
              className='text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text'
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.8,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              {" "}
              Projects
            </motion.span>
          </motion.h2>

          <motion.p
            className='text-xl text-gray-300 mb-8 max-w-2xl mx-auto'
            variants={itemVariants}
          >
            Build, share, and discover amazing projects. Connect with developers
            and showcase your work to the world on OSAP.
          </motion.p>

          <motion.div
            className='flex gap-4 justify-center items-center'
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => signIn()}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-blue-500/25'
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className='w-5 h-5' />
                </motion.div>
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href='/dashboard'
                className='border border-gray-600 hover:border-gray-400 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200 px-8 py-4 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm'
              >
                Browse Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10'
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10'
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-10'
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional decorative elements */}
        <motion.div
          className='absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-5'
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Features Section */}
      <motion.div
        className='container mx-auto px-6 py-16'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className='grid md:grid-cols-3 gap-8'
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className='text-center p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300'
            variants={featureVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Code className='w-8 h-8 text-white' />
            </motion.div>
            <h3 className='text-xl font-semibold mb-2 text-white'>
              Showcase Code
            </h3>
            <p className='text-gray-300'>
              Display your projects with live links, GitHub repos, and detailed
              descriptions on OSAP.
            </p>
          </motion.div>

          <motion.div
            className='text-center p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-green-500/50 transition-all duration-300'
            variants={featureVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4'
              whileHover={{
                scale: 1.1,
                rotate: -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Users className='w-8 h-8 text-white' />
            </motion.div>
            <h3 className='text-xl font-semibold mb-2 text-white'>Connect</h3>
            <p className='text-gray-300'>
              Network with other developers and collaborate on exciting projects
              through OSAP.
            </p>
          </motion.div>

          <motion.div
            className='text-center p-6 bg-gray-800/30 rounded-xl backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300'
            variants={featureVariants}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4'
              whileHover={{
                scale: 1.1,
                rotate: 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Github className='w-8 h-8 text-white' />
            </motion.div>
            <h3 className='text-xl font-semibold mb-2 text-white'>
              Open Source
            </h3>
            <p className='text-gray-300'>
              Share your code, contribute to others, and grow the developer
              community with OSAP.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
