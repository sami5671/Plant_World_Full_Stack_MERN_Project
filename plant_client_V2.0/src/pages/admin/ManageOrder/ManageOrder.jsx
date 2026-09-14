import { Input } from "rizzui/input";
import { IoInformationCircle } from "react-icons/io5";
import { FaGear, FaTrash } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Select } from "rizzui";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";
import { FcProcess } from "react-icons/fc";
import { FaShippingFast } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const options = [
  { label: "All 🌿", value: "all" },
  { label: "Low To High 🔼", value: "lowToHigh" },
  { label: "High To Low 🔽", value: "highToLow" },
];
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../features/adminControl/manageOrderApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  searchByEmail,
  searchByOrderId,
  sortOrders,
} from "../../../features/adminControl/manageOrderSlice";
import OrderStatusModal from "./OrderStatusModal";
const ManageOrder = () => {
  const dispatch = useDispatch();
  const [updateOrder, setUpdateOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { data: orders, isSuccess: isOrderSuccess } = useGetAllOrdersQuery();
  const [
    updateOrderStatus,
    { isSuccess: isOrderStatusSuccess, isLoading: isOrderStatusLoading },
  ] = useUpdateOrderStatusMutation();
  // console.log(orders?.data);
  const { filteredOrders } = useSelector((state) => state.manageOrders);
  // console.log(filteredOrders);
  const [value, setValue] = useState(null);

  // search by ID
  const handleSearchByOrderId = (value) => {
    dispatch(searchByOrderId(value));
  };
  // search by Email
  const handleSearchByEmail = (value) => {
    dispatch(searchByEmail(value));
  };
  // sort by price
  const handleOrdersByPriceSort = (value) => {
    setValue(value);
    dispatch(sortOrders(value));
  };

  const handleOpenUpdateOrder = (id) => {
    setSelectedOrderId(id);
    setUpdateOrder(true);
  };

  const handleCloseUpdateOrder = () => {
    setUpdateOrder(false);
    setSelectedOrderId(null);
  };

  const modalHandler = (status) => {
    const orderId = selectedOrderId;
    updateOrderStatus({ status, orderId });
  };
  useEffect(() => {
    if (isOrderStatusSuccess) {
      toast.success(`Order status updated`);
      handleCloseUpdateOrder();
    }
  }, [isOrderStatusSuccess]);

  useEffect(() => {
    if (isOrderSuccess && orders) {
      dispatch(allOrders(orders));
    }
  }, [dispatch, orders, isOrderSuccess]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="relative z-10">

        <section className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
              Manage Orders <BsFillCartCheckFill className="text-emerald-600" />
            </h1>
          </div>
          {/* searching and filtering */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <Input
                label="Search By Order ID"
                placeholder="Enter the Order ID"
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                onChange={(e) => handleSearchByOrderId(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Search By Email"
                placeholder="Enter Biller Email"
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                onChange={(e) => handleSearchByEmail(e.target.value)}
              />
            </div>
            <div>
              <Select
                label="Sort by Price"
                options={options}
                onChange={handleOrdersByPriceSort}
                value={value}
                dropdownClassName="bg-white border-emerald-100 rounded-xl shadow-lg"
                selectClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
              />
            </div>
          </div>
        {/* data table */}
          <div className="overflow-x-auto h-[650px] rounded-xl border border-emerald-100/50 shadow-inner bg-white/40">
            <table className="table table-pin-rows">
              {/* head */}
              <thead>
                <tr className="bg-emerald-50/50 text-slate-600 border-b border-emerald-100/50">
                  <th className="bg-transparent">Order No</th>
                  <th className="bg-transparent">Name</th>
                  <th className="bg-transparent">TransactionId</th>
                  <th className="bg-transparent">Status</th>
                  <th className="bg-transparent">Paid Amount</th>
                  <th className="bg-transparent">Details</th>
                  <th className="bg-transparent">Update Status</th>
                  <th className="bg-transparent">Delete</th>
                </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {filteredOrders?.map((item, index) => (
                <tr key={item?._id} className="border-b border-slate-100/50 hover:bg-emerald-50/30 transition-colors">
                  <td className="text-emerald-700 font-medium">#{item?._id}</td>
                  <td className="lg:w-1/6 text-slate-700 font-medium">
                    {item?.orderInfo?.billerName?.slice(0, 16)}...
                  </td>
                  <td className="text-slate-600 font-mono text-sm">{item?.transactionId}</td>
                  <td>
                    <div className="">
                      <div className="text-2xl">
                        {item?.orderInfo?.orderStatus === "pending" && (
                          <span className="font-bold text-sm text-amber-600 flex items-center gap-1 bg-amber-100 px-2 py-1 rounded-md w-fit">
                            Pending
                            <MdPendingActions className="text-amber-600 text-xl" />
                          </span>
                        )}
                        {item?.orderInfo?.orderStatus === "processing" && (
                          <span className="font-bold text-sm text-sky-600 flex items-center gap-1 bg-sky-100 px-2 py-1 rounded-md w-fit">
                            Processing
                            <FcProcess className="animate-spin text-sky-600 text-xl" />
                          </span>
                        )}
                        {item?.orderInfo?.orderStatus === "shipped" && (
                          <span className="font-bold text-sm text-indigo-600 flex items-center gap-1 bg-indigo-100 px-2 py-1 rounded-md w-fit">
                            Shipped
                            <FaShippingFast className="text-indigo-600 text-xl" />
                          </span>
                        )}
                        {item?.orderInfo?.orderStatus === "cancelled" && (
                          <span className="font-bold text-sm text-rose-600 flex items-center gap-1 bg-rose-100 px-2 py-1 rounded-md w-fit">
                            Canceled
                            <MdCancel className="text-rose-600 text-xl" />
                          </span>
                        )}
                        {item?.orderInfo?.orderStatus === "delivered" && (
                          <span className="font-bold text-sm text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md w-fit">
                            Delivered
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-[18px] font-bold text-emerald-700">
                      ${item?.orderInfo?.paidAmount}
                    </span>
                  </td>
                  <td>
                    <Link to={`/dashboard/orderDetails/${item?._id}`}>
                      <span className="text-3xl text-emerald-500 hover:text-emerald-700 transition-colors inline-block">
                        <IoInformationCircle />
                      </span>
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleOpenUpdateOrder(item?._id)}
                      className="transition-transform hover:scale-110"
                    >
                      <span className="text-2xl text-teal-600 hover:text-teal-800 inline-block">
                        <FaGear className="hover:animate-spin" />
                      </span>
                    </button>
                  </td>

                  {/* </Link> */}

                  {/* delete info */}
                  <td>
                    <button
                      className="transition-transform hover:scale-110"
                    // onClick={() => handleDeleteProduct(item._id)}
                    >
                      <span className="text-xl text-rose-500 hover:text-rose-700 inline-block">
                        <FaTrash />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <OrderStatusModal
            updateOrder={updateOrder}
            handleCloseUpdateOrder={handleCloseUpdateOrder}
            modalHandler={modalHandler}
          />
        </section>
      </div>
    </>
  );
};

export default ManageOrder;
