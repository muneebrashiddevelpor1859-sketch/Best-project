import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Card({ item, i, onBuy }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative rounded-3xl"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-teal-400 blur-xl opacity-30" />
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden p-4">
        <img
          src={`acssets/small-card/img${i + 1}.jpg`}
          className="w-full h-52 object-cover rounded-2xl hover:scale-110 transition duration-700"
        />
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Mobile {i + 1}</h2>
          <p className="text-gray-300 text-sm mt-1">Ultra performance flagship</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-teal-400 font-bold text-lg">${10 + i * 3}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onBuy({
                name: `Mobile ${i + 1}`,
                price: 10 + i * 3,
                img: `acssets/small-card/img${i + 1}.jpg`,
                quantity: 1 
              })}
              className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-teal-400"
            >
              Buy
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Cards() {
  const [cartItem, setCartItem] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  const updateQuantity = (amount) => {
    if (cartItem.quantity + amount >= 1) {
      setCartItem({ ...cartItem, quantity: cartItem.quantity + amount });
    }
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setCartItem(null);
    }, 2000);
  };

  return (
    <section className="relative min-h-screen py-24 text-white overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="videos/5.mp4" autoPlay loop muted playsInline
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-teal-400 text-transparent bg-clip-text">
            Premium Collection
          </h1>
        </div>

        <div className="container mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <Card key={i} i={i} onBuy={setCartItem} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cartItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isAdded && setCartItem(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="relative w-[90%] max-w-md bg-white/10 border border-white/20 backdrop-blur-2xl rounded-3xl p-6 text-white text-center"
            >
              {isAdded ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10"
                >
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-2xl font-bold">Added to Cart!</h2>
                  <p className="text-gray-300 italic">Get ready for your new device...</p>
                </motion.div>
              ) : (
                <>
                  <img src={cartItem.img} className="w-full h-52 object-cover rounded-2xl mb-4" />
                  <h2 className="text-2xl font-bold text-left">{cartItem.name}</h2>
                  
                  <div className="flex justify-between items-center mt-5">
                    <span className="text-teal-400 text-xl font-bold">
                      ${cartItem.price * cartItem.quantity}
                    </span>

                    <div className="flex items-center gap-4 bg-white/5 px-3 py-1 rounded-xl border border-white/10">
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(-1)}
                        className="text-xl font-bold w-8 h-8 flex items-center justify-center hover:text-teal-400"
                      >
                        -
                      </motion.button>
                      <span className="text-lg font-medium w-4 text-center">{cartItem.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => updateQuantity(1)}
                        className="text-xl font-bold w-8 h-8 flex items-center justify-center hover:text-teal-400"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 font-semibold shadow-lg shadow-indigo-500/20"
                  >
                    Confirm & Add to Cart
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
