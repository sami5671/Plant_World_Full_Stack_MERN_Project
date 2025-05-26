import MenuItem from "./MenuItem";
import { FaCartShopping } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { RiShoppingBasket2Fill } from "react-icons/ri";
import { RiRefund2Line } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";

const UserMenu = () => {
  return (
    <div>
      <MenuItem
        icon={MdSpaceDashboard}
        label="Dashboard"
        address="user-dashboard"
      />
      <MenuItem icon={FaCartShopping} label="Your Cart" address="cart" />
      <MenuItem icon={FaTruck} label="Recent Oder" address="recent-order" />
      <MenuItem
        icon={RiShoppingBasket2Fill}
        label="Shopping Activity"
        address="shopping-activity"
      />
      <hr />
      <hr />

      <p className="text-center mt-2 text-white font-bold text-xl">support</p>
      <MenuItem
        icon={RiRefund2Line}
        label="Return & Refund"
        address="return-refund"
      />
      <MenuItem icon={AiFillMessage} label="Messages" address="message" />
      <hr />
      <hr />
    </div>
  );
};

export default UserMenu;
