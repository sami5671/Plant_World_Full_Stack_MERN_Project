import StatsCard from "./../../../components/dashboard/StatsCard";
import {
  Calendar,
  DollarSign,
  ShoppingBag,
  ChartNoAxesCombined,
} from "lucide-react";
import { dateFormate, getGreeting } from "../../../api/utils";
import { Link } from "react-router-dom";
import UseToGetLiveTime from "../../../Hooks/UseToGetLiveTime";
import { useSelector } from "react-redux";
import { FcProcess } from "react-icons/fc";
import { GiFruitTree } from "react-icons/gi";
const GeneralOverview = () => {
  const greeting = getGreeting();
  const now = UseToGetLiveTime();
  const user = useSelector((state) => state?.auth?.user);

  const { totalBuy, totalOrders, pendingOrders, totalTrendingProduct } =
    useSelector((state) => state?.userOrders);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            {greeting}, {user?.fullName || "User"}!
          </h2>
          <p className="text-gray-500 text-sm">Here's is your bucket today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border px-3 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 shadow-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            {dateFormate(now)}
          </div>
          <Link to={`/allProduct`}>
            <button className="flex items-center gap-1 px-4 py-2 bg-green-100 text-green-700 text-sm rounded-lg shadow-sm hover:bg-green-200">
              <GiFruitTree className="w-4 h-4" />
              Buy Plants
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title={"TOTAL BUY"}
          value={`$${totalBuy}`}
          link={"/dashboard/shopping-activity"}
          linkName={"view Shopping graph"}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          color={"text-green-500"}
        />
        <StatsCard
          title={"TOTAL ORDERS"}
          value={totalOrders}
          link={""}
          linkName={"view all orders"}
          icon={<ShoppingBag className="w-6 h-6 text-red-500" />}
          color={"text-red-500"}
        />
        <StatsCard
          title={"PENDING ORDERS"}
          value={pendingOrders}
          link={""}
          linkName={"see details"}
          icon={<FcProcess className="w-6 h-6 text-yellow-500 animate-spin" />}
          color={"text-green-500"}
        />
        <StatsCard
          title={"TRENDING PRODUCTS"}
          value={totalTrendingProduct}
          link={""}
          linkName={"see details"}
          icon={<ChartNoAxesCombined className="w-6 h-6 text-green-500" />}
          color={"text-green-500"}
        />
      </div>
    </div>
  );
};

export default GeneralOverview;
