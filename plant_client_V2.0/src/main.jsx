import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
