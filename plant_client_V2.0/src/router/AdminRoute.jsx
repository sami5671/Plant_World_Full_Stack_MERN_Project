import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);

  if (user?.role === "admin") {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
