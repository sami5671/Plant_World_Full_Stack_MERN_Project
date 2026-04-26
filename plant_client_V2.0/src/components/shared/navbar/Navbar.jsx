import Logo from "../logo/Logo";
import LargeScreenNavbar from "./LargeScreenNavbar";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 h-16 mainThemeColor shadow-lg rounded-full transition-all duration-300">
        <div className="h-full w-full">
          <div className="flex flex-row items-center justify-between h-full gap-3 md:gap-0 px-6">
            {/* Logo */}
            <Logo />
            {/* large screen navbar */}
            <LargeScreenNavbar />

            <div className="flex items-center gap-4">
              {/* Dropdown Menu */}
              <MenuDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
