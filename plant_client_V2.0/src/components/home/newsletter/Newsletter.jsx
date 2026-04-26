import { motion } from "motion/react";

const Newsletter = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-24 bg-white dark:bg-[#020617] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3.5rem] bg-slate-900 dark:bg-slate-900/40 px-8 py-20 text-center shadow-2xl border border-white/5 dark:border-white/10"
      >
        {/* Background Decorative Circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-lime-500/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lime-400 font-bold tracking-widest uppercase text-sm"
          >
            Future Ready
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
          >
            Join our <span className="text-neon">Green</span> Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-10 leading-relaxed"
          >
            Subscribe to receive plant care tips, exclusive offers, and the latest arrivals directly in your inbox.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-lime-500 transition-all backdrop-blur-md"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(163, 230, 53, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg"
            >
              Subscribe Now
            </motion.button>
          </motion.form>
          
          <p className="mt-6 text-slate-500 text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
