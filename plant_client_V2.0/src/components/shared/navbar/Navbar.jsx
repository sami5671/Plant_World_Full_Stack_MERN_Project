import { GiFruitTree } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../../Hooks/UseAuth";
import LargeScreenLogo from "../logo/LargeScreenLogo";
import { userLoggedOut } from "../../../features/auth/authSlice";
import { resetCart } from "../../../features/users/cartSlice";
import defaultAvater from "../../../../public/Images/profile.png";
import MenuDropdown from "./MenuDropdown";
import LargeScreenNavbar from "./LargeScreenNavbar";
import Logo from "../logo/Logo";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  const { email, fullName, avatar, mobile, role } = user || {};

  // console.log();

  const getRole = UseAuth();
  // console.log(getRole);

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    dispatch(resetCart());
  };

  return (
    <>
      <div className="fixed top-0 rounded-full mainThemeColor w-full z-10 h-16 shadow-lg lg:py-10">
        <div className="h-full max-w-7xl mx-auto">
          <div className="flex flex-row items-center justify-between h-full gap-3 md:gap-0">
            {/* Logo */}
            <Logo />
            {/* large screen navbar */}
            <LargeScreenNavbar />
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
