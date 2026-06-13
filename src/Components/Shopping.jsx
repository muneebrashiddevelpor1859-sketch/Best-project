import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModernCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">

      {/* Floating Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 shadow-lg hover:shadow-blue-500/20 transition-all"
      >
        <span className="text-xl">🛒</span>
        <span className="font-bold">Basket (2)</span>
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white/10 backdrop-blur-2xl border-l border-white/20 z-50 shadow-2xl flex flex-col"
            >
              
              {/* Header */}
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-black">My Cart</h2>
                  <p className="text-xs text-blue-400 uppercase tracking-widest">
                    Premium Selection
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 transition"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* Item Card */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between font-bold">
                      <span>Luxury Watch</span>
                      <span className="text-blue-400">$150</span>
                    </div>

                    <p className="text-gray-400 text-sm mt-1">
                      Silver / Leather
                    </p>

                    <div className="flex justify-between items-center mt-4">

                      {/* Quantity */}
                      <div className="flex items-center gap-3 bg-white/10 px-3 py-1 rounded-lg">
                        <button className="hover:text-blue-400">−</button>
                        <span>1</span>
                        <button className="hover:text-blue-400">+</button>
                      </div>

                      {/* Delete */}
                      <button className="hover:text-red-400 transition">
                        🗑️
                      </button>
                    </div>
                  </div>
                </motion.div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/10 bg-black/30 backdrop-blur-xl">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-black text-blue-400">
                    $150.00
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 font-bold shadow-lg hover:shadow-blue-500/40 transition"
                >
                  Checkout →
                </motion.button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCart;