import { useSelector } from "react-redux";
import ProductCard from "../../shared/productCard/ProductCard";
import SectionTitle from "./../../shared/sectionTitle/SectionTitle";

const TrendingProduct = () => {
  const { trendingProducts } = useSelector((state) => state.products);

  return (
    <>
      <section className="mt-24">
        <SectionTitle
          subHeading="popularized products here"
          heading="Our Trending Trees"
        ></SectionTitle>

        {/* product cards */}
        <div className="px-24 py-24">
          <div className="w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 lg:gap-3 2xl:gap-12">
            {trendingProducts?.map((plant) => (
              <ProductCard key={plant._id} plants={plant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingProduct;
