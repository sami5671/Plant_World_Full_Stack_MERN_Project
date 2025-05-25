import { useSelector } from "react-redux";
import { useGetUserOrderQuery } from "../../../features/users/orderApi";

const RecentOrder = () => {
  const user = useSelector((state) => state?.auth?.user?.data);
  const userId = user?._id;

  const {
    data: order,
    isSuccess: isOrderSuccess,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetUserOrderQuery({ userId }, { skip: !userId }); //  Skip query if no userId
  console.log(order);
  return (
    <div>
      {isOrderLoading && <p>Loading...</p>}
      {isOrderError && <p>Error fetching orders.</p>}
      {isOrderSuccess && order?.length > 0 ? (
        <ul>
          {order.map((item) => (
            <li key={item._id}>{item.productName}</li>
          ))}
        </ul>
      ) : (
        isOrderSuccess && <p>No orders found.</p>
      )}
    </div>
  );
};

export default RecentOrder;
