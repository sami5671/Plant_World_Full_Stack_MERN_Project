import { Link } from "react-router-dom";

const LargeScreenNavbar = () => {
  return (
    <>
      <div className="hidden lg:block ">
        <ul className="flex items-center gap-10 justify-center text-[16px] font-serif font-semibold bg-gradient-to-br from-blue-500 to-white text-transparent bg-clip-text">
          <Link to="/">
            <li className="border-white border-b-2 text-white">Home</li>
          </Link>

          <Link to="/allProduct">
            <li className="border-white border-b-2 text-white">Products</li>
          </Link>
          <li className="hover:border-white hover:border-b-2 hover:text-white">
            About Us
          </li>
        </ul>
      </div>
    </>
  );
};

export default LargeScreenNavbar;
