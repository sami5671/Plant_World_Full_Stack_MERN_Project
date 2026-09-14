import { Input } from "rizzui/input";
import Swal from "sweetalert2";
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
import { useGetProductsQuery } from "../../../features/products/productsApi";
import {
  useAddTrendingProductMutation,
  useDeleteProductMutation,
} from "../../../features/adminControl/adminControlApi";
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
  const [
    deleteProduct,
    {
      isSuccess: isDeleteProductSuccess,
      isError: isDeleteProductError,
      refetch: afterDeleteRefetch,
    },
  ] = useDeleteProductMutation();

  const { filteredProducts } = useSelector((state) => state.manageProducts);
  const [value, setValue] = useState(null);

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

  // delete product
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // call the delete method
        deleteProduct({ plantId: id });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        afterDeleteRefetch();
      }
    });
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
      <div className="relative z-10">

        <section className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
              Manage Product <GiFruitTree className="text-emerald-600" />
            </h1>
          </div>
          {/* searching and filtering */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <Input
                label="Search By ID"
                placeholder="Enter the Product ID "
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                onChange={(e) => handleSearchById(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Search By Name"
                placeholder="Enter Plant Name"
                inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3 w-full"
                onChange={(e) => handleSearchByName(e.target.value)}
              />
            </div>
            <div>
              <Select
                label="Select Plant Type"
                options={options}
                onChange={handleTrendingProductSearch}
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
                  <th className="bg-transparent">No</th>
                  <th className="bg-transparent">Name</th>
                  <th className="bg-transparent">Category</th>
                  <th className="bg-transparent">Image</th>
                  <th className="bg-transparent">Price</th>
                  <th className="bg-transparent">Details</th>
                  <th className="bg-transparent">Make Trending</th>
                  <th className="bg-transparent">Update</th>
                  <th className="bg-transparent">Delete</th>
                </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}

                {filteredProducts?.map((item, index) => (
                  <tr key={item?._id} className="border-b border-slate-100/50 hover:bg-emerald-50/30 transition-colors">
                    <td className="text-slate-600 font-medium">{index + 1}</td>
                    <td className="lg:w-1/6 text-slate-700 font-medium">{item?.name.slice(0, 50)}...</td>
                    <td className="text-slate-600 capitalize">{item?.category}</td>
                    <td>
                      <div className="avatar drop-shadow-sm">
                        <div className="mask mask-squircle h-12 w-12 border border-emerald-100">
                          <img src={item?.images?.[3]?.url} alt="img" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-[18px] font-bold text-emerald-700">
                        ${item.newPrice}
                      </span>
                      <span className="ml-2 text-slate-400">
                        <del>{item.previousPrice}</del>
                      </span>
                    </td>
                    <td>
                      <Link to={`/product/${item?._id}`}>
                        <span className="text-3xl text-emerald-500 hover:text-emerald-700 transition-colors inline-block">
                          <IoInformationCircle />
                        </span>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleTrendingProduct(item?._id)} className="transition-transform hover:scale-110">
                        <span className="text-2xl drop-shadow-sm">
                          {item?.trending == true ? (
                            <span className="animate-pulse">🔥</span>
                          ) : (
                            <span>❄️</span>
                          )}
                        </span>
                      </button>
                    </td>
                    <td>
                      <Link to={`/dashboard/updateProduct/${item._id}`}>
                        <button className="transition-transform hover:scale-110">
                          <span className="text-2xl text-teal-600 hover:text-teal-800">
                            <TfiWrite />
                          </span>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteProduct(item._id)} className="transition-transform hover:scale-110">
                        <span className="text-xl text-rose-500 hover:text-rose-700">
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
      </div>
    </>
  );
};

export default ManageProduct;
