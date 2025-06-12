import { useSelector } from "react-redux";
import {
  Calendar,
  PlusCircle,
  DollarSign,
  ShoppingBag,
  Users,
  Wallet,
} from "lucide-react";
import { dateFormate, getGreeting } from "../../../api/utils";
import { Link } from "react-router-dom";
import UseToGetLiveTime from "../../../Hooks/UseToGetLiveTime";

const GeneralOverview = () => {
  const greeting = getGreeting();
  const now = UseToGetLiveTime();
  const user = useSelector((state) => state?.auth?.user?.data);

  const stats = [
    {
      title: "TOTAL EARNINGS",
      value: "$559.25k",
      change: "+16.24%",
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      trendColor: "text-green-500",
      link: "View net earnings",
    },
    {
      title: "ORDERS",
      value: "36,894",
      change: "-3.57%",
      icon: <ShoppingBag className="w-6 h-6 text-red-500" />,
      trendColor: "text-red-500",
      link: "View all orders",
    },
    {
      title: "CUSTOMERS",
      value: "183.35M",
      change: "+29.08%",
      icon: <Users className="w-6 h-6 text-yellow-500" />,
      trendColor: "text-green-500",
      link: "See details",
    },
    {
      title: "MY BALANCE",
      value: "$165.89k",
      change: "",
      icon: <Wallet className="w-6 h-6 text-purple-500" />,
      trendColor: "",
      link: "Withdraw money",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            {greeting}, {user?.name || "Anna"}!
          </h2>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border px-3 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 shadow-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            {dateFormate(now)}
          </div>
          <Link to={`/dashboard/add-product`}>
            <button className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg shadow-sm hover:bg-green-200">
              <PlusCircle className="w-4 h-4" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow border">
            <div className="text-xs font-medium text-gray-500 mb-1">
              {item.title}
            </div>
            <div className="text-2xl font-semibold mb-3">{item.value}</div>
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-blue-600 underline">
                {item.link}
              </a>
              <div className="bg-gray-100 p-2 rounded-lg">{item.icon}</div>
            </div>
            {item.change && (
              <div
                className={`absolute top-3 right-3 text-xs font-medium ${item.trendColor}`}
              >
                {item.change}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralOverview;
