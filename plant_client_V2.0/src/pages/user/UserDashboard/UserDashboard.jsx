import { useDispatch, useSelector } from "react-redux";
import GeneralOverview from "./GeneralOverview";
import ShoppingGraphAndTrending from "./ShoppingGraphAndTrending";
import { useGetUserOrderQuery } from "../../../features/users/orderApi";
import { useEffect } from "react";
import { orderItem, trendingItems } from "../../../features/users/orderSlice";
import { useGetProductsQuery } from "../../../features/products/productsApi";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?._id;

  // get user order data
  const { data: order, isSuccess: isOrderSuccess } = useGetUserOrderQuery(
    { userId },
    { skip: !userId }
  );
  // get all products data
  const { data, isSuccess, isLoading, isError } = useGetProductsQuery();

  // inject plants redux local store
  useEffect(() => {
    if (isSuccess) {
      dispatch(trendingItems(data));
    }
  }, [data, dispatch, isSuccess]);

  // inject order data into redux store
  useEffect(() => {
    if (isOrderSuccess) {
      dispatch(orderItem(order?.data));
    }
  }, [dispatch, isOrderSuccess, order?.data]);

  return (
    <div className="text-slate-800 font-outfit relative z-10">
      <main className="max-w-7xl mx-auto space-y-8">
        {/* General overview */}
        <section>
          <GeneralOverview />
        </section>

        {/* graph and trending product*/}
        <section>
          <ShoppingGraphAndTrending />
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
