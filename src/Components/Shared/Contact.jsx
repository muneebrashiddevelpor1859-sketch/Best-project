import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    }, 1500);

    
  };

  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 overflow-hidden text-white">

      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-950 to-purple-900"></div>

      {/* GLOW */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 max-w-5xl w-full">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Let’s Talk 👋
          </h1>

          <p className="text-gray-300 mt-4">
            Have an idea or project? Send us a message and we’ll get back to you within 24 hours.
          </p>

          <div className="mt-6 space-y-3 text-gray-300">
            <p>📧 support@mobilezone.com</p>
            <p>📱 +92 300 1234567</p>
            <p>📍 Pakistan</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl"
        >

          <div className="space-y-4">

            <input
              required
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <input
              required
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <textarea
              required
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
            />

          </div>

          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center text-green-400 font-medium"
              >
                ✔ Message Sent Successfully!
              </motion.div>
            )}
          </AnimatePresence>

        </motion.form>

      </div>
    </section>
  );
}