import { motion } from "motion/react";
import { useState } from "react";
import { useSubscribeMutation } from "../../../features/subscriber/subscriberApi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.warning("Please enter your email");
    }

    try {
      const response = await subscribe({ email }).unwrap();
      if (response.success) {
        toast.success(response.message || "Subscribed successfully!");
        setEmail("");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Subscription failed. Please try again.");
    }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-24 bg-transparent transition-colors duration-500">
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
            className="text-emerald-400 font-bold tracking-widest uppercase text-sm"
          >
            Future Ready
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6"
          >
            Join our <span className="text-emerald-400">Green</span> Community
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
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-grow px-6 py-4 rounded-2xl bg-white/5 dark:bg-white/10 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-all backdrop-blur-md"
              disabled={isLoading}
            />
            <motion.button
              disabled={isLoading}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 min-w-[160px] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <ImSpinner2 className="animate-spin text-xl" />
                  Subscribing...
                </>
              ) : (
                "Subscribe Now"
              )}
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
