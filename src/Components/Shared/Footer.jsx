import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Footer() {
  const ref = useRef(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [12, -12]);
  const rotateY = useTransform(x, [-120, 120], [-12, 12]);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      setStatus("Enter email first");
      return;
    }

    setStatus("Sending...");

    setTimeout(() => {
      setStatus("Subscribed successfully ✅");
      setEmail("");
    }, 1000);
  }

  return (
    <footer className="relative min-h-[650px] flex items-center justify-center text-white overflow-hidden">

      {/* 🌌 NEW PREMIUM BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#05070f] via-[#070a14] to-[#02030a]"></div>

      {/* glowing orbs */}
      <motion.div
        animate={{ x: [0, 80, -80, 0], y: [0, -60, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[180px] rounded-full top-[-150px] left-[20%]"
      />

      <motion.div
        animate={{ x: [0, -60, 60, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[160px] rounded-full bottom-[-150px] right-[10%]"
      />

      {/* 3D CARD */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="relative w-[92%] max-w-6xl p-14 rounded-[34px] 
        bg-white/5 backdrop-blur-3xl border border-white/10 
        shadow-[0_70px_200px_rgba(0,0,0,0.95)]"
      >

        {/* inner glow layer */}
        <div className="absolute inset-0 rounded-[34px] bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-20"></div>
        <div className="absolute inset-0 rounded-[34px] border border-white/5"></div>

        <div className="relative z-10">

          {/* TOP */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">

            {/* Brand */}
            <div>
              <h2 className="text-5xl font-semibold tracking-tight">
                Mobile <span className="text-white/60">Zone</span>
              </h2>
              <p className="text-gray-400 mt-4 text-sm max-w-sm leading-relaxed">
                Futuristic smartphones with premium design and next-gen performance.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-10 text-sm text-gray-400">
              {["Home", "About", "Services", "Pricing", "Contact"].map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -4, color: "#fff" }}
                  className="cursor-pointer transition"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* INPUT */}
          <div className="mt-14 max-w-md mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent outline-none text-sm"
              />

              <button
                type="submit"
                className="px-6 bg-gradient-to-r from-indigo-500 to-cyan-400 text-sm font-medium hover:opacity-90 transition"
              >
                Join
              </button>
            </form>

            {status && (
              <p className="text-xs text-gray-400 mt-2 text-center">{status}</p>
            )}
          </div>

          {/* Divider */}
          <div className="mt-14 h-[1px] bg-white/10"></div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6">

            <div className="flex gap-5">
              {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl"
                >
                  {icon}
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-xs">
              © 2026 Mobile Zone — Crafted in 3D UI
            </p>

          </div>

        </div>
      </motion.div>

      <motion.button
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  whileHover={{ scale: 1.15 }}
  whileTap={{ scale: 0.9 }}
  className="fixed bottom-6 right-6 z-50 
  px-5 py-3 rounded-full 
  bg-gradient-to-r from-indigo-500 to-cyan-400 
  text-white text-sm font-medium 
  shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
>
  ↑ Top
</motion.button>

    </footer>
  );
}