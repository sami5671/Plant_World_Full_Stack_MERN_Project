import { useSelector } from "react-redux";

const UseModerator = () => {
  const user = useSelector((state) => state?.auth?.user);

  if (user?.role === "moderator") {
    return true;
  } else {
    return false;
  }
};

export default UseModerator;
