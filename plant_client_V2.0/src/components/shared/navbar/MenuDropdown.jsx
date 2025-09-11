import { FaUser } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import defaultImg from "../../../../public/Images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../features/users/cartSlice";
import { userLoggedOut } from "../../../features/auth/authSlice";
import UseAuth from "../../../Hooks/UseAuth";
const MenuDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = UseAuth();
  const { totalCartItem } = useSelector((state) => state?.cart);
  const user = useSelector((state) => state?.auth?.user);

  // const user = true;
  const isAdmin = false;

  const isModerator = false;
  const favoriteCar = 2;

  // console.log(role);

  // console.log(user.avatar);
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    dispatch(resetCart());
    navigate("/");
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center px-4 gap-5">
        {/* ========navbar for large screen========= */}

        {/* for cart */}
        <Link to="/dashboard/cart">
          <div className="mt-1">
            <span className="text-white">
              <FaShoppingCart className="text-xl lg:text-2xl cursor-pointer" />
            </span>
            {totalCartItem > 0 ? (
              <div className="absolute">
                <span className="flex flex-col justify-center items-center font-semibold px-2 -mt-[30px] lg:-mt-[36px] ml-3 lg:ml-4 bg-white text-black rounded-badge">
                  {totalCartItem}
                </span>
              </div>
            ) : (
              " "
            )}
          </div>
        </Link>
        {/* for cart */}
        {/* Dropdown btn */}
        <div className="dropdown dropdown-end text-lime-600 font-semibold">
          <div tabIndex={0} role="button" className="">
            <div className="">
              <img
                className="rounded-full border-2 border-white w-10 h-10"
                referrerPolicy="no-referrer"
                src={user && user?.avatar ? user?.avatar : defaultImg}
                alt="profile"
              />
            </div>
          </div>

          {user ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border-2 border-lime-500"
            >
              <li>
                {role === "admin" ? (
                  <Link to="/dashboard/admin-dashboard">
                    <button className=" hover:text-black hover:font-bold">
                      <span className="flex items-center gap-2">
                        <MdOutlineDashboard />
                        Dashboard
                      </span>
                    </button>
                  </Link>
                ) : role === "moderator" ? (
                  <Link to="/dashboard/moderator-dashboard">
                    <button className=" hover:text-black hover:font-bold">
                      <span className="flex items-center gap-2">
                        <MdOutlineDashboard />
                        Dashboard
                      </span>
                    </button>
                  </Link>
                ) : role === "user" ? (
                  <Link to="/dashboard/user-dashboard">
                    <button className=" hover:text-black hover:font-bold">
                      <span className="flex items-center gap-2">
                        <MdOutlineDashboard />
                        Dashboard
                      </span>
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </li>
              <li>
                <Link to="/dashboard/my-profile">
                  <button className=" hover:text-black hover:font-bold">
                    <span className="flex items-center gap-2">
                      <FaUser /> Profile
                    </span>
                  </button>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className=" hover:text-black hover:font-bold"
                >
                  <span className="flex items-center gap-2">
                    <RiLogoutCircleLine />
                    Logout
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-2 shadow-2xl border-2 bg-base-100 rounded-box w-52 h-24 border-lime-500 text-lime-600"
            >
              <li>
                <Link to="/login">
                  <button className="500 font-semibold hover:text-black">
                    Login 🔐
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="500 font-semibold hover:text-black">
                    Sign Up 👤
                  </button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuDropdown;
