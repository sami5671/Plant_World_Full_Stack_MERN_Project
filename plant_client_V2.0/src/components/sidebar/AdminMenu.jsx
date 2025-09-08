import MenuItem from "./MenuItem";
import { FaUsersGear } from "react-icons/fa6";
import { GiTreeGrowth } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";
import { BsCartPlusFill } from "react-icons/bs";

const AdminMenu = () => {
  return (
    <div>
      <MenuItem
        icon={MdDashboard}
        label="My Dashboard"
        address="user-dashboard"
      />
      <MenuItem
        icon={MdDashboard}
        label="Business Dashboard"
        address="admin-dashboard"
      />
      <MenuItem icon={GiTreeGrowth} label="Add Product" address="add-product" />
      <MenuItem
        icon={BsDatabaseFillGear}
        label="Manage Product"
        address="manage-product"
      />

      <MenuItem
        icon={BsCartPlusFill}
        label="Manage Order"
        address="manage-order"
      />
      <MenuItem
        icon={FaUsersGear}
        label="Manage Users"
        address="manage-users"
      />
      <hr />
    </div>
  );
};

export default AdminMenu;
