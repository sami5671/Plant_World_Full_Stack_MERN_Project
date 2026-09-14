import ProductCard from "../../components/shared/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import SearchAndFilterProduct from "./SearchAndFilterProduct";
import { allPlants } from "../../features/products/productsSlice";
import { useEffect } from "react";
import { useGetProductsQuery } from "../../features/products/productsApi";

const AllProduct = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading, isError } = useGetProductsQuery();
  const { filteredProducts } = useSelector((state) => state?.products);

  // set to redux local store
  useEffect(() => {
    if (isSuccess) {
      dispatch(allPlants(data));
    }
  }, [data, dispatch, isSuccess]);

  return (
    <div className="relative z-10">

      <section className="lg:px-12 lg:py-24 px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8 mt-12">
          {/* filtering plants */}
          <div className="lg:w-1/4 h-fit bg-white/70 backdrop-blur-xl border border-white/50 px-6 lg:px-8 py-10 lg:py-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <SearchAndFilterProduct />
          </div>
          {/* all plants */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((plant) => (
              <ProductCard key={plant._id} plants={plant} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProduct;
