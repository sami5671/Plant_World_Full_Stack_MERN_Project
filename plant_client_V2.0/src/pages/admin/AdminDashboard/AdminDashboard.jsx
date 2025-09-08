import { useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../features/adminControl/manageOrderApi";
import { useDispatch } from "react-redux";
import { orderGraphChart } from "../../../features/adminControl/manageOrderSlice";
import RevenueAndDemographicChart from "./RevenueAndDemographicChart";
import { useGetAllUsersQuery } from "../../../features/adminControl/manageUsersApi";
import { allUsers } from "../../../features/adminControl/manageUsersControlSlice";
import GeneralOverview from "./GeneralOverview";
import { useGetProductsQuery } from "../../../features/products/productsApi";
import { calculateTrendingProductCount } from "../../../features/products/productsSlice";

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
    <>
      <main className="bg-gray-50">
        {/* General overview */}
        <div>
          <GeneralOverview />
        </div>
        {/* General overview */}

        {/* revenue chart & demographic*/}
        <div>
          <RevenueAndDemographicChart />
        </div>
        {/* revenue chart & demographic*/}
      </main>
    </>
  );
};

export default AdminDashboard;
