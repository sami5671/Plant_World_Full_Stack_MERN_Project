import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);

  if (user?.role === "admin" || user?.role === "moderator") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
