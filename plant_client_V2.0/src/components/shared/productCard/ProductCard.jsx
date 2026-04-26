import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { motion } from "motion/react";
import { FaCartShopping } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import useHandleCart from "../../../Hooks/UseHandleCart";
import { cld } from "./../../../api/utils";

const ProductCard = ({ plants }) => {
  const { handleCart, isLoading } = useHandleCart();
  const { _id, name, newPrice, previousPrice, stock, images } = plants;

  // Use the first image if the 4th one (index 3) is missing
  const displayImageId = images?.[3]?.publicId || images?.[0]?.publicId;

  return (
    <Link to={`/product/${_id}`} className="block">
      <motion.div
        whileHover={{ y: -10 }}
        className="group relative bg-white dark:bg-slate-900/40 rounded-3xl p-4 premium-shadow border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:border-lime-200 dark:hover:border-lime-500/50 backdrop-blur-sm"
      >
      {/* Badge */}
      <span className="absolute top-4 left-4 z-10 bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-lime-200 dark:border-lime-800">
        {stock > 0 ? "In Stock" : "Out of Stock"}
      </span>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-4">
        {displayImageId && (
          <motion.img
            src={cld.image(displayImageId).effect(backgroundRemoval()).format("auto").quality("auto").toURL()}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
          />
        )}

        {/* Quick Add Button (Visible on Hover) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          {isLoading ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full h-12 flex items-center justify-center gap-2 bg-slate-900 dark:bg-lime-600 text-white rounded-xl shadow-lg"
            >
              <ImSpinner9 className="animate-spin" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCart(_id);
              }}
              className="w-full h-12 flex items-center justify-center gap-2 bg-lime-600 dark:bg-lime-500 hover:bg-lime-700 dark:hover:bg-lime-400 text-white rounded-xl shadow-lg transition-colors font-bold"
            >
              Add to Cart <FaCartShopping />
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-2 text-left">
        <h3 className="text-slate-800 dark:text-white font-bold text-lg mb-1 line-clamp-1 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lime-600 dark:text-lime-400 font-bold text-xl">${newPrice}</span>
          {previousPrice && <del className="text-slate-400 dark:text-slate-500 text-sm">${previousPrice}</del>}
        </div>
      </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
