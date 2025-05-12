import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../features/products/productsApi";
import OrderSummary from "./OrderSummary";
import ProductCarousel from "./ProductCarousel";
import ProductDetailsTable from "./ProductDetailsTable";
import DOMPurify from "dompurify"; // For sanitizing HTML content
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
    <section className="px-4 py-6 lg:px-12 lg:py-24">
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

      {/* About Section */}
      <div className="mt-6 bg-gray-100 px-4 py-6 lg:px-12 lg:py-12 rounded-2xl shadow-2xl max-h-[550px] overflow-y-auto lg:h-auto lg:overflow-y-hidden">
        <h3 className="text-2xl font-bold underline">About Plant:</h3>
        <br />
        <p
          className="text-gray-700 lg:w-1/2"
          style={{ textAlign: "justify" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(plant?.description),
          }}
        ></p>
      </div>
    </section>
  );
};

export default ProductDetails;
