import { useSelector } from "react-redux";
import ProductCard from "../../shared/productCard/ProductCard";
import SectionTitle from "./../../shared/sectionTitle/SectionTitle";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const TrendingProduct = () => {
  const { trendingProducts } = useSelector((state) => state.products);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-24 bg-white dark:bg-[#020617] transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <SectionTitle
          subHeading="popularized products here"
          heading="Our Trending Trees"
        />
      </motion.div>

      {/* product cards */}
      <div className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {trendingProducts?.map((plant, index) => (
            <motion.div
              key={plant._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard plants={plant} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Link to="/allProduct">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(101, 163, 13, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 font-outfit text-lg font-bold text-white rounded-full bg-slate-900 dark:bg-lime-600 hover:bg-lime-600 dark:hover:bg-lime-500 transition-all shadow-xl"
          >
            View More Products
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default TrendingProduct;
