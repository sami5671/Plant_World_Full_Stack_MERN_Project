import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../components/shared/error/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signUp/SignUp";
import AllProduct from "../pages/allProduct/AllProduct";
import DashboardLayout from "../layout/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import ManageProduct from "../pages/admin/ManageProduct/ManageProduct";
import ManageUsers from "../pages/admin/ManageUsers/ManageUsers";
import ManageOrder from "../pages/admin/ManageOrder/ManageOrder";
import ProductDetails from "../pages/productDetails/ProductDetails";
import UpdateProduct from "../pages/admin/UpdateProduct/UpdateProduct";
import UserCart from "../pages/user/UserCart/UserCart";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "../pages/user/UserDashboard/UserDashboard";
import ModeratorDashboard from "./../pages/moderator/ModeratorDashboard/ModeratorDashboard";
import PaymentPage from "../pages/payment/paymentPage";
import Profile from "../pages/profile/Profile";
import RecentOrder from "../pages/user/RecentOrder/RecentOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/allProduct",
        element: <AllProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "updateProduct/:id",
        element: <UpdateProduct />,
      },
      {
        path: "manage-order",
        element: <ManageOrder />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },

      // Moderator Route start
      {
        path: "moderator-dashboard",
        element: <ModeratorDashboard />,
      },
      // Moderator Route end

      // users routes start
      {
        path: "user-dashboard",
        element: <UserDashboard />,
      },
      {
        path: "cart",
        element: <UserCart />,
      },
      {
        path: "recent-order",
        element: <RecentOrder />,
      },

      // users routes end

      // PROFILE ROUTE
      {
        path: "my-profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
