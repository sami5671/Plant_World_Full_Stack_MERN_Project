import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import Loader from "../components/shared/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userLoggedIn } from "../features/auth/authSlice";
import { useGetUserCartItemQuery } from "../features/users/cartApi";
import { cartItem } from "../features/users/cartSlice";

const Main = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user?.data);
  const {
    data: cart,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetUserCartItemQuery(user?._id);
  // Determine if Navbar and Footer should be hidden
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

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

  return (
    <div className="">
      {/* Global Loader */}
      {navigation.state === "loading" && <Loader />}

      {/* Conditionally Render Navbar */}
      {!noHeaderFooter && <Navbar />}

      {/* Main Content */}
      <Outlet />

      {/* Conditionally Render Footer */}
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
