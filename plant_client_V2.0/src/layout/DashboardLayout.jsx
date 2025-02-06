import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex bg-[#ebf7f6]">
      {/* Sidebar Component */}
      <Sidebar />
      <div className="flex-1 md:ml-64 ">
        <div className="p-5">
          {/* Outlet for dynamic contents */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
