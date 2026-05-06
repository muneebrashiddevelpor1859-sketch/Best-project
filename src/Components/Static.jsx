
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";

const phones = [
  { name: "iPhone 15 Pro", img: "acssets/static1.jpg", price: 450000, color: "from-blue-600 to-cyan-400" },
  { name: "Samsung S24 Ultra", img: "acssets/static2.jpg", price: 380000, color: "from-purple-600 to-pink-500" },
  { name: "Infinix Zero 30", img: "acssets/static3.jpg", price: 85000, color: "from-orange-500 to-yellow-400" },
  { name: "Tecno Camon 30", img: "acssets/static4.jpg", price: 60000, color: "from-emerald-500 to-teal-400" },
];

function Card({ phone, openModal }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(smoothY, [-150, 150], [15, -15]);
  const rotateY = useTransform(smoothX, [-150, 150], [-15, 15]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -10 }}
      className="relative group cursor-pointer"
    >
      {/* Background Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${phone.color} rounded-[30px] blur opacity-20 group-hover:opacity-50 transition duration-500`} />
      
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5 shadow-2xl">
        <div style={{ transform: "translateZ(50px)" }} className="overflow-hidden rounded-2xl mb-4">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={phone.img} 
            className="w-full h-44 object-cover" 
          />
        </div>
        
        <h2 className="text-white text-xl font-bold tracking-tight">{phone.name}</h2>
        <p className="text-gray-400 text-sm mt-1">Next-gen performance</p>
        
        <div className="flex justify-between items-center mt-6">
          <span className="text-white font-extrabold text-lg">PKR {phone.price.toLocaleString()}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => openModal(phone)}
            className={`px-5 py-2 rounded-full bg-gradient-to-r ${phone.color} text-white text-sm font-bold shadow-lg`}
          >
            Buy
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Static() {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelected(null);
      setQty(1);
    }, 2500);
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-20 relative overflow-hidden">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            The Future is Here.
          </motion.h1>
          <p className="text-gray-400 mt-4 text-lg">Exclusive collection of flagship devices</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {phones.map((phone, i) => (
            <Card key={i} phone={phone} openModal={setSelected} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 border border-white/20 p-8 rounded-[40px] w-full max-w-md shadow-2xl text-center"
            >
              {success ? (
                <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">✅</span>
                  </div>
                  <h2 className="text-3xl font-bold">Order Received!</h2>
                  <p className="text-gray-400 mt-2 text-lg">We are processing your request.</p>
                </motion.div>
              ) : (
                <>
                  <img src={selected.img} className="w-full h-48 object-cover rounded-3xl mb-6 shadow-xl" />
                  <h2 className="text-2xl font-bold">{selected.name}</h2>
                  <p className="text-indigo-400 text-xl font-black mt-2">PKR {(selected.price * qty).toLocaleString()}</p>

                  <div className="flex items-center justify-center gap-8 my-8">
                    <button onClick={() => qty > 1 && setQty(qty - 1)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 text-2xl transition">-</button>
                    <span className="text-2xl font-bold">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 text-2xl transition">+</button>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button onClick={handleConfirm} className={`flex-1 py-4 rounded-2xl bg-gradient-to-r ${selected.color} font-bold text-lg shadow-xl active:scale-95 transition`}>Confirm Order</button>
                    <button onClick={() => setSelected(null)} className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-lg hover:bg-white/10 transition">Cancel</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}