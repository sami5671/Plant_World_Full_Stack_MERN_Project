import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartCalculation = useSelector((state) => state?.cart);
  return (
    <>
      {/* order Summary */}
      <div className="w-full lg:h-96 bg-gray-50 rounded-xl p-6 shadow-xl ">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal ({cartCalculation?.totalCartItem} item)</span>
            <span>${cartCalculation?.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Discount</span>
            <span className="text-red-500 font-bold">
              -${cartCalculation?.shippingDiscount}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping & Handling</span>
            <span>${cartCalculation?.shippingHandling}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (Calculated at checkout)</span>
            <span>$0.00</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total Payable</span>
          {cartCalculation?.totalPrice == 0 ? (
            <span>$0.00</span>
          ) : (
            <span>${cartCalculation?.totalPriceAfterDiscount}</span>
          )}
        </div>
        <button className="w-full mt-4 bg-primary-dashboardPrimaryColor py-2 rounded-lg text-white font-semibold hover:bg-primary-dashboardPrimaryTextColor">
          Checkout
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
