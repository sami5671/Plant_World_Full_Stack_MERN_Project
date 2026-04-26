import { motion } from "motion/react";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Indoor Plants", icon: "🏠", count: "120+ Items", color: "bg-lime-50" },
  { id: 2, name: "Outdoor Plants", icon: "🌳", count: "80+ Items", color: "bg-emerald-50" },
  { id: 3, name: "Succulents", icon: "🌵", count: "45+ Items", color: "bg-teal-50" },
  { id: 4, name: "Flowering", icon: "🌸", count: "60+ Items", color: "bg-rose-50" },
  { id: 5, name: "Office Plants", icon: "💼", count: "30+ Items", color: "bg-blue-50" },
  { id: 6, name: "Seeds & Pots", icon: "🪴", count: "150+ Items", color: "bg-amber-50" },
];

const Categories = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-24 bg-slate-50/50 dark:bg-slate-900/20 transition-colors duration-500">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-lime-600 dark:text-lime-400 font-bold tracking-widest uppercase text-sm"
            >
              Our Collections
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mt-2 text-slate-900 dark:text-white"
            >
              Shop by <span className="text-gradient dark:text-neon">Categories</span>
            </motion.h2>
          </div>
          <Link to="/allProduct">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-lime-600 dark:text-lime-400 font-bold hover:text-lime-700 dark:hover:text-lime-300 transition-all"
            >
              View All Categories <span>→</span>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group p-6 rounded-3xl ${cat.color} dark:bg-slate-800/40 border border-transparent hover:border-white dark:hover:border-lime-500/30 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all duration-300 cursor-pointer text-center`}
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">{cat.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
