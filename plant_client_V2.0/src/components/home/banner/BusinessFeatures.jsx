import { RiPlantFill } from "react-icons/ri";
import { FaSunPlantWilt } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdForum } from "react-icons/md";
const features = [
  {
    id: 1,
    icon: (
      <RiPlantFill className="text-5xl text-lime-600 group-hover:text-lime-400 transition" />
    ),
    title: "Flourish Tree",
    desc: "Creates a peaceful and tranquil atmosphere with its presence",
  },
  {
    id: 2,
    icon: (
      <MdForum className="text-5xl text-lime-600 group-hover:text-lime-400 transition" />
    ),
    title: "Message Support",
    desc: "Reliable and consistent support to address user needs",
  },
  {
    id: 3,
    icon: (
      <FaSunPlantWilt className="text-5xl text-lime-600 group-hover:text-lime-400 transition" />
    ),
    title: "Maintenance",
    desc: "Continuous care and attention to keep your plants thriving",
  },
  {
    id: 4,
    icon: (
      <TbTruckDelivery className="text-5xl text-lime-600 group-hover:text-lime-400 transition" />
    ),
    title: "Free Delivery",
    desc: "Zero-cost delivery for a seamless shopping experience",
  },
];
const BusinessFeatures = () => {
  return (
    <>
      {/* Features Section */}
      <div className="mt-4 lg:ml-12 lg:mr-12 lg:absolute lg:-mt-20">
        <section className="grid rounded-2xl lg:grid-cols-4 lg:rounded-tl-full lg:rounded-br-full lg:px-24 py-6 gap-12 bg-lime-100">
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
    </>
  );
};

export default BusinessFeatures;
