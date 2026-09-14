import { useSelector } from "react-redux";
import ShoppingActivityGraph from "../ShoppingAcitivity/ShoppingActivityGraph";
import { IoInformationCircle } from "react-icons/io5";
import { GiFruitTree } from "react-icons/gi";
import { Link } from "react-router-dom";
const ShoppingGraphAndTrending = () => {
  const { trendingProducts } = useSelector((state) => state?.userOrders);

  return (
    <div className="flex lg:flex-row flex-col gap-6">
      <div className="lg:w-2/4 bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
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
      <div className="lg:w-2/4 lg:h-[400px] bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 items-center">
        <div className="mb-2">
          <h1 className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent font-bold text-xl drop-shadow-sm flex items-center gap-2">
            Trending Products <GiFruitTree className="text-emerald-600" />
          </h1>
        </div>
        <div className="overflow-x-auto h-[350px] w-full">
          <table className="table table-pin-rows mt-3">
            <thead>
              <tr className="bg-emerald-50/50 text-slate-600 border-b border-emerald-100/50">
                <th className="bg-transparent">No</th>
                <th className="bg-transparent">Name</th>
                <th className="bg-transparent">Image</th>
                <th className="bg-transparent">Price</th>
                <th className="bg-transparent">Details</th>
                <th className="bg-transparent">Trending</th>
              </tr>
            </thead>
            <tbody className="">
              {trendingProducts?.map((item, index) => (
                <tr key={item?._id} className="border-b border-slate-100/50 hover:bg-emerald-50/30 transition-colors">
                  <td className="text-slate-600 font-medium">{index + 1}</td>
                  <td className="lg:w-1/6 text-slate-700 font-medium">{item?.name.slice(0, 20)}...</td>

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
                      <span className="text-2xl text-emerald-500 hover:text-emerald-700 transition-colors">
                        <IoInformationCircle />
                      </span>
                    </Link>
                  </td>
                  <td>
                    <span className="animate-pulse text-2xl drop-shadow-sm">🔥</span>
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
