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
  const user = useSelector((state) => state?.auth?.user);
  const { totalOrders, totalEarnings } = useSelector(
    (state) => state?.manageOrders
  );
  const { totalUsers } = useSelector((state) => state?.manageUsers);
  const { totalTrendingProduct } = useSelector((state) => state?.products);

  return (
    <div className="p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm">
            {greeting}, {user?.fullName || "User"}!
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-emerald-100 backdrop-blur-md px-4 py-2.5 rounded-xl text-sm text-emerald-800 bg-white/60 shadow-[0_4px_15px_rgba(16,185,129,0.05)]">
            <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="font-medium tracking-wide">{dateFormate(now)}</span>
          </div>
          <Link to={`/dashboard/add-product`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-sm font-semibold rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-0.5 border border-emerald-400/20">
              <PlusCircle className="w-4 h-4" />
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={"TOTAL EARNINGS"}
          value={`$${totalEarnings}`}
          link={""}
          linkName={"view earning graph"}
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
          color={"text-emerald-700"}
          gradient={"from-emerald-50 to-teal-50"}
          borderColor={"border-emerald-100"}
          iconBg={"bg-emerald-100/50"}
        />
        <StatsCard
          title={"ORDERS"}
          value={totalOrders}
          link={"/dashboard/manage-order"}
          linkName={"view all orders"}
          icon={<ShoppingBag className="w-6 h-6 text-emerald-500" />}
          color={"text-emerald-700"}
          gradient={"from-lime-50 to-emerald-50"}
          borderColor={"border-lime-100"}
          iconBg={"bg-lime-100/50"}
        />
        <StatsCard
          title={"CUSTOMERS"}
          value={totalUsers}
          link={"/dashboard/manage-users"}
          linkName={"see details"}
          icon={<Users className="w-6 h-6 text-teal-600" />}
          color={"text-teal-700"}
          gradient={"from-teal-50 to-cyan-50"}
          borderColor={"border-teal-100"}
          iconBg={"bg-teal-100/50"}
        />
        <StatsCard
          title={"TRENDING PRODUCTS"}
          value={totalTrendingProduct}
          link={"/dashboard/manage-product"}
          linkName={"see details"}
          icon={<ChartNoAxesCombined className="w-6 h-6 text-green-600" />}
          color={"text-green-700"}
          gradient={"from-green-50 to-emerald-50"}
          borderColor={"border-green-100"}
          iconBg={"bg-green-100/50"}
        />
      </div>
    </div>
  );
};

export default GeneralOverview;
