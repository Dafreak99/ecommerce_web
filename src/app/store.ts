import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import productSlice from "../features/products/productSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import commentSlice from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    products: productSlice,
    categories: categoriesSlice,
    comments: commentSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
