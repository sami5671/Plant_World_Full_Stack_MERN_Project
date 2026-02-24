import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/shared/error/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import Main from "../layout/Main";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import ManageOrder from "../pages/admin/ManageOrder/ManageOrder";
import ManageProduct from "../pages/admin/ManageProduct/ManageProduct";
import ManageUsers from "../pages/admin/ManageUsers/ManageUsers";
import UpdateProduct from "../pages/admin/UpdateProduct/UpdateProduct";
import AllProduct from "../pages/allProduct/AllProduct";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signUp/SignUp";
import Home from "../pages/home/Home";
import PaymentPage from "../pages/payment/paymentPage";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Profile from "../pages/profile/Profile";
import OrderDetails from "../pages/user/RecentOrder/OrderDetails";
import RecentOrder from "../pages/user/RecentOrder/RecentOrder";
import ShoppingActivity from "../pages/user/ShoppingAcitivity/ShoppingActivity";
import UserCart from "../pages/user/UserCart/UserCart";
import UserDashboard from "../pages/user/UserDashboard/UserDashboard";
import ModeratorDashboard from "./../pages/moderator/ModeratorDashboard/ModeratorDashboard";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

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
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <RoleRoute allowedRoles={["admin", "moderator"]}>
            <AddProduct />
          </RoleRoute>
        ),
      },
      {
        path: "manage-product",
        element: (
          <RoleRoute allowedRoles={["admin", "moderator"]}>
            <ManageProduct />
          </RoleRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <RoleRoute allowedRoles={["admin", "moderator"]}>
            <UpdateProduct />
          </RoleRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <RoleRoute allowedRoles={["admin", "moderator"]}>
            <ManageOrder />
          </RoleRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
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
      {
        path: "orderDetails/:id",
        element: <OrderDetails />,
      },
      {
        path: "shopping-activity",
        element: <ShoppingActivity />,
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
