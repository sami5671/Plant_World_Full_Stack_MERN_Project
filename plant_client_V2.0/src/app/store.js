import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productSliceReducer from "../features/products/productsSlice";
import manageProductSliceReducer from "../features/adminControl/manageProductControlSlice";
import manageUserSliceReducer from "../features/adminControl/manageUsersControlSlice";
import cartSliceReducer from "../features/users/cartSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    products: productSliceReducer,
    cart: cartSliceReducer,
    manageProducts: manageProductSliceReducer,
    manageUsers: manageUserSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
