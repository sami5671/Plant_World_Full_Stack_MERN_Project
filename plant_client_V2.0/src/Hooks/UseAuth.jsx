import { useSelector } from "react-redux";

const UseAuth = () => {
  const user = useSelector((state) => state?.auth?.user?.data);

  const { role } = user?.data || {};

  if (role === "admin") {
    return "admin";
  } else if (role === "moderator") {
    return "moderator";
  } else {
    return "user";
  }
};

export default UseAuth;
