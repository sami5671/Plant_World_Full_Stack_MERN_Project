import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import OrderSummary from "./OrderSummary";
import ProductCarousel from "./ProductCarousel";
import ProductDetailsTable from "./ProductDetailsTable";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    data: plants,
    isError,
    isSuccess,
    isLoading,
  } = useGetProductByIdQuery(id);

  const plant = plants?.data;
  const plantImg = plant?.images;

  return (
    <section className="px-12 py-24">
      {/* Product Carousel and Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12">
        {/* Image Carousel */}
        <div className="">
          <ProductCarousel plantImg={plantImg} />
        </div>

        {/* Product Details Table */}
        <div className="">
          <ProductDetailsTable plant={plant} />
        </div>

        {/* Order Summary */}
        <div className="">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
