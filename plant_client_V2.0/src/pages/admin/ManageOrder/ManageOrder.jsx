import { Input } from "rizzui/input";
import { IoInformationCircle } from "react-icons/io5";
import { FaGear, FaTrash } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Select } from "rizzui";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const options = [
  { label: "All 🌿", value: "all" },
  { label: "Low To High 🔼", value: "lowToHigh" },
  { label: "High To Low 🔽", value: "highToLow" },
];
import { useGetAllOrdersQuery } from "../../../features/adminControl/manageOrderApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  searchByEmail,
  searchByOrderId,
  sortOrders,
} from "../../../features/adminControl/manageOrderSlice";
const ManageOrder = () => {
  const dispatch = useDispatch();
  const { data: orders, isSuccess: isOrderSuccess } = useGetAllOrdersQuery();
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
    console.log(value);
    dispatch(sortOrders(value));
  };
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
      <section className="bg-white px-4 py-4 lg:px-12 lg:py-12 rounded-2xl">
        <div className="flex justify-end">
          <h1 className="text-primary-dashboardPrimaryTextColor font-bold text-xl flex items-center gap-2">
            Manage Order <BsFillCartCheckFill />
          </h1>
        </div>
        {/* searching and filtering */}

        <div className="flex gap-6">
          <div>
            <Input
              label="Search By Order ID"
              placeholder="Enter the Order ID"
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              onChange={(e) => handleSearchByOrderId(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Search By Email"
              placeholder="Enter Biller Email"
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              onChange={(e) => handleSearchByEmail(e.target.value)}
            />
          </div>
          <div>
            <div>
              <Select
                label="Sort by Price"
                options={options}
                onChange={handleOrdersByPriceSort}
                value={value}
                dropdownClassName="bg-white"
                selectClassName="border-lime-500 bg-white w-[200px] opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-4"
              />
            </div>
          </div>
        </div>
        {/* data table */}
        <div className="overflow-x-auto h-[650px]">
          <table className="table table-pin-rows mt-8">
            {/* head */}
            <thead>
              <tr>
                <th>Order No</th>
                <th>Name</th>
                <th>TransactionId</th>
                <th>Status</th>
                <th>Paid Amount</th>
                <th>Details</th>
                <th>Update Status</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {filteredOrders?.map((item, index) => (
                <tr key={item?._id}>
                  <td className="text-blue-500">#{item?._id}</td>
                  <td className="lg:w-1/6">
                    {item?.orderInfo?.billerName?.slice(0, 16)}...
                  </td>
                  <td className="">{item?.transactionId}</td>
                  <td>
                    <div className="">
                      <div className="">{item?.orderInfo?.orderStatus}</div>
                    </div>
                  </td>
                  <td>
                    <span className="text-[18px] font-semibold text-green-600">
                      ${item?.orderInfo?.paidAmount}
                    </span>
                  </td>
                  {/* <Link to={`/product/${item._id}`}> */}
                  <td>
                    <Link to="">
                      <span className="text-4xl text-primary-dashboardPrimaryColor hover:text-lime-500">
                        <IoInformationCircle />
                      </span>
                    </Link>
                  </td>

                  <td>
                    {/* <Link to={`/dashboard/updateProduct/${item._id}`}> */}
                    <button className="">
                      <span className="text-3xl text-primary-dashboardPrimaryColor hover:text-lime-500 ">
                        <FaGear className="hover:animate-spin" />
                      </span>
                    </button>
                    {/* </Link> */}
                  </td>

                  {/* </Link> */}

                  {/* delete info */}
                  <td>
                    <button

                    // onClick={() => handleDeleteProduct(item._id)}
                    >
                      <span className="text-xl text-red-600 hover:text-orange-500">
                        <FaTrash />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageOrder;
