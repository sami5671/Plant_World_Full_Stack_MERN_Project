import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import OrderSummary from "./OrderSummary";
import ProductCarousel from "./ProductCarousel";
import ProductDetailsTable from "./ProductDetailsTable";
import DOMPurify from "dompurify";
import { motion } from "motion/react";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: plants,
    isError,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(id);

  const plant = plants?.data;
  const plantImg = plant?.images;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#020617]">
        <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-12 bg-white dark:bg-[#020617] transition-colors duration-500">
      <div className="container mx-auto">
        {/* Product Carousel and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <ProductCarousel plantImg={plantImg} />
          </motion.div>

          {/* Middle Column: Product Details Table */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4"
          >
            <ProductDetailsTable plant={plant} />
          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-32">
              <OrderSummary />
            </div>
          </motion.div>
        </div>

        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 glass-card p-8 md:p-12 rounded-[2.5rem] dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none"
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-1 bg-lime-500 rounded-full" />
            About This Plant
          </h3>
          <div
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed prose prose-slate dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(plant?.description),
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDetails;
