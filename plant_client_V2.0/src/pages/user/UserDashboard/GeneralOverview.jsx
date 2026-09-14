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
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm mb-1">
            {greeting}, {user?.fullName || "User"}!
          </h2>
          <p className="text-slate-500 font-medium tracking-wide">Here is your bucket today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white/60 backdrop-blur-md border border-emerald-100/60 px-4 py-2.5 rounded-xl shadow-sm">
            <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
            <span className="font-medium tracking-wide text-slate-700">{dateFormate(now)}</span>
          </div>
          <Link to={`/allProduct`}>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-0.5">
              <GiFruitTree className="w-5 h-5" />
              Buy Plants
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={"TOTAL SPENT"}
          value={`$${totalBuy}`}
          link={"/dashboard/shopping-activity"}
          linkName={"View history"}
          icon={<DollarSign className="w-6 h-6 text-emerald-600 drop-shadow-[0_2px_10px_rgba(16,185,129,0.4)]" />}
          color="text-slate-800"
          gradient="from-emerald-50 to-teal-50"
          borderColor="border-emerald-100"
          iconBg="bg-emerald-100/50"
        />
        <StatsCard
          title={"TOTAL ORDERS"}
          value={totalOrders}
          link={""}
          linkName={"View all orders"}
          icon={<ShoppingBag className="w-6 h-6 text-teal-600 drop-shadow-[0_2px_10px_rgba(20,184,166,0.4)]" />}
          color="text-slate-800"
          gradient="from-teal-50 to-cyan-50"
          borderColor="border-teal-100"
          iconBg="bg-teal-100/50"
        />
        <StatsCard
          title={"PENDING ORDERS"}
          value={pendingOrders}
          link={""}
          linkName={"See details"}
          icon={<FcProcess className="w-6 h-6 animate-spin drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]" />}
          color="text-slate-800"
          gradient="from-lime-50 to-green-50"
          borderColor="border-lime-100"
          iconBg="bg-lime-100/50"
        />
        <StatsCard
          title={"TRENDING"}
          value={totalTrendingProduct}
          link={""}
          linkName={"See details"}
          icon={<ChartNoAxesCombined className="w-6 h-6 text-green-600 drop-shadow-[0_2px_10px_rgba(34,197,94,0.4)]" />}
          color="text-slate-800"
          gradient="from-green-50 to-emerald-50"
          borderColor="border-green-100"
          iconBg="bg-green-100/50"
        />
      </div>
    </div>
  );
};

export default GeneralOverview;
