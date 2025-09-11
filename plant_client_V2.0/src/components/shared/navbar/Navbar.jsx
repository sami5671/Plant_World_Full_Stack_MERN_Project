import MenuDropdown from "./MenuDropdown";
import LargeScreenNavbar from "./LargeScreenNavbar";
import Logo from "../logo/Logo";
const Navbar = () => {
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
