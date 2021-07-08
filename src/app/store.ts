import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import buyersSlice from "../features/buyers/buyersSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import commentSlice from "../features/comments/commentSlice";
import favoriteSlice from "../features/favorites/favoriteSlice";
import orderSlice from "../features/orders/orderSlice";
import overviewSlice from "../features/overview/overviewSlice";
import productSlice from "../features/products/productSlice";
import profileSlice from "../features/profile/profileSlice";
import promotionSlice from "../features/promotions/promotionSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    categories: categoriesSlice,
    comments: commentSlice,
    orders: orderSlice,
    favorite: favoriteSlice,
    promotions: promotionSlice,
    buyers: buyersSlice,
    profile: profileSlice,
    overview: overviewSlice,
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
