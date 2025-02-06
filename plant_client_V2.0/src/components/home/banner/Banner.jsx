import { RiPlantFill } from "react-icons/ri";
import { FaSunPlantWilt } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdForum } from "react-icons/md";
import { Link } from "react-router-dom";
import banner from "../../../assets/images/banner.png";

const Banner = () => {
  return (
    <section className="">
      {/* banner  */}
      <div className="relative bg-cover bg-center h-80 md:h-96 lg:h-screen flex items-center">
        <img
          className="absolute w-full h-full object-cover object-center"
          src={banner}
          alt="Banner"
        />

        <div className="absolute flex items-start justify-center lg:w-1/2 mt-12">
          <div className="text-left px-2 lg:ml-6">
            <h2 className="font-Rancho bg-gradient-to-tr from-lime-400 to-green-700 text-transparent bg-clip-text text-2xl lg:text-6xl uppercase mt-2 mb-4 ">
              Organize Your Home & Office with live tree
            </h2>
            <p className="text-[12px] lg:text-[18px] text-white">
              Live Tree transforms your home and office organization. Experience
              the perfect blend of nature and functionality with eco-friendly
              storage solutions. From stylish furniture to smart organizers,
              Live Tree elevates your space, creating a harmonious environment
              that enhances productivity and tranquility.
            </p>
            <Link to="/allProduct">
              <button className="px-8 py-1 mt-3 font-Rancho text-xl text-white rounded-br-full bg-lime-600 transition duration-300 ease-in-out hover:bg-lime-400">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* banner */}

      <div className="lg:ml-12 lg:mr-12 lg:absolute lg:-mt-8">
        <section className="grid lg:grid-cols-4 lg:rounded-tl-full lg:rounded-br-full lg:px-24 py-6 gap-12 bg-[#ECEAE3]">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <span className="block">
                <RiPlantFill className="text-5xl text-lime-600 mx-auto hover:text-lime-400" />
              </span>
              <div>
                <h1 className="text-xl">Flourish Tree</h1>
                <p className="text-[12px]">
                  Creating a peaceful and tranquil atmosphere with its presence
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <span className="block">
                <MdForum className="text-5xl text-lime-600 mx-auto hover:text-lime-400" />
              </span>
              <div>
                <h1 className="text-xl">Message Support</h1>
                <p className="text-[12px]">
                  Consistent and trustworthy support to address user needs
                  effectively
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <span className="block">
                <FaSunPlantWilt className="text-5xl text-lime-600 mx-auto hover:text-lime-400" />
              </span>
              <div>
                <h1 className="text-xl">Maintenance</h1>
                <p className="text-[12px]">
                  Continuous care and attention to keep something in good
                  condition
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <span className="block">
                <TbTruckDelivery className="text-5xl text-lime-600 mx-auto hover:text-lime-400" />
              </span>
              <div>
                <h1 className="text-xl">Free Delivery</h1>
                <p className="text-[12px]">
                  Zero-cost delivery service for a budget-friendly and seamless
                  shopping experience
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Banner;
