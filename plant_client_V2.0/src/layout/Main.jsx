import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "../components/shared/footer/Footer";
import Loader from "../components/shared/loader/Loader";
import Navbar from "../components/shared/navbar/Navbar";
import { userLoggedIn } from "../features/auth/authSlice";
import { useGetUserCartItemQuery } from "../features/users/cartApi";
import { cartItem } from "../features/users/cartSlice";

const Main = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const {
    data: cart,
    isSuccess: isCartSuccess,
    isLoading: isCartLoading,
    isError: isCartError,
  } = useGetUserCartItemQuery(user?._id, { skip: !user });
  // Determine if Navbar and Footer should be hidden
  const noHeaderFooter = location.pathname.includes("login") || location.pathname.includes("signup");

  // set data to localStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const parsedData = JSON.parse(authData);
      dispatch(userLoggedIn({ user: parsedData.user, token: parsedData.token }));
    }
  }, []);

  // fetch cart item to redux local store
  useEffect(() => {
    if (user && isCartSuccess) {
      dispatch(cartItem(cart.data));
    }
  }, [cart, user, isCartSuccess, dispatch]);

  return (
    <div className="pt-16">
      {/* Global Loader */}
      {navigation.state === "loading" && <Loader />}

      {/* Conditionally Render Navbar */}
      {!noHeaderFooter && <Navbar />}

      {/* Main Content */}
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      {/* Conditionally Render Footer */}
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
