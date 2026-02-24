import { BsCartPlusFill, BsDatabaseFillGear } from "react-icons/bs";
import { GiTreeGrowth } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import MenuItem from "./MenuItem";

const ModeratorMenu = () => {
  return (
    <div>
      <MenuItem icon={MdDashboard} label="My Dashboard" address="user-dashboard" />
      <MenuItem icon={GiTreeGrowth} label="Add Product" address="add-product" />
      <MenuItem icon={BsDatabaseFillGear} label="Manage Product" address="manage-product" />
      <MenuItem icon={BsCartPlusFill} label="Manage Order" address="manage-order" />

      <hr />
    </div>
  );
};

export default ModeratorMenu;
