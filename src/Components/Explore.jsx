import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

const phones = [
  { id: 1, name: "iPhone 15 Pro", img: "acssets/explore now/qw1.jpeg", price: 450000, color: "from-blue-500 to-cyan-400", tag: "Flagship" },
  { id: 2, name: "Samsung S24 Ultra", img: "acssets/explore now/qw2.jpeg", price: 380000, color: "from-purple-500 to-pink-500", tag: "Hot" },
  { id: 3, name: "Infinix Zero 30", img: "acssets/explore now/qw3.jpeg", price: 85000, color: "from-orange-400 to-yellow-300", tag: "Budget" },
  { id: 4, name: "Tecno Camon 30", img: "acssets/explore now/qw4.jpeg", price: 60000, color: "from-emerald-400 to-teal-300", tag: "New" },
];

function Card({ phone, openModal }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [18, -18]);
  const rotateY = useTransform(x, [-150, 150], [-18, 18]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <div className={`absolute -inset-1 bg-gradient-to-r ${phone.color} rounded-[30px] blur-xl opacity-30`} />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-5 shadow-xl">
        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-gradient-to-r ${phone.color} text-white`}>{phone.tag}</span>

        <img src={phone.img} className="w-full h-52 object-cover rounded-2xl mb-4" />

        <h2 className="text-lg font-semibold">{phone.name}</h2>
        <p className="text-gray-300 text-sm">PKR {phone.price.toLocaleString()}</p>

        <button
          onClick={() => openModal(phone)}
          className={`mt-4 w-full py-2 rounded-xl bg-gradient-to-r ${phone.color} font-semibold`}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default function Static() {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [toast, setToast] = useState(false);

  const addToCart = () => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === selected.id);
      if (exist) {
        return prev.map((i) => i.id === selected.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...selected, qty }];
    });

    setToast(true);
    setTimeout(() => setToast(false), 1200);

    setSelected(null);
    setQty(1);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black text-white px-6 py-24">

      {/* CART BUTTON */}
      <button
        onClick={() => setOpenCart(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-blue-500 px-5 py-3 rounded-full shadow-lg"
      >
        🛒 {cart.reduce((a, b) => a + b.qty, 0)}
      </button>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 px-6 py-2 rounded-xl"
          >
            Added to Cart ✓
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {phones.map((p) => (
          <Card key={p.id} phone={p} openModal={setSelected} />
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl w-[380px] border border-white/20"
            >
              <img src={selected.img} className="rounded-xl mb-4" />
              <h2 className="text-xl font-semibold">{selected.name}</h2>

              <div className="flex justify-between items-center my-4">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button
                onClick={addToCart}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500"
              >
                Confirm Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART */}
      <AnimatePresence>
        {openCart && (
          <motion.div className="fixed inset-0 z-50 flex justify-end">
            <div onClick={() => setOpenCart(false)} className="absolute inset-0 bg-black/60" />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="w-[340px] h-full bg-[#111] p-5"
            >
              <h2 className="text-xl mb-4">Your Cart</h2>

              {cart.length === 0 ? (
                <p className="text-gray-400">Cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="mb-3 border-b border-white/10 pb-2">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span>PKR {item.price * item.qty}</span>
                    </div>
                    <p className="text-sm text-gray-400">Qty: {item.qty}</p>
                  </div>
                ))
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
