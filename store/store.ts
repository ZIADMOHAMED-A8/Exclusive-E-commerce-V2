import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/slices/counterSlice";
import cartReducer from "@/store/slices/cartSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart:cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

