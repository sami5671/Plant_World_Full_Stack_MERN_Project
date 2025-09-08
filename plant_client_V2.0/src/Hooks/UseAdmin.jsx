import { useSelector } from "react-redux";

const UseAdmin = () => {
  const user = useSelector((state) => state?.auth?.user);

  if (user?.role === "admin") {
    return true;
  } else {
    return false;
  }
};

export default UseAdmin;
