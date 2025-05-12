import { FaShoppingCart } from "react-icons/fa";

const ProductDetailsTable = ({ plant }) => {
  return (
    <>
      {/* Product Name */}
      <h2 className="text-2xl font-semibold">{plant?.name}</h2>
      <hr className="my-2" />

      {/* Price Section */}
      <div className="text-4xl font-bold text-gray-800">
        {plant?.previousPrice && (
          <span className="line-through text-gray-400 text-2xl mr-2">
            ${plant?.previousPrice}
          </span>
        )}
        ${plant?.newPrice}
      </div>

      {/* Rating */}
      <div className="flex items-center my-2">
        <span className="font-bold text-lg">Rating: </span>
        <div className="ml-2 flex">{"⭐".repeat(plant?.rating || 0)}</div>
      </div>

      {/* Details Table */}
      <table className="w-full mt-4 text-lg border-collapse">
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-bold">Stock:</td>
            <td
              className={`py-2 flex items-center gap-2 ${
                plant?.stock?.toLowerCase() === "in stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              <FaShoppingCart />
              {plant?.stock}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-bold">Plant Type:</td>
            <td className="py-2">{plant?.plantType}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-bold">Plant Color:</td>
            <td className="py-2">{plant?.color}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-bold">Material:</td>
            <td className="py-2">{plant?.material}</td>
          </tr>
        </tbody>
      </table>

      {/* Add to Cart Button */}
      <button className="flex items-center gap-2 mt-4 bg-lime-600 transition duration-300 ease-in-out hover:bg-lime-800 px-4 py-2 rounded-md text-white font-bold">
        <FaShoppingCart /> Add to Cart
      </button>
    </>
  );
};

export default ProductDetailsTable;
