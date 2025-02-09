import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productSliceReducer from "../features/products/productsSlice";
import manageProductSliceReducer from "../features/adminControl/manageProductControlSlice";
import manageUserSliceReducer from "../features/adminControl/manageUsersControlSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    products: productSliceReducer,
    manageProducts: manageProductSliceReducer,
    manageUsers: manageUserSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
