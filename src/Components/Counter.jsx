import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function CounterBox({ end, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      whileHover={{ scale: 1.08 }}
      className="relative group p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-teal-500/20 transition-all"
    >

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition"></div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300 drop-shadow-lg relative z-10">
        {count}+
      </h2>

      <p className="text-gray-300 mt-3 tracking-wide relative z-10">
        {label}
      </p>

    </motion.div>
  );
}

export default function Counter() {
  return (
    <section className="relative text-gray-300 py-24 overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.85),rgba(10,10,10,0.9)),url('acssets/smallbg1.webp')] bg-cover bg-center"></div>

      <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-400/20 blur-3xl rounded-full"></div>

      <div className="relative container mx-auto px-5">

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl md:text-4xl font-bold text-white mb-14"
        >
          🚀 Our Achievements
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <CounterBox end={2700} label="Happy Users" />
          <CounterBox end={1800} label="Subscribers" />
          <CounterBox end={35} label="Downloads" />
          <CounterBox end={4} label="Products" />

        </div>

      </div>
    </section>
  );
}