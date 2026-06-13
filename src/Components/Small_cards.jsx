// import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
// import { useState } from "react";

// /* CARD */
// function Card({ i, onBuy }) {
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const rotateX = useTransform(y, [-100, 100], [10, -10]);
//   const rotateY = useTransform(x, [-100, 100], [-10, 10]);

//   function handleMouseMove(e) {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     x.set(e.clientX - centerX);
//     y.set(e.clientY - centerY);
//   }

//   function reset() {
//     x.set(0);
//     y.set(0);
//   }

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseLeave={reset}
//       style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//       className="relative rounded-3xl"
//     >
//       <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-teal-400 blur-xl opacity-30" />

//       <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden p-4">
//         <img
//           src={`acssets/small-card/img${i + 1}.jpg`}
//           className="w-full h-52 object-cover rounded-2xl"
//         />

//         <div className="mt-4">
//           <h2 className="text-lg font-semibold">Mobile {i + 1}</h2>

//           <div className="flex justify-between items-center mt-4">
//             <span className="text-teal-400 font-bold text-lg">
//               ${10 + i * 3}
//             </span>

//             <button
//               onClick={() =>
//                 onBuy({
//                   name: `Mobile ${i + 1}`,
//                   price: 10 + i * 3,
//                   img: `acssets/small-card/img${i + 1}.jpg`,
//                   quantity: 1,
//                 })
//               }
//               className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-teal-400"
//             >
//               Buy
//             </button>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* MAIN */
// export default function Cards() {
//   const [cartItem, setCartItem] = useState(null);
//   const [isAdded, setIsAdded] = useState(false);

//   // 🔥 NEW: FULL CART ARRAY
//   const [cart, setCart] = useState([]);

//   // 🔥 Navbar Count
//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   // 🔥 Add to cart logic
//   const addToCart = (item) => {
//     setCart((prev) => {
//       const exist = prev.find((i) => i.name === item.name);

//       if (exist) {
//         return prev.map((i) =>
//           i.name === item.name
//             ? { ...i, quantity: i.quantity + item.quantity }
//             : i
//         );
//       } else {
//         return [...prev, item];
//       }
//     });
//   };
// const updateQuantity = (amount) => {
//   setCartItem((prev) => {
//     if (!prev) return prev;

//     const newQty = prev.quantity + amount;
//     if (newQty < 1) return prev;

//     return { ...prev, quantity: newQty };
//   });
// };

//   const handleAddToCart = () => {
//     addToCart(cartItem); // 🔥 MAIN MAGIC

//     setIsAdded(true);
//     setTimeout(() => {
//       setIsAdded(false);
//       setCartItem(null);
//     }, 2000);
//   };

//   return (
//     <section className="relative min-h-screen py-24 text-white overflow-hidden">

//       {/* 🔥 NAVBAR BUTTON */}
//       <div className="fixed top-6 right-6 z-50">
//         <div className="relative bg-white/10 backdrop-blur-xl px-6 py-2 rounded-xl">
//           🛒 Cart
//           {totalItems > 0 && (
//             <span className="absolute -top-2 -right-2 bg-teal-400 text-black text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
//               {totalItems}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Background */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover brightness-50"
//         src="videos/5.mp4"
//         autoPlay
//         loop
//         muted
//       />
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

//       <div className="relative z-10">
//         <h1 className="text-center text-5xl font-bold mb-16">
//           Premium Collection
//         </h1>

//         <div className="container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-10">
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
//             <Card key={i} i={i} onBuy={setCartItem} />
//           ))}
//         </div>
//       </div>

//       {/* MODAL */}
//       <AnimatePresence>
//         {cartItem && (
//           <div className="fixed inset-0 flex items-center justify-center z-50">

//             <div
//               onClick={() => !isAdded && setCartItem(null)}
//               className="absolute inset-0 bg-black/70"
//             />

//             <div className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-6">

//               {isAdded ? (
//                 <div className="text-center py-10">
//                   <div className="text-5xl">✅</div>
//                   <h2 className="text-xl mt-2">Added!</h2>
//                 </div>
//               ) : (
//                 <>
//                   <img src={cartItem.img} className="rounded-xl mb-4" />

//                   <h2 className="text-xl">{cartItem.name}</h2>

//                   <div className="flex justify-between mt-4">
//                     <span>${cartItem.price * cartItem.quantity}</span>

//                     <div className="flex gap-3">
//                       <button onClick={() => updateQuantity(-1)}>-</button>
//                       <span>{cartItem.quantity}</span>
//                       <button onClick={() => updateQuantity(1)}>+</button>
//                     </div>
//                   </div>

//                   <button
//                     onClick={handleAddToCart}
//                     className="w-full mt-5 py-2 bg-teal-400 text-black rounded-xl"
//                   >
//                     Add to Cart
//                   </button>
//                 </>
//               )}

//             </div>
//           </div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }











import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* CARD */
function Card({ i, onBuy }) {
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
      className="relative rounded-3xl"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-teal-400 blur-xl opacity-30" />

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden p-4">
        <img
          src={`acssets/small-card/img${i + 1}.jpg`}
          className="w-full h-52 object-cover rounded-2xl"
        />

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Mobile {i + 1}</h2>

          <div className="flex justify-between items-center mt-4">
            <span className="text-teal-400 font-bold text-lg">
              ${10 + i * 3}
            </span>

            <button
              onClick={() =>
                onBuy({
                  name: `Mobile ${i + 1}`,
                  price: 10 + i * 3,
                  img: `acssets/small-card/img${i + 1}.jpg`,
                  quantity: 1,
                })
              }
              className="px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-indigo-500 to-teal-400"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* MAIN */
export default function Cards() {
  const [cartItem, setCartItem] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // 🔥 NEW

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.name === item.name);

      if (exist) {
        return prev.map((i) =>
          i.name === item.name
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const updateQuantity = (amount) => {
    setCartItem((prev) => {
      if (!prev) return prev;
      const newQty = prev.quantity + amount;
      if (newQty < 1) return prev;
      return { ...prev, quantity: newQty };
    });
  };

  const handleAddToCart = () => {
    addToCart(cartItem);
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
      setCartItem(null);
    }, 1500);
  };

  return (
    <section className="relative min-h-screen py-24 text-white overflow-hidden">

      {/* 🛒 NAVBAR BUTTON */}
      <div className="fixed top-6 right-6 z-50">
        <div
          onClick={() => setIsCartOpen(true)}
          className="relative cursor-pointer bg-white/10 backdrop-blur-xl px-6 py-2 rounded-xl hover:scale-105 transition"
        >
          🛒 Cart
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-teal-400 text-black text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
              {totalItems}
            </span>
          )}
        </div>
      </div>

      {/* Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="videos/5.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10">
        <h1 className="text-center text-5xl font-bold mb-16">
          Premium Collection
        </h1>

        <div className="container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <Card key={i} i={i} onBuy={setCartItem} />
          ))}
        </div>
      </div>

      {/* 🔥 CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">

            <div
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="relative w-[320px] h-full bg-white/10 backdrop-blur-2xl p-5"
            >
              <h2 className="text-xl font-bold mb-5">🛒 Your Cart</h2>

              {cart.length === 0 ? (
                <p className="text-gray-400">Cart is empty</p>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="mb-4 border-b border-white/10 pb-3">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span>${item.price * item.quantity}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      <AnimatePresence>
        {cartItem && (
          <div className="fixed inset-0 flex items-center justify-center z-50">

            <div
              onClick={() => !isAdded && setCartItem(null)}
              className="absolute inset-0 bg-black/70"
            />

            <div className="relative w-[90%] max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-6">

              {isAdded ? (
                <div className="text-center py-10">
                  <div className="text-5xl">✅</div>
                  <h2 className="text-xl mt-2">Added!</h2>
                </div>
              ) : (
                <>
                  <img src={cartItem.img} className="rounded-xl mb-4" />
                  <h2 className="text-xl">{cartItem.name}</h2>

                  <div className="flex justify-between mt-4">
                    <span>${cartItem.price * cartItem.quantity}</span>

                    <div className="flex gap-3">
                      <button onClick={() => updateQuantity(-1)}>-</button>
                      <span>{cartItem.quantity}</span>
                      <button onClick={() => updateQuantity(1)}>+</button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full mt-5 py-2 bg-teal-400 text-black rounded-xl"
                  >
                    Add to Cart
                  </button>
                </>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}