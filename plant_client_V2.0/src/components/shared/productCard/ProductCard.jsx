import { FaCartShopping } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cld } from "./../../../api/utils";
import { backgroundRemoval } from "@cloudinary/url-gen/actions/effect";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Link } from "react-router-dom";

const ProductCard = ({ plants }) => {
  const { _id, name, newPrice, previousPrice, stock, images } = plants;

  return (
    <>
      <section>
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <div className="w-[180px] h-full lg:w-[240px] font-Rancho rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 bg-primary-backgroundColor p-4 relative">
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
                className="w-48 h-48 object-cover rounded-xl shadow-md"
              />
            </Link>
          </div>
          {/* </Link> */}

          <div className="p-3">
            <Link to={`/product/${_id}`}>
              <h1 className="mt-3 text-lg font-semibold hover:text-lime-600 transition">
                {name.split(" ").slice(0, 8).join(" ")}
              </h1>
            </Link>

            <span className="absolute top-3 right-3 bg-slate-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
              In stock: {stock}
            </span>

            <p className="mt-2 text-lg">
              <span className="font-bold text-2xl text-lime-600">
                ${newPrice}
              </span>
              <del className="ml-2 text-gray-500">${previousPrice}</del>
            </p>

            <button className="flex items-center justify-center gap-2 mt-3 py-2 text-white bg-lime-500 hover:bg-lime-700 transition-all rounded-full shadow-md w-full">
              Add to Cart <FaCartShopping />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCard;
