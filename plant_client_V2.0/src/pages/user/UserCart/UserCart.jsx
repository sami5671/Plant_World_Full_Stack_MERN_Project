import { useSelector } from "react-redux";
import { Progressbar } from "rizzui";

const UserCart = () => {
  const cart = useSelector((state) => state?.cart?.plants);
  console.log(cart);
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Cart Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold">Your Cart</h1>
        <p className="text-sm mt-2 text-green-600 font-semibold">
          1 item ships at checkout
        </p>
      </div>

      {/* Free shipping progress */}
      <div className="border p-4 rounded-lg mb-6 flex items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-sm text-gray-700 font-medium">
            You're <span className="font-bold text-red-600">$8</span> away from
            FREE SHIPPING!
          </p>
          <Progressbar value={20} size="sm" color="danger" className="w-64" />
        </div>
        <button className="ml-4" variant="outline">
          Keep Shopping
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Area */}
        <div className="flex-1 border rounded-lg p-4">
          {cart?.map((item) => (
            <>
              <div className="flex items-center justify-between gap-6 bg-lime-300">
                <img
                  src={item?.images?.[0]?.url}
                  alt="product"
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">6 Blade Starter Kit</h2>
                  <p className="text-sm text-gray-500">2 items</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button size="sm">-</button>
                    <span className="px-3">1</span>
                    <button size="sm">+</button>
                  </div>
                </div>
                <p className="text-lg font-bold">$10</p>
              </div>
            </>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Summary</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal (1 item)</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Discount</span>
              <span className="text-red-500">- $2.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Handling</span>
              <span>$4.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (Calculated at checkout)</span>
              <span>$0.00</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Balance</span>
            <span>$12.00</span>
          </div>
          <button className="w-full mt-4">Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default UserCart;
