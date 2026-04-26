import img1 from "../../../assets/images/tree4.gif";
import img2 from "../../../assets/images/tree5.gif";
import SectionTitle from "../../shared/sectionTitle/SectionTitle";
import { motion } from "motion/react";

const WhoWeAre = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-24 overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle heading="Who we are" subHeading="Know about Ourself" />
      </motion.div>

      <div className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Image side with decorative background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative"
        >
          <div className="absolute -inset-4 bg-lime-100/50 dark:bg-lime-900/20 rounded-full blur-3xl -z-10" />
          <div className="relative z-10 flex justify-center">
            <motion.img
              animate={{
                y: [0, -15, 0],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={img2}
              className="w-full max-w-md hidden lg:block drop-shadow-2xl"
              alt="Our Story"
            />
            <img src={img1} className="w-full max-w-sm block lg:hidden" alt="Our Story" />
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-slate-900 dark:text-white">
            We are dedicated to <span className="text-lime-600 dark:text-lime-400">greening</span> your life
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Welcome to our plant world, where the Flourish Tree reigns,
            creating a serene ambiance. Our commitment to consistent and
            trustworthy support ensures your every need is met. Like the
            plants we offer, our maintenance is top-notch, guaranteeing their
            well-being.
          </p>
          
          <div className="space-y-4 mb-10">
            {[
              "Budget-friendly selections",
              "Free & secure delivery service",
              "Expert plant care maintenance",
              "24/7 dedicated support"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-lime-100 dark:bg-lime-900/40 text-lime-600 dark:text-lime-400 rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(101, 163, 13, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 font-outfit text-lg font-bold text-white rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 shadow-xl shadow-lime-600/20 transition-all"
          >
            Learn Our Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAre;
