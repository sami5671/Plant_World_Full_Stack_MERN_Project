import { GiFruitTree } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ImMenu3 } from "react-icons/im";

const Logo = ({ color }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* small screen dropdown menu */}
      <div className="dropdown dropdown-start lg:hidden text-lime-600 font-semibold">
        <div tabIndex={0} role="button">
          <ImMenu3 className="text-white text-3xl ml-2" />
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-2 border-lime-500"
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allProduct">Products</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Weather</Link>
          </li>
        </ul>
      </div>

      {/* logo icon */}
      <div className="flex items-center gap-2">
        <GiFruitTree className="text-3xl text-white" />
        <Link to="/" className="hidden lg:block text-white font-bold text-2xl tracking-tight">
          Plant World
        </Link>
      </div>
    </div>
  );
};

export default Logo;
