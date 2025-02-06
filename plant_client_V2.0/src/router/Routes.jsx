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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
    ],
  },
]);

export default router;
