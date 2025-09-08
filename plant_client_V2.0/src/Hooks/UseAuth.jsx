import { useSelector } from "react-redux";

const UseAuth = () => {
  const user = useSelector((state) => state?.auth?.user);

  const { role } = user || {};

  if (role === "admin") {
    return "admin";
  } else if (role === "moderator") {
    return "moderator";
  } else {
    return "user";
  }
};

export default UseAuth;
