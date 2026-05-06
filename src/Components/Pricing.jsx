import { motion, useMotionValue, useTransform } from "framer-motion";

const plans = [
  { name: "Start", speed: "5 Mb/s", storage: "15 GB", price: "Free" },
  { name: "Pro", speed: "25 Mb/s", storage: "25 GB", price: "$24", popular: true },
  { name: "Business", speed: "36 Mb/s", storage: "40 GB", price: "$50" },
  { name: "Exclusive", speed: "48 Mb/s", storage: "120 GB", price: "$72" },
];

export default function Pricing() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 py-24 overflow-hidden">

  
      <video
        className="absolute inset-0 w-full h-full object-cover brightness-50"
        src="/videos/3.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 w-full text-center">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold text-white"
        >
          Simple{" "}
          <span className="bg-gradient-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            Pricing
          </span>
        </motion.h1>

        <p className="text-gray-300 mt-3">
          Choose a plan that grows with your needs
        </p>

        <div className="mt-16 grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">

          {plans.map((plan, i) => {

            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const rotateX = useTransform(y, [-100, 100], [12, -12]);
            const rotateY = useTransform(x, [-100, 100], [-12, 12]);

            const lightX = useTransform(x, [-100, 100], ["0%", "100%"]);
            const lightY = useTransform(y, [-100, 100], ["0%", "100%"]);

            function handleMouseMove(e) {
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;

              x.set(e.clientX - centerX);
              y.set(e.clientY - centerY);
            }

            function handleLeave() {
              x.set(0);
              y.set(0);
            }

            return (
              <motion.div
                key={i}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.1 }}
                className="relative"
              >

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 to-teal-400 blur-xl opacity-30"></div>

                <div className={`relative rounded-3xl p-6 border backdrop-blur-xl bg-white/10 
                ${plan.popular ? "border-teal-400" : "border-white/20"}`}>

                  <motion.div
                    style={{
                      background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.25), transparent 40%)`,
                    }}
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                  />

                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-400 text-black text-xs px-3 py-1 rounded-full font-semibold">
                      MOST POPULAR
                    </div>
                  )}

                  <div style={{ transform: "translateZ(40px)" }}>

                    <h2 className="text-xl font-bold text-white">
                      {plan.name}
                    </h2>

                    <p className="text-gray-300 mt-4">⚡ {plan.speed}</p>
                    <p className="text-gray-300">💾 {plan.storage}</p>

                    <h3 className="text-3xl font-extrabold mt-5 text-teal-300">
                      {plan.price}
                    </h3>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.1 }}
                      className="mt-6 w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400"
                    >
                      Select Plan
                    </motion.button>

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

        <div className="mt-12">
          <button className="text-gray-300 hover:text-teal-300 underline transition">
            Compare all features →
          </button>
        </div>

      </div>
    </section>
  );
}