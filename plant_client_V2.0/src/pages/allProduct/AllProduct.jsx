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
    <>
      <section className="lg:px-12 lg:py-24 px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mt-12">
          {/* filtering plants */}
          <div className="bg-primary-backgroundColor lg:w-1/4 h-fit px-6 lg:px-12 py-10 lg:py-16 rounded-xl">
            <SearchAndFilterProduct />
          </div>
          {/* all plants */}
          <div className="w-full lg:w-3/4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-3 2xl:gap-12">
            {filteredProducts?.map((plant) => (
              <ProductCard key={plant._id} plants={plant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllProduct;
