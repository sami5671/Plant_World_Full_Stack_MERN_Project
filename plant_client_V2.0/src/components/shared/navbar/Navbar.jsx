import { GiFruitTree } from "react-icons/gi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UseAuth from "../../../Hooks/UseAuth";
import LargeScreenLogo from "../logo/LargeScreenLogo";
import { userLoggedOut } from "../../../features/auth/authSlice";
import { resetCart } from "../../../features/users/cartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user?.data);

  // console.log(cart);

  const { email, userName, avatar, mobile, role } = user || {};

  // console.log(avatar);

  const getRole = UseAuth();
  // console.log(getRole);

  // const user = true;
  const isAdmin = true;

  const handleLogOut = () => {
    dispatch(userLoggedOut());
    dispatch(resetCart());
  };

  return (
    <>
      <div className="navbar fixed bg-[#f4f3f1] z-10">
        <div className="navbar-start">
          <div className="dropdown block lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box border-2 border-lime-300 w-52"
            >
              <Link to="/">
                <li>
                  <a>Homepage</a>
                </li>
              </Link>
              <Link to="/allProduct">
                <li>
                  <a>Product</a>
                </li>
              </Link>
              <li>
                <a>About Us</a>
              </li>
              <Link to="/weather">
                <li className="hover:underline hover:text-lime-400">
                  <a>
                    <span className="flex gap-1 items-center">
                      Weather
                      <TiWeatherPartlySunny />
                    </span>
                  </a>
                </li>
              </Link>
              {getRole === "user" ||
              getRole === "admin" ||
              getRole === "moderator" ? (
                " "
              ) : (
                <Link to="/login">
                  <li>
                    <a>Login</a>
                  </li>
                </Link>
              )}
            </ul>
          </div>
          {/*  */}
          <div className="hidden lg:block">
            <ul className="flex gap-6 px-8 text-xl text-lime-600 ">
              <Link to="/">
                <li className="hover:underline hover:text-lime-400">
                  <a>Home</a>
                </li>
              </Link>
              <Link to="/allProduct">
                <li className="hover:underline hover:text-lime-400">
                  <a>Product</a>
                </li>
              </Link>
              <Link>
                <li className="hover:underline hover:text-lime-400">
                  <a>About Us</a>
                </li>
              </Link>
              <Link to="/weather">
                <li className="hover:underline hover:text-lime-400">
                  <a>
                    <span className="flex gap-1 items-center">
                      Weather
                      <span className="text-yellow-400">
                        <TiWeatherPartlySunny />
                      </span>
                    </span>
                  </a>
                </li>
              </Link>
              {/* <li className="hidden lg:block">
          <span className=" text-white ">
            <DarkMode className="-mt-12" />
          </span>
        </li> */}
            </ul>
          </div>
          {/*  */}
          <span className="block lg:hidden">
            <GiFruitTree className="text-2xl text-lime-600" />
          </span>
          <p className="-mt-1 lg:-mt-0">
            <span className="block text-white">{/* <DarkMode /> */}</span>
          </p>
        </div>

        {/*large screen logo */}
        <LargeScreenLogo />
        {/* large screen logo */}
        <div className="flex-none gap-2">
          <div className="">
            {getRole === "user" ||
            getRole === "admin" ||
            getRole === "moderator" ? (
              " "
            ) : (
              <Link to="/login">
                <button className="border-2 border-lime-500 transition duration-300 ease-in-out hover:border-white hover:text-white hover:bg-lime-300 lg:px-6 py-1">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div className="dropdown dropdown-end">
            {getRole === "user" ||
            getRole === "admin" ||
            getRole === "moderator" ? (
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img src={user?.avatar} alt="photo" />
                </div>
              </div>
            ) : (
              " "
            )}

            <ul
              tabIndex={0}
              className="font-Rancho mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box border-2 border-lime-300 w-52"
            >
              <li>
                <a className="justify-between">
                  {userName || user?.name}
                  {getRole === "admin" ? (
                    <span className="badge">Admin</span>
                  ) : getRole === "moderator" ? (
                    <span className="badge">Moderator</span>
                  ) : (
                    <span className="badge">User</span>
                  )}
                </a>
              </li>
              {getRole === "admin" ? (
                <li>
                  <Link to="/dashboard/admin-dashboard">Dashboard</Link>
                </li>
              ) : getRole === "moderator" ? (
                <li>
                  <Link to="/dashboard/moderator-dashboard">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard/user-dashboard">Dashboard</Link>
                </li>
              )}
              <li>
                <a>Settings</a>
              </li>
              {user ? (
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              ) : (
                <>
                  <Link to="/login">
                    <li>
                      <button>Login</button>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
