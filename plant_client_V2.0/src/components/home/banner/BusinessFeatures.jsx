import { RiPlantFill } from "react-icons/ri";
import { FaSunPlantWilt } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { MdForum } from "react-icons/md";
import { motion } from "motion/react";

const features = [
  {
    id: 1,
    icon: <RiPlantFill />,
    title: "Flourish Tree",
    desc: "Creates a peaceful and tranquil atmosphere with its presence",
    color: "bg-lime-500",
  },
  {
    id: 2,
    icon: <MdForum />,
    title: "Message Support",
    desc: "Reliable and consistent support to address user needs",
    color: "bg-emerald-500",
  },
  {
    id: 3,
    icon: <FaSunPlantWilt />,
    title: "Maintenance",
    desc: "Continuous care and attention to keep your plants thriving",
    color: "bg-teal-500",
  },
  {
    id: 4,
    icon: <TbTruckDelivery />,
    title: "Free Delivery",
    desc: "Zero-cost delivery for a seamless shopping experience",
    color: "bg-lime-600",
  },
];

const BusinessFeatures = () => {
  return (
    <section className="relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group p-8 rounded-3xl bg-white dark:bg-slate-900/50 premium-shadow border border-slate-100 dark:border-slate-800 hover:border-lime-200 dark:hover:border-lime-500/50 transition-all duration-300 backdrop-blur-sm"
          >
            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BusinessFeatures;
