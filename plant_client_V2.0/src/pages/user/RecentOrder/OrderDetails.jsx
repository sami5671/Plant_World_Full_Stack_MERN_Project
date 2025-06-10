import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../../features/users/orderApi";
import InvoiceDownloadButton from "../../../components/invoice/InvoiceDownloadButton";

const OrderDetails = () => {
  const id = useParams();
  const { data: orderDetails, isSuccess: isOrderDetailsSuccess } =
    useGetOrderDetailsQuery(id);

  console.log(orderDetails?.data?.[0]);

  if (!isOrderDetailsSuccess) return <div className="p-4">Loading...</div>;

  const orders = orderDetails?.data || [];

  return (
    <div className="p-6 max-w-7xl mx-auto ">
      <div className="bg-primary-dashboardPrimaryColor text-white p-4 rounded-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Order Details</h2>
          <p className="text-sm  mb-6">
            Get Invoice Or Find Out Your Order Info
          </p>
        </div>
        <div>
          <InvoiceDownloadButton order={orders?.[0]} />
        </div>
      </div>

      {orders.map((order) => {
        const {
          _id,
          createdAt,
          updatedAt,
          orderInfo,
          paidAmount,
          paymentStatus,
          orderStatus,
          transactionId,
          plantIdWithQuantity,
        } = order;

        return (
          <div key={_id} className="p-12 shadow-lg rounded-lg">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: Order Info */}
              <div className="space-y-6 w-1/2">
                {/* Order Meta Info */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                  <p>
                    <strong>Order ID:</strong> {_id}
                  </p>
                  <p>
                    <strong>Order Date:</strong>{" "}
                    {new Date(createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <span className="text-green-500 font-bold ml-1">
                      {orderInfo?.orderStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Transaction ID:</strong>
                    <span className="text-blue-500 font-semibold ml-1">
                      {transactionId}
                    </span>
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span className="text-green-500 font-bold ml-2">
                      {orderInfo?.paymentStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Paid Amount:</strong>
                    <span className="text-green-500 font-bold ml-2">
                      ${orderInfo?.paidAmount}
                    </span>
                  </p>
                </div>

                {/* Biller Info */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Biller Information
                  </h3>
                  <p>
                    <strong>Name:</strong> {orderInfo?.billerName}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderInfo?.billerEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderInfo?.billerPhone}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {orderInfo?.billerZipCode}
                  </p>
                </div>

                {/* Receiver Info */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Receiver Information
                  </h3>
                  <p>
                    <strong>Name:</strong> {orderInfo?.receiverName}
                  </p>
                  <p>
                    <strong>Email:</strong> {orderInfo?.receiverEmail}
                  </p>
                  <p>
                    <strong>Phone:</strong> {orderInfo?.receiverPhone}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {orderInfo?.receiverZipCode}
                  </p>
                  <p>
                    <strong>Shipping Address:</strong>{" "}
                    {orderInfo?.shippingAddress}
                  </p>
                </div>
              </div>

              {/* Right: Ordered Plants */}
              <div className="max-h-[650px] overflow-y-auto w-full">
                <div className="bg-white shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Ordered Plants</h3>
                  <div className="space-y-4">
                    {plantIdWithQuantity?.map((item, idx) => {
                      const plant = item.plantId;
                      return (
                        <div key={idx} className="border p-4 rounded-lg">
                          <div className="flex gap-4">
                            <img
                              src={plant.images[1]?.url || plant.images[0]}
                              alt={plant.name}
                              className="w-28 h-28 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold">
                                {plant.name}
                              </h4>
                              <p
                                className="text-sm text-gray-600"
                                dangerouslySetInnerHTML={{
                                  __html: plant.description,
                                }}
                              ></p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Category:</strong> {plant.category}
                                </p>
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Color:</strong> {plant.color}
                                </p>
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Material:</strong> {plant.material}
                                </p>
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Type:</strong> {plant.plantType}
                                </p>
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Price:</strong> ${plant.newPrice}
                                </p>
                                <p className="bg-slate-100 px-3 py-1 rounded text-sm">
                                  <strong>Quantity:</strong> {item.quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderDetails;
