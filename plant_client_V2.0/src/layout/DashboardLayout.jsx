import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserCartItemQuery } from "../features/users/cartApi";
import { useEffect } from "react";
import { userLoggedIn } from "../features/auth/authSlice";
import { cartItem } from "../features/users/cartSlice";

const DashboardLayout = () => {
  // ======================================
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user?.data);
  const {
    data: cart,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetUserCartItemQuery(user?._id);
  // ======================================

  // set data to localStorage
  useEffect(() => {
    if (localStorage.length > 0) {
      const user = localStorage.getItem("auth");
      const data = JSON.parse(user);
      if (user) {
        dispatch(userLoggedIn(JSON.parse(user)));
      }
    }
  }, [dispatch]);

  // fetch cart item to redux local store
  useEffect(() => {
    if (isCartSuccess) {
      dispatch(cartItem(cart));
    }
  }, [cart, isCartSuccess, dispatch]);

  // ======================================
  return (
    <div className="relative min-h-screen md:flex bg-[#ebf7f6]">
      {/* Sidebar Component */}
      <Sidebar />
      <div className="flex-1 md:ml-64 ">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
