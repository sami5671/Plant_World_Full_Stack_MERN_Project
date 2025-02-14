import { useState, useEffect } from "react";

const ProductCarousel = ({ plantImg }) => {
  const [activeImg, setActiveImg] = useState("");

  // Update activeImg when plantImg changes
  useEffect(() => {
    if (plantImg?.length > 0) {
      setActiveImg(plantImg[0]?.url);
    }
  }, [plantImg]);

  return (
    <div className="flex flex-col justify-between lg:flex-row">
      <div className="flex flex-col gap-6">
        {/* Main Image Display */}
        {activeImg && (
          <img
            src={activeImg}
            alt="Product"
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
        )}

        {/* Thumbnail Images */}
        <div className="flex flex-row justify-between h-24">
          {plantImg?.map((item, index) => (
            <img
              key={index}
              src={item.url}
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 lg:w-24 lg:h-24 rounded-md cursor-pointer ${
                activeImg === item.url ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveImg(item.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
