import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const LargeScreenNavbar = () => {
  const location = useLocation();
  return (
    <>
      <div className="hidden lg:block ">
        <ul className="flex items-center gap-10 justify-center text-[16px] font-serif font-semibold text-white text-transparent bg-clip-text">
          {location.pathname === "/" ? (
            <Link to="/">
              <li className="border-white border-b-2 text-white">Home</li>
            </Link>
          ) : (
            <Link to="/">
              <li className="hover:border-white hover:border-b-2 hover:text-white">
                Home
              </li>
            </Link>
          )}
          {location.pathname === "/allProduct" ? (
            <Link to="/allProduct">
              <li className="border-white border-b-2 text-white">Products</li>
            </Link>
          ) : (
            <Link to="/allProduct">
              <li className="hover:border-white hover:border-b-2 hover:text-white">
                Products
              </li>
            </Link>
          )}

          <li className="hover:border-white hover:border-b-2 hover:text-white">
            About Us
          </li>
        </ul>
      </div>
    </>
  );
};

export default LargeScreenNavbar;
