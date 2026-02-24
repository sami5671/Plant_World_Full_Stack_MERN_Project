import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ allowedRoles = [], children }) => {
  const user = useSelector((state) => state?.auth?.user);

  if (!user) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(user.role)) {
    // User has one of the allowed roles
    return children;
  }

  // User logged in but not authorized
  return <Navigate to="/" replace />;
};

export default RoleRoute;
