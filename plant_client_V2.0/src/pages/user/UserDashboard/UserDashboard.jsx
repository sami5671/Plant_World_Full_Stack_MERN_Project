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
    <>
      <main className="bg-gray-50">
        {/* General overview */}
        <div>
          <GeneralOverview />
        </div>
        {/* General overview */}

        {/* graph and trending product*/}
        <div>
          <ShoppingGraphAndTrending />
        </div>
        {/* graph and trending product*/}
      </main>
    </>
  );
};

export default UserDashboard;
