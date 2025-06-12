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
      <section className="px-12 py-24">
        <div className="flex justify-between gap-6 mt-12">
          {/* filtering plants */}
          <div className="bg-primary-backgroundColor w-1/4 px-12 py-8 rounded-xl">
            <SearchAndFilterProduct />
          </div>
          {/* all plants */}
          <div className="w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-3 2xl:gap-12">
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
