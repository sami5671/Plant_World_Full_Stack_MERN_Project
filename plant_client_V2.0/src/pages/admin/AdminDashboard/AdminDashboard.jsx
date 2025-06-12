import { useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../features/adminControl/manageOrderApi";
import GeneralOverview from "./GeneralOverview";
import { useDispatch } from "react-redux";
import { orderGraphChart } from "../../../features/adminControl/manageOrderSlice";
import RevenueAndDemographicChart from "./RevenueAndDemographicChart";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { data: orders, isSuccess: isOrderSuccess } = useGetAllOrdersQuery();

  useEffect(() => {
    if (isOrderSuccess) {
      dispatch(orderGraphChart(orders));
    }
  }, [dispatch, isOrderSuccess, orders]);

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
