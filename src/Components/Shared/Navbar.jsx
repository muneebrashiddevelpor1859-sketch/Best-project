import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // 1. Cart ka state (Isse aap 0 se start kar sakte hain)
  const [cartCount, setCartCount] = useState(0); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Demo ke liye: 2 second baad counter badhane ka function
    // Real project mein yahan aapka logic aayega
    const timer = setTimeout(() => setCartCount(3), 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
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
        scrolled ? "bg-black/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <span className="p-2 bg-indigo-600 rounded-lg">📱</span>
          <span>Mobile <span className="text-teal-400">Zone</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          {links.map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-teal-400 transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart & Buttons */}
        <div className="flex items-center gap-5">
          
          {/* Working Cart Counter */}
       {/* Working Cart Counter */}
<Link 
  to="" // Yahan pehle "/cart" tha, humne ise "/Services" kar diya
  className="relative group p-2 cursor-pointer"
>
  {/* <div className="text-2xl text-white">
    🛒 
  </div>
   */}
  <AnimatePresence>
    {cartCount > 0 && (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black font-bold"
      >
        {cartCount}
      </motion.span>
    )}
  </AnimatePresence>
</Link>

          {/* <button className="hidden md:block px-6 py-2 bg-teal-500 text-white rounded-full font-semibold hover:bg-teal-600 transition-all">
            Sign Up
          </button> */}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-3xl" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-black text-white px-6 py-6 space-y-4 overflow-hidden border-t border-white/10"
          >
            {links.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setOpen(false)} className="block text-lg border-b border-white/5 pb-2">
                {item.name}
              </Link>
            ))}
            <button className="w-full py-3 bg-indigo-600 rounded-lg">Sign Up</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}