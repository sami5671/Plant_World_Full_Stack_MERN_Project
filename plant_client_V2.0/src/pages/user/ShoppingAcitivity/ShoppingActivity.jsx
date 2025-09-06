import { useDispatch, useSelector } from "react-redux";
import PreviousShoppingInfo from "./PreviousShoppingInfo";
import ShoppingActivityGraph from "./ShoppingActivityGraph";
import { useGetUserOrderQuery } from "../../../features/users/orderApi";
import { orderItem } from "../../../features/users/orderSlice";
import { useEffect } from "react";
const ShoppingActivity = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?._id;

  const { data: order, isSuccess: isOrderSuccess } = useGetUserOrderQuery(
    { userId },
    { skip: !userId }
  );
  useEffect(() => {
    if (isOrderSuccess) {
      dispatch(orderItem(order?.data));
    }
  }, [dispatch, isOrderSuccess, order?.data]);
  return (
    <>
      <div className="">
        <div className="">
          {/* SHOPPING ACTIVITY GRAPH */}
          <ShoppingActivityGraph />
        </div>
        <div className="mt-12">
          {/* PREVIOUS SHOPPING INFO */}
          <PreviousShoppingInfo />
        </div>
      </div>
    </>
  );
};

export default ShoppingActivity;
