import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import productSliceReducer from "../features/products/productsSlice";
import manageProductSliceReducer from "../features/adminControl/manageProductControlSlice";
import manageUserSliceReducer from "../features/adminControl/manageUsersControlSlice";
import manageOrderSliceReducer from "../features/adminControl/manageOrderSlice";
import cartSliceReducer from "../features/users/cartSlice";
import orderSliceReducer from "../features/users/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productSliceReducer,
    cart: cartSliceReducer,
    manageProducts: manageProductSliceReducer,
    manageUsers: manageUserSliceReducer,
    manageOrders: manageOrderSliceReducer,
    userOrders: orderSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
