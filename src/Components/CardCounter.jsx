import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const serviceDetails = [
  {
    id: 1,
    title: "Cinematic Videography",
    desc: "Experience 8K recording with advanced stabilization and AI-driven color grading for professional results.",
    video: "public/videos/ext2.mp4", // Aapka video path
    features: ["8K RAW", "Pro-Res Support", "AI Motion Tracking"]
  },
  {
    id: 2,
    title: "Extreme Gaming Power",
    desc: "Unleash the beast with our specialized gaming optimization that ensures 120FPS on every flagship title.",
    video: "public/videos/ext1.mp4", // Aapka video path
    features: ["Liquid Cooling", "Ray Tracing", "Game Turbo 5.0"]
  }
];

export default function ServicePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter opacity-20 absolute left-0 right-0 top-10 select-none">
            EXPLORE SERVICES
          </h1>
          <h2 className="relative z-10 text-4xl md:text-6xl font-bold mt-10">
            Next-Gen Features
          </h2>
        </motion.div>

        {/* Services List with Videos */}
        <div className="space-y-32">
          {serviceDetails.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-16 items-center`}
            >
              
              {/* VIDEO CONTAINER */}
              <div className="w-full md:w-3/5 group relative">
                <div className="absolute -inset-4 bg-blue-500/10 rounded-[40px] blur-3xl group-hover:bg-blue-500/20 transition duration-700" />
                
                <div className="relative aspect-video overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-2xl">
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  />
                  {/* Overlay for better text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="w-full md:w-2/5 space-y-6">
                <motion.span className="text-blue-400 font-mono tracking-[0.3em] text-sm uppercase">
                  Service 0{index + 1}
                </motion.span>
                <h3 className="text-4xl font-black italic">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.features.map(f => (
                    <span key={f} className="text-[10px] border border-white/20 px-3 py-1 rounded-full uppercase tracking-widest text-gray-300">
                      {f}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="group flex items-center gap-3 text-white font-bold py-4"
                >
                  LEARN MORE 
                  <span className="w-10 h-[2px] bg-blue-500 group-hover:w-16 transition-all duration-300" />
                </motion.button>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}