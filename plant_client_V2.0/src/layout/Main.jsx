import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import Loader from "../components/shared/loader/Loader";

const Main = () => {
  const location = useLocation();
  const navigation = useNavigation();

  // Determine if Navbar and Footer should be hidden
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

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
