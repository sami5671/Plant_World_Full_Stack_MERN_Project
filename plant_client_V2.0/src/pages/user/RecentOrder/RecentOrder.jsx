import { useSelector } from "react-redux";
import { useGetUserOrderQuery } from "../../../features/users/orderApi";
import moment from "moment";
import { Link } from "react-router-dom";
import InvoiceDownloadButton from "../../../components/invoice/InvoiceDownloadButton";

const RecentOrder = () => {
  const user = useSelector((state) => state?.auth?.user?.data);
  const userId = user?._id;

  const {
    data: order,
    isSuccess: isOrderSuccess,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetUserOrderQuery({ userId }, { skip: !userId });

  return (
    <div className="max-w-6xl mx-auto font-sans shadow-lg mt-12 p-6">
      <div className="bg-primary-dashboardPrimaryColor text-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">My Orders</h2>
        <p className="text-sm  mb-6">
          View and track your order status and details.
        </p>
      </div>
      {isOrderLoading && <p>Loading orders...</p>}
      {isOrderError && <p>Failed to load orders.</p>}
      <div className="max-h-[650px] overflow-y-auto mt-2">
        {isOrderSuccess &&
          order?.data?.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-lg p-5 mb-8"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID:
                    <span className="text-blue-600 font-semibold ml-1">
                      #{item._id}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Placed on:{" "}
                    {moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Payment Status:{" "}
                    <span className="font-semibold text-green-600">
                      {item?.orderInfo?.paymentStatus}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Order Status:{" "}
                    <span className="font-semibold text-yellow-600">
                      {item?.orderInfo?.orderStatus}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <InvoiceDownloadButton order={item} />
                  <Link to={`/dashboard/orderDetails/${item?._id}`}>
                    <button className="border border-green-600 text-sm font-semibold px-4 py-2 rounded hover:bg-primary-dashboardPrimaryColor hover:text-white transition">
                      View Order Details
                    </button>
                  </Link>
                  <button className="bg-red-400 text-sm font-semibold px-4 py-2 rounded hover:bg-red-600 transition">
                    Cancel order
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-4 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Shipping To:</span>{" "}
                  {item?.orderInfo?.receiverName} (
                  {item?.orderInfo?.receiverPhone})
                </p>
                <p>{item?.orderInfo?.shippingAddress}</p>
                <p>Zip Code: {item?.orderInfo?.receiverZipCode}</p>
              </div>

              {/* Items List */}
              {item.plantIdWithQuantity.map((plantItem) => {
                const plant = plantItem?.plantId;
                return (
                  <div
                    key={plantItem._id}
                    className="flex items-start border-t pt-4 mt-4"
                  >
                    <img
                      src={plant?.images?.[0]?.url}
                      alt={plant?.name}
                      className="w-24 h-28 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{plant?.name}</h3>
                      <p className="text-sm text-gray-500 mb-1">
                        Type: {plant?.plantType} | Material: {plant?.material}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Qty: {plantItem?.quantity}
                      </p>
                      <p className="font-semibold text-gray-800">
                        Price: ${plant?.newPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentOrder;
