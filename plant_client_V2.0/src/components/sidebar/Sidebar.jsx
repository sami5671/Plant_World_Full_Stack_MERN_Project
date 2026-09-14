import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";
import { resetCart } from "../../features/users/cartSlice";
import UseAdmin from "../../Hooks/UseAdmin";
import UseModerator from "../../Hooks/UseModerator";
import Logo from "../shared/logo/Logo";
import AdminMenu from "./AdminMenu";
import MenuItem from "./MenuItem";
import ModeratorMenu from "./ModeratorMenu";
import UserMenu from "./UserMenu";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = UseAdmin();
  const isModerator = UseModerator();
  // =================================================================
  const handleToggle = () => {
    setActive(!isActive);
  };
  console.log(isModerator);
  const handleLogOut = () => {
    dispatch(userLoggedOut());
    dispatch(resetCart());
    navigate("/login");
  };

  // =================================================================
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-primary-backgroundColor text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            {/* logo */}
            <Logo />
            {/* logo */}
          </div>
        </div>

        <button onClick={handleToggle} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200">
          <MdMenu className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#62825D] to-emerald-900 shadow-2xl border-r border-emerald-800 w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition-all duration-300 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-3 rounded-xl justify-center items-center mx-auto bg-white/10 backdrop-blur-md border border-white/20 shadow-inner mb-6">
              {/* logo */}
              <Logo color={"text-white drop-shadow-md"} />
              {/* logo */}
            </div>
            <hr className="border-white/10 mb-6" />
          </div>

          <div className="mb-6">
            <h1 className="text-center text-emerald-50 font-bold uppercase tracking-widest text-[11px] bg-black/20 py-2.5 rounded-lg border border-white/10 shadow-inner backdrop-blur-sm">
              {isAdmin ? <p>Admin</p> : isModerator ? <p>Moderator</p> : <p>User</p>}
            </h1>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-1 ">
            {/* If a user is host */}
            {/* {role === "host" ? <ToggleBtn toggleHandler={toggleHandler} /> : ""} */}
            <nav>
              {isAdmin ? <AdminMenu /> : isModerator ? <ModeratorMenu /> : <UserMenu />}

              <MenuItem icon={FaHome} label="Home" address="/" />
              <MenuItem icon={GiPalmTree} label="All Products" address="/allProduct" />
            </nav>
          </div>
        </div>

        <div>
          <hr className="border-white/10 my-4" />
          <MenuItem icon={IoSettingsSharp} label="Profile" address="/dashboard/my-profile" />
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-3 mt-2 text-rose-200 hover:bg-rose-500/20 hover:text-rose-100 transition-all duration-300 transform rounded-xl border border-transparent hover:border-rose-500/30 font-medium"
          >
            <RiLogoutCircleLine className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
