import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
