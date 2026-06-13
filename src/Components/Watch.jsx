
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function LuxuryHero() {
  const containerRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const videoScale = useTransform(smoothY, [-0.5, 0.5], [1.1, 1.15]);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth - 0.5);
      mouseY.set(e.clientY / innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const onNavigate = () => {
    setIsNavigating(true);
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center font-sans">
      
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover opacity-30 grayscale blur-[2px]" 
          src="/video/bg.mp4" autoPlay muted loop playsInline 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </motion.div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-[95%] max-w-5xl aspect-video md:aspect-[21/9] flex flex-col items-center justify-center rounded-[3rem] border border-white/10 bg-white/[0.03] backdrop-blur-[60px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        <motion.div 
          style={{ x: useTransform(smoothX, [-0.5, 0.5], [-200, 200]), y: useTransform(smoothY, [-0.5, 0.5], [-200, 200]) }}
          className="absolute w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="relative text-center overflow-hidden">
          <motion.h1 
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter text-white uppercase italic"
          >
            AESTHETIC
          </motion.h1>
          <motion.div 
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2"
          />
        </div>

        <motion.p 
          style={{ translateZ: 40 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-blue-200/40 text-xs md:text-sm tracking-[0.6em] font-light uppercase"
        >
          Mastering Motion Design
        </motion.p>

        <div className="mt-12 group">
          <motion.button
            onClick={onNavigate}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-14 py-5 rounded-full border border-white/20 bg-transparent overflow-hidden transition-all duration-700"
          >
            <span className="relative z-10 text-white font-medium tracking-widest text-xs">Last Moment</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <style jsx>{`
              button:hover span { color: black; transition: color 0.4s ease; }
            `}</style>
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute top-10 left-10 overflow-hidden h-6">
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 1.5 }} className="text-white/20 text-[10px] font-mono tracking-tighter uppercase">
          Status: Ready for deployment
        </motion.p>
      </div>

      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="text-black text-xl tracking-[0.5em] font-bolder uppercase"
             >
               Thank you for taking the time to visit my website.
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}