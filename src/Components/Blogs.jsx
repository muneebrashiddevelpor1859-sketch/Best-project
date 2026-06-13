import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 1. useNavigate import karein

export default function Blogs() {
  const navigate = useNavigate(); // 2. Hook ko initialize karein

  const blogs = [
    { img: "acssets/blog1.jpg", title: "Best Zoom for Mobile" },
    { img: "acssets/blog2 (1).jpg", title: "Glows Camera for Mobile" },
    { img: "acssets/blog3.jpg", title: "Best Shooting Mobile" },
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl text-center font-bold text-white tracking-wide"
        >
          📚 WELCOME TO BLOGS
        </motion.h1>

        <p className="text-center text-gray-300 mt-3">
          Explore latest mobile photography tips & tricks
        </p>

        <div className="container mx-auto px-5 mt-14 grid md:grid-cols-3 gap-8">
          {blogs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.07 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt="blog"
                  className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-6 text-white">
                <h2 className="text-xs tracking-widest text-blue-300">
                  BEST CATEGORY
                </h2>

                <h3 className="text-xl font-semibold mt-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  Discover professional tips to improve your mobile photography skills.
                </p>

                {/* --- BUTTON MODIFIED HERE --- */}
                <button 
                  onClick={() => navigate("/CardCounter")} // 3. Click par Services page par bhej dega
                  className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-sm transition cursor-pointer active:scale-95"
                >
                  Explore More →
                </button>
                {/* --------------------------- */}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}