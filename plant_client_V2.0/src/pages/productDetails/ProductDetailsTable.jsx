import { FaShoppingCart, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ProductDetailsTable = ({ plant }) => {
  const isAvailable = typeof plant?.stock === 'number' ? plant.stock > 0 : plant?.stock?.toLowerCase() === "in stock";

  return (
    <div className="font-outfit">
      {/* Product Name */}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        {plant?.name}
      </h2>
      
      {/* Price Section */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl font-bold text-lime-600 dark:text-lime-400">
          ${plant?.newPrice}
        </span>
        {plant?.previousPrice && (
          <del className="text-2xl text-slate-400 dark:text-slate-500">
            ${plant?.previousPrice}
          </del>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 mb-8 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl w-fit">
        <span className="font-bold text-slate-700 dark:text-slate-300">Rating: </span>
        <div className="flex text-amber-400">
          {"★".repeat(plant?.rating || 0)}
          {"☆".repeat(5 - (plant?.rating || 0))}
        </div>
      </div>

      {/* Details Table */}
      <div className="space-y-4 mb-10">
        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Availability</span>
          <span className={`flex items-center gap-2 font-bold ${isAvailable ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600"}`}>
            {isAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
            {typeof plant?.stock === 'number' ? `${plant.stock} in Stock` : plant?.stock}
          </span>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Category</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">{plant?.category || 'General'}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Plant Type</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">{plant?.plantType}</span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Color</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">{plant?.color}</span>
        </div>

        <div className="flex justify-between items-center py-3">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">Material</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">{plant?.material}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-lime-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
        <FaShoppingCart className="text-xl" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsTable;
