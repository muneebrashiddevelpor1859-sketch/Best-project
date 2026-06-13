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
      <div className={`absolute -inset-1 bg-gradient-to-r ${phone.color} rounded-[30px] blur opacity-20 group-hover:opacity-50 transition duration-500`} />
      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-5 shadow-2xl">
        <img src={phone.img} className="w-full h-44 object-cover rounded-2xl mb-4" />
        <h2 className="text-white text-xl font-bold">{phone.name}</h2>
        <p className="text-gray-400 text-sm mt-1">Next-gen performance</p>
        <div className="flex justify-between items-center mt-6">
          <span className="text-white font-extrabold">PKR {phone.price.toLocaleString()}</span>
          <button
            onClick={() => openModal(phone)}
            className={`px-5 py-2 rounded-full bg-gradient-to-r ${phone.color} font-bold`}
          >Buy</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Static() {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [success, setSuccess] = useState(false);
  const [orders, setOrders] = useState([]);

  // ✅ SAVE ORDER (DATA STORE)
  const handleConfirm = () => {
    const newOrder = {
      id: Date.now(),
      ...selected,
      qty,
      total: selected.price * qty,
      time: new Date().toLocaleString(),
    };

    setOrders((prev) => [...prev, newOrder]);

    console.log("ORDER SAVED:", newOrder);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setSelected(null);
      setQty(1);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-[#050505] text-white px-6 py-20">

      {/* ORDERS DEBUG PANEL */}
      <div className="fixed top-4 right-4 bg-white/5 border border-white/10 p-3 rounded-xl text-xs">
        Orders: {orders.length}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {phones.map((phone, i) => (
          <Card key={i} phone={phone} openModal={setSelected} />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-xl">
            <motion.div className="bg-white/10 border border-white/20 p-8 rounded-3xl w-[400px] text-center">

              {success ? (
                <div>
                  <h2 className="text-2xl text-green-400 font-bold">Order Stored Successfully 🎉</h2>
                  <p className="text-gray-300 mt-2">Your data has been saved locally</p>
                </div>
              ) : (
                <>
                  <img src={selected.img} className="w-full h-48 object-cover rounded-2xl mb-4" />
                  <h2 className="text-xl font-bold">{selected.name}</h2>

                  <div className="flex items-center justify-center gap-6 my-6">
                    <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)} className="px-4 py-2 bg-white/10 rounded-xl">-</button>
                    <span className="text-xl font-bold">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-2 bg-white/10 rounded-xl">+</button>
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-bold"
                  >
                    Confirm Order
                  </button>
                </>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
