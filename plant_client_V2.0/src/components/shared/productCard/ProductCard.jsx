import { FaCartShopping } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import { cld } from "./../../../api/utils";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { Link } from "react-router-dom";
import useHandleCart from "../../../Hooks/UseHandleCart";
import { ImSpinner9 } from "react-icons/im";

const ProductCard = ({ plants }) => {
  const { handleCart, isLoading, isSuccess } = useHandleCart();
  const { _id, name, newPrice, previousPrice, stock, images } = plants;
  // console.log(_id);
  return (
    <>
      <section>
        <div className="w-[150px] md:w-[180px] h-full lg:w-[240px] font-Rancho rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 bg-primary-backgroundColor p-4 relative">
          {/* <Link to={`/product/${_id}`}> */}
          <div className="flex justify-center items-center">
            <Link to={`/product/${_id}`}>
              <img
                key={images?.[3]?.publicId}
                src={cld
                  .image(images?.[3]?.publicId)
                  .effect(backgroundRemoval())
                  .format("auto")
                  .quality("auto")
                  .toURL()}
                // src={images?.[0]?.publicId}
                className="lg:w-48 lg:h-48 object-cover rounded-xl shadow-md"
              />
            </Link>
          </div>
          {/* </Link> */}

          <div className="p-3">
            <div className="h-40">
              <Link to={`/product/${_id}`}>
                <h1 className="mt-3 text-sm lg:text-lg font-semibold hover:text-lime-600 transition">
                  {name.split(" ").slice(0, 8).join(" ")}
                </h1>
              </Link>
              <span className="absolute top-3 right-3 bg-slate-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
                In stock: {stock}
              </span>
              <p className="mt-2 text-[12px] lg:text-lg">
                <span className="font-bold text-lg lg:text-2xl text-lime-600">
                  ${newPrice}
                </span>
                <del className="ml-2 text-gray-500">${previousPrice}</del>
              </p>
            </div>
            {isLoading ? (
              <button className="flex items-center justify-center gap-2 text-[12px] lg:text-lg mt-3 py-2 text-white bg-lime-500 hover:bg-lime-700 transition-all rounded-full shadow-md w-full">
                Processing <ImSpinner9 className="animate-spin" />
              </button>
            ) : (
              <button
                onClick={() => handleCart(_id)}
                className="flex items-center justify-center gap-2 text-[12px] lg:text-lg mt-3 py-2 text-white bg-lime-500 hover:bg-lime-700 transition-all rounded-full shadow-md w-full"
              >
                Add to Cart <FaCartShopping />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
