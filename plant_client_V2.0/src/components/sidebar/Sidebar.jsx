import { RiLogoutCircleLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { GiPalmTree } from "react-icons/gi";
import { MdMenu } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import ModeratorMenu from "./ModeratorMenu";
import UserMenu from "./UserMenu";
import MenuItem from "./MenuItem";
import Logo from "../shared/logo/Logo";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);
  const isAdmin = true;
  const isModerator = false;
  // =================================================================
  const handleToggle = () => {
    setActive(!isActive);
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

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <MdMenu className="h-5 w-5" />
        </button>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-primary-dashboardPrimaryColor w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center mx-auto">
              {/* logo */}
              <Logo color={"text-white"} />
              {/* logo */}
            </div>
            <hr />
            <hr />
            <hr />
          </div>

          <div>
            <h1 className="text-center text-white font-bold">
              {isAdmin ? (
                <p>Admin</p>
              ) : isModerator ? (
                <p>Moderator</p>
              ) : (
                <p>User</p>
              )}
            </h1>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-1 ">
            {/* If a user is host */}
            {/* {role === "host" ? <ToggleBtn toggleHandler={toggleHandler} /> : ""} */}
            <nav>
              {isAdmin ? (
                <AdminMenu />
              ) : isModerator ? (
                <ModeratorMenu />
              ) : (
                <UserMenu />
              )}

              <MenuItem icon={FaHome} label="Home" address="/" />
              <MenuItem
                icon={GiPalmTree}
                label="All Products"
                address="/allProduct"
              />
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <MenuItem
            icon={IoSettingsSharp}
            label="Profile"
            address="/dashboard/my-profile"
          />
          <button
            // onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-300 hover:bg-white hover:text-black transition-colors duration-300 transform"
          >
            <RiLogoutCircleLine />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
