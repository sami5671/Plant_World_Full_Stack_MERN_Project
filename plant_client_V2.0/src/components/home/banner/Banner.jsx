import { Link } from "react-router-dom";
import banner from "../../../assets/images/banner1.png";
import BusinessFeatures from "./BusinessFeatures";

const Banner = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-12 pt-16 lg:pt-16">
      {/* Hero Section */}
      <div className="w-full h-[85vh] flex flex-col lg:flex-row items-center justify-between bg-lime-50 rounded-3xl overflow-hidden shadow-xl">
        {/* Left Content */}
        <div className="px-4 sm:px-6 md:px-10 lg:w-1/2 text-center lg:text-left py-10 lg:py-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Bring <span className="text-lime-600">Nature</span> into Your Home
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
            Elevate your living or working space with vibrant, healthy plants.
            Create a cozy, eco-friendly environment filled with calm and
            freshness.
          </p>
          <Link to="/allProduct">
            <button
              className="px-8 py-3 mt-6 font-Rancho text-lg sm:text-xl text-white rounded-full 
              bg-gradient-to-r from-lime-600 to-lime-500 shadow-lg 
              hover:from-lime-500 hover:to-lime-400 transition"
            >
              Shop Now
            </button>
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="lg:w-1/2 w-full">
          <img
            // className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[650px] object-contain"
            src={banner}
            alt="Person holding plant"
          />
        </div>
      </div>

      {/* Features Section */}
      <BusinessFeatures />
    </section>
  );
};

export default Banner;
