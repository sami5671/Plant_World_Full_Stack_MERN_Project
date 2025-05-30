import { FaCartShopping } from "react-icons/fa6";
import { GiFruitTree } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LargeScreenLogo = () => {
  const cart = useSelector((state) => state?.cart);
  return (
    <div className="flex-1 gap-2">
      <span className="hidden lg:block">
        <GiFruitTree className="text-2xl text-lime-600" />
      </span>
      <a className="hidden lg:block bg-gradient-to-br from-lime-400 to-green-700 text-transparent bg-clip-text font-Rancho font-bold text-2xl">
        Plant World
      </a>
      <div>
        <Link to="/dashboard/cart">
          <span>
            <FaCartShopping className="text-2xl mr-6 lg:text-3xl text-lime-500 lg:mr-2" />
            <span className="badge absolute -mt-10 ml-2 lg:ml-5 text-lime-600 font-bold">
              {cart?.totalCartItem}
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LargeScreenLogo;
