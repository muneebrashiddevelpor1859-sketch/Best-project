import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Services", path: "/Services" },
    { name: "Pricing", path: "/Pricing" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-5 py-3">

        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-xl flex items-center justify-center">
            📱
          </div>
          <span className="text-xl font-bold">
            Mobile <span className="text-teal-400">Zone</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8 text-white">

          {links.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <span
                    className={`${
                      active ? "text-teal-400" : "text-white"
                    }`}
                  >
                    {item.name}
                  </span>

                  {active && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-indigo-400 to-teal-400"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}

        </div>

        <div className="flex items-center gap-4">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400"
          >
            Sign Up
          </motion.button>

          {/* MOBILE MENU BUTTON */}
          <div
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            ☰
          </div>
        </div>

      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/90 backdrop-blur-xl text-white px-5 py-5 space-y-4"
          >
            {links.map((item) => (
              <Link key={item.path} to={item.path}>
                <div
                  onClick={() => setOpen(false)}
                  className="hover:text-teal-400"
                >
                  {item.name}
                </div>
              </Link>
            ))}

            <button className="w-full mt-3 py-2 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full">
              Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}