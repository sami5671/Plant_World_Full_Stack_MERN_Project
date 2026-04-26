import { Link } from "react-router-dom";
import banner from "../../../assets/images/banner1.png";
import BusinessFeatures from "./BusinessFeatures";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-20 overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-lime-100 dark:bg-lime-900/20 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-emerald-50 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50"
        />
        
        {/* Futuristic Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />
      </div>

      <div className="container mx-auto">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 text-center lg:text-left z-10"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-lime-700 dark:text-lime-400 uppercase bg-lime-100 dark:bg-lime-900/30 rounded-full border border-lime-200 dark:border-lime-800"
            >
              The Future of Greenery
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 text-slate-900 dark:text-white">
              Bring <span className="text-lime-600 dark:text-neon relative">Nature
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 15C50 5 150 5 195 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-lime-600 dark:text-lime-400" />
                </svg>
              </span> into Your Home
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Elevate your living or working space with vibrant, healthy plants.
              Create a cozy, eco-friendly environment filled with calm and
              freshness.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/allProduct">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(101, 163, 13, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 font-outfit text-lg font-bold text-white rounded-full 
                  bg-gradient-to-r from-lime-600 to-emerald-600 dark:from-lime-500 dark:to-emerald-500 shadow-xl transition-all"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/who-we-are">
                <button className="px-10 py-4 font-outfit text-lg font-bold text-slate-700 dark:text-slate-300 rounded-full border-2 border-slate-200 dark:border-slate-800 hover:border-lime-500 dark:hover:border-lime-400 hover:text-lime-600 dark:hover:text-lime-400 transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:w-1/2 w-full relative"
          >
            <div className="relative z-10">
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                src={banner}
                alt="Beautiful Plants"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(101,163,13,0.3)] dark:drop-shadow-[0_20px_50px_rgba(163,230,53,0.2)]"
              />
            </div>
            
            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-10 -right-4 md:right-10 glass-card p-4 rounded-2xl premium-shadow z-20 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Premium Quality</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">100% Organic</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 -left-4 md:left-10 glass-card p-4 rounded-2xl premium-shadow z-20 dark:bg-slate-900/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Trusted by</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">10k+ Plant Lovers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-20 lg:mt-32">
          <BusinessFeatures />
        </div>
      </div>
    </section>
  );
};

export default Banner;
