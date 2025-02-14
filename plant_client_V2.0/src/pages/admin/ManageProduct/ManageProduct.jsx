import { useGetProductsQuery } from "../../../features/products/productsApi";
import { Input } from "rizzui/input";
import { TfiWrite } from "react-icons/tfi";
import { IoInformationCircle } from "react-icons/io5";
import { FaTrash } from "react-icons/fa6";
import { GiFruitTree } from "react-icons/gi";
import { useEffect, useState } from "react";
import { Select } from "rizzui";
import { useDispatch, useSelector } from "react-redux";
import {
  allPlants,
  filterByTrending,
  manageTrending,
  searchById,
  searchByName,
} from "../../../features/adminControl/manageProductControlSlice";
import { useAddTrendingProductMutation } from "../../../features/adminControl/adminControlApi";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const options = [
  { label: "All 🌱", value: "all" },
  { label: "Trending 🔥", value: "trending" },
  { label: "As Usual ❄️", value: "nonTrending" },
];
const ManageProduct = () => {
  const dispatch = useDispatch();
  // get data from redux
  const {
    data: plants,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetProductsQuery();
  const [
    addTrendingProduct,
    { isSuccess: trendingSuccess, data: TrendingData },
  ] = useAddTrendingProductMutation();

  const { filteredProducts } = useSelector((state) => state.manageProducts);
  const [value, setValue] = useState(null);
  //   console.log(plants);

  // search by name
  const handleSearchByName = (value) => {
    dispatch(searchByName(value));
  };

  // search by ID
  const handleSearchById = (value) => {
    dispatch(searchById(value));
  };
  // find trending product
  const handleTrendingProductSearch = (value) => {
    setValue(value);
    dispatch(filterByTrending(value));
  };

  // manage trending
  const handleTrendingProduct = (id) => {
    addTrendingProduct({ plantId: id });
  };

  //  useEffect to update Redux when trending status changes
  useEffect(() => {
    if (trendingSuccess) {
      dispatch(manageTrending(TrendingData));
      toast.success(TrendingData?.message);
    }
  }, [trendingSuccess, TrendingData, dispatch]);

  // manage the redux store and response update
  useEffect(() => {
    if (isSuccess && plants) {
      dispatch(allPlants(plants));
    }
  }, [dispatch, plants, isSuccess]);

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
            Manage Product <GiFruitTree />
          </h1>
        </div>
        {/* searching and filtering */}

        <div className="flex gap-6">
          <div>
            <Input
              label="Search By ID"
              placeholder="Enter the Product ID "
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              onChange={(e) => handleSearchById(e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Search By Name"
              placeholder="Enter Plant Name"
              inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
              onChange={(e) => handleSearchByName(e.target.value)}
            />
          </div>
          <div>
            <div>
              <Select
                label="Select Plant Type"
                options={options}
                onChange={handleTrendingProductSearch}
                value={value}
                dropdownClassName="bg-white"
                selectClassName="border-lime-500 bg-white w-[200px] opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-4"
              />
            </div>
          </div>
        </div>
        {/* data table */}
        <div className="overflow-x-auto">
          <table className="table mt-8">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Price</th>
                <th>Details</th>
                <th>Make Trending</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {filteredProducts?.map((item, index) => (
                <>
                  <tr key={item?._id}>
                    <td>{index + 1}</td>
                    <td className="lg:w-1/6">{item?.name.slice(0, 50)}...</td>
                    <td>{item?.category}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item?.images?.[3]?.url} alt="img" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-[18px] font-bold">
                        ${item.newPrice}
                      </span>
                      <span className="ml-2">
                        <del>{item.previousPrice}</del>
                      </span>
                    </td>
                    {/* <Link to={`/product/${item._id}`}> */}
                    <td>
                      <Link to={`/product/${item?._id}`}>
                        <span className="text-4xl text-lime-500 hover:text-lime-800">
                          <IoInformationCircle />
                        </span>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleTrendingProduct(item?._id)}>
                        <span className="text-2xl text-lime-500 hover:text-lime-800">
                          {item?.trending == true ? (
                            <span className="animate-pulse">🔥</span>
                          ) : (
                            <span>❄️</span>
                          )}
                        </span>
                      </button>
                    </td>
                    {/* </Link> */}
                    {/* update info */}

                    <td>
                      {/* <Link to={`/dashboard/updateProduct/${item._id}`}> */}
                      <button>
                        <span className="text-2xl hover:text-lime-700">
                          <TfiWrite />
                        </span>
                      </button>
                      {/* </Link> */}
                    </td>

                    {/* delete info */}
                    <td>
                      <button
                      //   onClick={() => handleDeleteProduct(item._id)}
                      >
                        <span className="text-xl text-red-600 hover:text-orange-500">
                          <FaTrash />
                        </span>
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
