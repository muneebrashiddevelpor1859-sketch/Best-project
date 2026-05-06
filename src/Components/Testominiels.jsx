
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    img: "acssets/testnomi/tes1.jpg",
    title: "Next-Gen Pro",
    tag: "Performance",
    desc: "Experience the boundary of digital speed and fluid aesthetics.",
  },
  {
    img: "acssets/testnomi/tes2.jpg",
    title: "Optic Vision",
    tag: "Photography",
    desc: "Every pixel tells a story of light and shadow in ultra-depth.",
  },
  {
    img: "acssets/testnomi/tes3.jpg",
    title: "Pure Clarity",
    tag: "Display",
    desc: "Colors so vibrant they blur the line between reality and screen.",
  },
];

function InteractiveCard({ item, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
    const mouseYRelative = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(mouseXRelative);
    mouseY.set(mouseYRelative);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full [perspective:1000px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full rounded-[2rem] border border-white/20 bg-slate-950/40 p-4 backdrop-blur-md transition-all duration-500 ease-out group-hover:border-indigo-500/50"
      >
        <div className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-[10px] uppercase tracking-widest text-indigo-300">
          {item.tag}
        </div>

        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-zinc-900">
          <motion.img
            src={item.img}
            alt={item.title}
            className="h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
          />

          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.15),transparent_80%)]" />

          <div className="absolute inset-x-0 bottom-0 z-20 translate-z-[50px] bg-gradient-to-t from-black via-black/80 to-transparent p-8">
            <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 transform transition-all duration-500 group-hover:text-gray-200">
              {item.desc}
            </p>
            
            <div className="mt-4 h-1 w-0 bg-indigo-500 transition-all duration-500 group-hover:w-full" />
          </div>
        </div>

        <div className="absolute -inset-2 -z-10 rounded-[2.5rem] bg-indigo-500/0 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20" />
      </motion.div>
    </motion.div>
  );
}

export default function LuxuryTestimonials() {
  return (
    <section className="relative min-h-screen bg-[#030014] py-24 px-6 overflow-hidden">
      
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-400 text-sm font-semibold tracking-[0.3em] uppercase"
          >
            Our Impact
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-4 text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Voice of the <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 to-indigo-500">Future.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-1">
               <img src={testimonials[0].img} className="absolute inset-0 h-full w-full object-cover opacity-20" />
               <div className="relative z-10 flex h-full flex-col justify-center p-12">
                  <span className="mb-4 w-fit rounded-full bg-indigo-500/20 px-4 py-1 text-xs font-bold text-indigo-300">FEATURED REVIEWS</span>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">Revolutionary Performance.</h3>
                  <p className="max-w-xl text-lg text-gray-400">"This isn't just technology; it's a leap into the next decade. The speed and clarity are unmatched in today's market."</p>
                  <div className="mt-8 flex gap-4">
                     <div className="h-12 w-12 rounded-full bg-indigo-600" />
                     <div>
                        <p className="font-bold text-white">MOBILE ZONE</p>
                        <p className="text-sm text-gray-500">The best Mobile zone</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            {testimonials.slice(1).map((item, i) => (
              <InteractiveCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}