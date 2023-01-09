import { configureStore } from "@reduxjs/toolkit";
import { myProductsApi } from "../services/myProductsApi";

export const store = configureStore({
  reducer: {
    [myProductsApi.reducerPath]: myProductsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myProductsApi.middleware),
});
