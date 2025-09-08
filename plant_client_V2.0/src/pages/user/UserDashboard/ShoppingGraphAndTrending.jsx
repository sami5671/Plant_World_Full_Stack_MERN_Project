import { useSelector } from "react-redux";
import ShoppingActivityGraph from "../ShoppingAcitivity/ShoppingActivityGraph";
import { IoInformationCircle } from "react-icons/io5";
import { GiFruitTree } from "react-icons/gi";
import { Link } from "react-router-dom";
const ShoppingGraphAndTrending = () => {
  const { trendingProducts } = useSelector((state) => state?.userOrders);

  return (
    <div className="p-6 rounded-xl shadow flex lg:flex-row flex-col gap-6">
      <div className="lg:w-2/4 bg-white p-6 rounded-xl shadow-lg">
        <div>
          {/* <Select
            label="Select Year"
            options={yearOptions}
            onChange={handleYearBasedGraph}
            value={value}
            dropdownClassName="bg-white"
            selectClassName="border-lime-500 bg-white w-[200px] opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-4"
          /> */}
        </div>
        <ShoppingActivityGraph />
      </div>
      <div className="lg:w-2/4 lg:h-[480px] bg-white p-4 rounded-xl shadow-lg flex flex-col gap-1 items-center justify-center">
        <div>
          <h1 className="bg-primary-dashboardPrimaryColor text-white font-semibold rounded-md px-1 flex items-center gap-2">
            Trending Products <GiFruitTree />
          </h1>
        </div>
        <div className="overflow-x-auto h-[350px]">
          <table className="table table-pin-rows mt-3">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Details</th>
                <th>Trending</th>
              </tr>
            </thead>
            <tbody className="">
              {trendingProducts?.map((item, index) => (
                <tr key={item?._id}>
                  <td>{index + 1}</td>
                  <td className="lg:w-1/6">{item?.name.slice(0, 20)}...</td>

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
                  <td>
                    <Link to={`/product/${item?._id}`}>
                      <span className="text-2xl text-lime-500 hover:text-lime-800">
                        <IoInformationCircle />
                      </span>
                    </Link>
                  </td>
                  <td>
                    <span className="animate-pulse text-2xl">🔥</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShoppingGraphAndTrending;
