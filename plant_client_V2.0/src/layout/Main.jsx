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
    <div className="relative min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-50 overflow-hidden font-inter">
      {/* Global decorative blurs for website */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-lime-200/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[35%] h-[50%] bg-emerald-200/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Global Loader */}
        {navigation.state === "loading" && <Loader />}

        {/* Conditionally Render Navbar */}
        {!noHeaderFooter && <Navbar />}

        {/* Main Content */}
        <main className="flex-grow pt-16">
          <Outlet />
        </main>

        {/* Conditionally Render Footer */}
        {!noHeaderFooter && <Footer />}
      </div>
    </div>
  );
};

export default Main;
