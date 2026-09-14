import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserCartItemQuery } from "../features/users/cartApi";
import { useEffect } from "react";
import { cartItem } from "../features/users/cartSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const {
    data: cart,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetUserCartItemQuery(user?._id);

  // fetch cart item to redux local store
  useEffect(() => {
    if (isCartSuccess) {
      dispatch(cartItem(cart.data));
    }
  }, [cart, isCartSuccess, dispatch]);

  return (
    <div className="relative min-h-screen md:flex bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Global decorative blurs for dashboard */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-lime-200/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] -right-[5%] w-[35%] h-[45%] bg-emerald-200/20 rounded-full blur-[100px]"></div>
      </div>

      <Sidebar />
      <div className="flex-1 md:ml-64 relative z-10">
        <div className="p-5 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
