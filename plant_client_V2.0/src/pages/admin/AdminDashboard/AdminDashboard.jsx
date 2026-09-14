import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetAllOrdersQuery } from "../../../features/adminControl/manageOrderApi";
import { orderGraphChart } from "../../../features/adminControl/manageOrderSlice";
import { useGetAllUsersQuery } from "../../../features/adminControl/manageUsersApi";
import { allUsers } from "../../../features/adminControl/manageUsersControlSlice";
import { useGetProductsQuery } from "../../../features/products/productsApi";
import { calculateTrendingProductCount } from "../../../features/products/productsSlice";
import GeneralOverview from "./GeneralOverview";
import RevenueAndDemographicChart from "./RevenueAndDemographicChart";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data: orders, isSuccess: isOrderSuccess } = useGetAllOrdersQuery();
  const {
    data: users,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetAllUsersQuery();

  const { data: plants, isSuccess: isPlantSuccess } = useGetProductsQuery();
  // console.log(plants?.data);
  useEffect(() => {
    if (isPlantSuccess) {
      dispatch(calculateTrendingProductCount(plants));
    }
  }, [dispatch, isPlantSuccess, plants]);

  useEffect(() => {
    if (isOrderSuccess) {
      dispatch(orderGraphChart(orders));
    }
  }, [isOrderSuccess, dispatch, orders]);

  useEffect(() => {
    if (isUserSuccess) {
      dispatch(allUsers(users));
    }
  }, [dispatch, isUserSuccess, users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50 text-slate-800 p-4 md:p-6 lg:p-8 font-outfit relative overflow-hidden">
      {/* Decorative light background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-lime-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-emerald-200/30 rounded-full blur-[120px]"></div>
      </div>

      <main className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* General overview */}
        <section>
          <GeneralOverview />
        </section>

        {/* revenue chart & demographic*/}
        <section>
          <RevenueAndDemographicChart />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
