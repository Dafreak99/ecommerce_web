import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterSlice from "../features/counter/counterSlice";
import productSlice from "../features/products/productSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import commentSlice from "../features/comments/commentSlice";
import orderSlice from "../features/orders/orderSlice";
import favoriteSlice from "../features/favorites/favoriteSlice";
import promotionSlice from "../features/promotions/promotionSlice";
import buyersSlice from "../features/buyers/buyersSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    products: productSlice,
    categories: categoriesSlice,
    comments: commentSlice,
    orders: orderSlice,
    favorite: favoriteSlice,
    promotions: promotionSlice,
    buyers: buyersSlice,
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
