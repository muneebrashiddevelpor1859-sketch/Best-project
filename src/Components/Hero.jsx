
import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">

      <video
        className="absolute inset-0 w-full h-full object-cover scale-125 brightness-50 contrast-125 saturate-150"
        src="/videos/iphone video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/90"></div>

      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[120px]"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm text-gray-300 border border-white/20"
        >
          🚀 Latest Smartphones 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-4xl md:text-7xl font-extrabold leading-tight"
        >
          Next Gen <br />
          <span className="bg-gradient-to-r from-indigo-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Mobile Experience
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-gray-300 max-w-xl mt-6 text-lg"
        >
          Discover powerful performance, cinematic cameras, and stunning design — all in one place.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-medium shadow-xl hover:shadow-indigo-500/50"
          >
            🚀 Explore Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
          >
            ▶ Watch Demo
          </motion.button>

        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 flex flex-col items-center text-white/60"
        >
          <div className="w-5 h-9 border border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white mt-2 rounded-full"></div>
          </div>
          <span className="text-xs mt-2">Scroll</span>
        </motion.div>

      </div>
    </div>
  );
}

export default Hero;










