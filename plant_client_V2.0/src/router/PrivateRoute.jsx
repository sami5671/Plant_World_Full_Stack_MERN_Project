import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoggedIn } from "../features/auth/authSlice";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const user = JSON.parse(authData);
      dispatch(userLoggedIn(user));
      setIsAuthenticated(true);
    }
    setIsAuthChecked(true);
  }, [dispatch]);

  if (!isAuthChecked) {
    return null; // You can add a loader here if you want
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
