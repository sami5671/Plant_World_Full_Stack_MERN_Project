import { BsFillCartCheckFill } from "react-icons/bs";
import { Input } from "rizzui/input";
import { Select } from "rizzui";
import { FcShipped } from "react-icons/fc";
import { Link } from "react-router-dom";
import { IoInformationCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByOrderId,
  searchByPlantName,
  sortOrdersByPrice,
} from "../../../features/users/orderSlice";
import { useState } from "react";

const options = [
  { label: "All 🌿", value: "all" },
  { label: "Low To High 🔼", value: "lowToHigh" },
  { label: "High To Low 🔽", value: "highToLow" },
];
const PreviousShoppingInfo = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);

  const { filteredOrder } = useSelector((state) => state?.userOrders);
  // search by ID
  const handleSearchByOrderId = (value) => {
    dispatch(searchByOrderId(value));
  };
  // search by Email
  const handleSearchByPlantName = (value) => {
    dispatch(searchByPlantName(value));
  };
  // sort by price
  const handleOrdersByPriceSort = (value) => {
    setValue(value);
    dispatch(sortOrdersByPrice(value));
  };
  //   console.log(filteredOrder);
  return (
    <>
      <section className="bg-white px-4 py-4 lg:px-6 lg:py-6 rounded-2xl">
        <div className="flex justify-start">
          <h1 className="text-primary-dashboardPrimaryTextColor font-bold text-xl flex items-center gap-2">
            Previous Ordered Items <BsFillCartCheckFill />
          </h1>
        </div>
        {/* searching and filtering */}

        <div className="flex flex-col lg:flex-row justify-end gap-6">
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
              label="Search By Plant Name"
              placeholder="Enter Biller Email"
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              onChange={(e) => handleSearchByPlantName(e.target.value)}
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
        <div className="overflow-x-auto h-[350px]">
          <table className="table table-pin-rows mt-8">
            {/* head */}
            <thead>
              <tr>
                <th>Order No</th>
                <th>Biller Name</th>
                <th>TransactionId</th>
                <th>Date</th>
                <th>Order Status</th>
                <th>Paid Amount</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {filteredOrder?.map((item, index) => (
                <tr key={item?._id}>
                  <td className="text-blue-500">#{item?._id}</td>
                  <td className="lg:w-1/6">
                    {item?.orderInfo?.billerName?.slice(0, 18)}...
                  </td>
                  <td className="">{item?.transactionId}</td>
                  <td> {new Date(item?.createdAt).toLocaleString()}</td>
                  <td>
                    <div className="">
                      {item?.orderInfo?.orderStatus === "delivered" && (
                        <span className="font-bold text-sm text-green-800 flex items-center">
                          Delivered <FcShipped className="text-xl ml-1" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="text-[18px] font-semibold text-green-600">
                      ${item?.orderInfo?.paidAmount}
                    </span>
                  </td>
                  <td>
                    <Link to={`/dashboard/orderDetails/${item?._id}`}>
                      <span className="text-3xl text-primary-dashboardPrimaryColor hover:text-lime-500 ">
                        <IoInformationCircle />
                      </span>
                    </Link>
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

export default PreviousShoppingInfo;
