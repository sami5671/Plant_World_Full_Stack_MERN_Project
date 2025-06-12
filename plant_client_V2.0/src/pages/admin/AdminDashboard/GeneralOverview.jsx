import { useSelector } from "react-redux";
import {
  Calendar,
  PlusCircle,
  DollarSign,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
} from "lucide-react";
import { dateFormate, getGreeting } from "../../../api/utils";
import { Link } from "react-router-dom";
import UseToGetLiveTime from "../../../Hooks/UseToGetLiveTime";
import StatsCard from "../../../components/dashboard/StatsCard";

const GeneralOverview = () => {
  const greeting = getGreeting();
  const now = UseToGetLiveTime();
  const user = useSelector((state) => state?.auth?.user?.data);
  const { totalOrders, totalEarnings } = useSelector(
    (state) => state?.manageOrders
  );
  const { totalUsers } = useSelector((state) => state?.manageUsers);
  const { totalTrendingProduct } = useSelector((state) => state?.products);

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
        <StatsCard
          title={"TOTAL EARNINGS"}
          value={`$${totalEarnings}`}
          link={""}
          linkName={"view earning graph"}
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          color={"text-green-500"}
        />
        <StatsCard
          title={"ORDERS"}
          value={totalOrders}
          link={"/dashboard/manage-order"}
          linkName={"view all orders"}
          icon={<ShoppingBag className="w-6 h-6 text-red-500" />}
          color={"text-red-500"}
        />
        <StatsCard
          title={"CUSTOMERS"}
          value={totalUsers}
          link={"/dashboard/manage-users"}
          linkName={"see details"}
          icon={<Users className="w-6 h-6 text-yellow-500" />}
          color={"text-green-500"}
        />
        <StatsCard
          title={"Trending Product"}
          value={totalTrendingProduct}
          link={"/dashboard/manage-product"}
          linkName={"see details"}
          icon={<ChartNoAxesCombined className="w-6 h-6 text-green-500" />}
          color={"text-green-500"}
        />
      </div>
    </div>
  );
};

export default GeneralOverview;
