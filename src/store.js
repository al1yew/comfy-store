import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
  },
});
