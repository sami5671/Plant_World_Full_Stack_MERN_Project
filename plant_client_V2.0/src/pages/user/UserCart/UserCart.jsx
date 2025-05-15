import { useDispatch, useSelector } from "react-redux";
import { useUpdateCartItemMutation } from "../../../features/users/cartApi";
import { cartItem } from "../../../features/users/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaStripe } from "react-icons/fa";

const UserCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  const cartCalculation = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.auth?.user?.data);
  const [updateCartItem, { data, error, isLoading, isSuccess, isError }] =
    useUpdateCartItemMutation();

  // console.log(cartCalculation.totalCartItem);
  // ==============================================
  const handleMinusCart = async (plantId, action) => {
    const userId = user?._id;
    try {
      const res = await updateCartItem({ plantId, userId, action }).unwrap();

      dispatch(cartItem(res.message));
    } catch (error) {
      toast.error("Can not reduce cart quantity");
    }
  };

  const handlePlusCart = async (plantId, action) => {
    const userId = user?._id;
    try {
      const res = await updateCartItem({ plantId, userId, action }).unwrap();
      dispatch(cartItem(res.message));
    } catch (error) {
      toast.error("Can not update cart quantity");
    }
  };

  // ==============================================
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Cart Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-semibold">Your Cart</h1>
        <p className="text-sm mt-2 text-green-600 font-semibold">
          {cartCalculation.totalCartItem} item ships at checkout
        </p>
      </div>

      {/* Free shipping progress */}
      {/* Free shipping progress */}
      <div className="border p-4 rounded-lg mb-6 flex items-center justify-between text-white bg-primary-dashboardPrimaryColor">
        {cartCalculation?.totalPrice === "0.00" ? (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-medium">
              You're
              <span className="font-bold mx-2 text-xl">$ 30</span>
              AWAY FOR FREE SHIPPING!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {cartCalculation?.freeShipping === 0 ? (
              <p className="text-sm font-semibold">
                🎉 Congratulations! You’re eligible for free shipping!
              </p>
            ) : (
              <p className="text-sm font-medium">
                You're
                <span className="font-bold mx-2 text-xl">
                  $ {cartCalculation?.freeShipping}
                </span>
                AWAY FOR FREE SHIPPING!
              </p>
            )}
          </div>
        )}

        {cartCalculation?.freeShipping !== "" && (
          <Link to="/allProduct">
            <button className="ml-4  px-6 py-1 text-green-600 font-bold rounded-bl-full rounded-tr-full text-sm bg-gray-200 hover:bg-white hover:text-green-700 transition">
              Keep Shopping
            </button>
          </Link>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 shadow-xl lg:min-h-96 px-4 py-6">
        {/* Product Area */}
        <div className="flex-1 rounded-lg p-4 max-h-[350px] overflow-y-auto">
          {cart?.plants?.map((item) => (
            <div
              key={item?.plant?._id}
              className="flex items-center justify-between gap-6  mt-4 px-4 py-2 rounded-2xl shadow-md"
            >
              <img
                src={item?.plant?.images?.[3]?.url}
                alt="product"
                className="w-28 h-28 object-cover rounded-lg shadow-md shadow-lime-700"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item?.plant?.name}</h2>
                <p className="text-sm text-gray-500">{item?.quantity} pieces</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full border text-lg flex items-center justify-center hover:bg-gray-200"
                    onClick={() => handleMinusCart(item?.plant?._id, "minus")}
                  >
                    -
                  </button>
                  <span className="px-3">{item?.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full border text-lg flex items-center justify-center hover:bg-gray-200"
                    onClick={() => handlePlusCart(item?.plant?._id, "plus")}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-lg font-bold">${item?.plant?.newPrice}</p>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 bg-gray-50 rounded-xl p-6 shadow-xl ">
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
          <div>
            <Link to="/dashboard/payment">
              <button className="w-full mt-4 bg-primary-dashboardPrimaryColor py-2 rounded-lg text-white font-semibold hover:bg-primary-dashboardPrimaryTextColor">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserCart;
