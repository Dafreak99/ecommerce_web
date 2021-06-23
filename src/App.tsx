import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "./app/hooks";

import { getProducts } from "./features/products/productSlice";
import {
  categorySelectors,
  getCategories,
} from "./features/categories/categoriesSlice";

import {
  Home,
  Admin,
  Product,
  ProductDetail,
  Cart,
  Search,
  SignIn,
  Favorite,
} from "./pages";
import AdminRoute from "./helpers/AdminRoute";
import AdminSignIn from "./pages/Admin/SignIn";

function App() {
  const categories = useAppSelector(categorySelectors.selectAll);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/signin" exact>
          <SignIn />
        </Route>

        {categories.map((category) => (
          <Route path={`/${category.name.toLowerCase()}`}>
            <Product />
          </Route>
        ))}

        <Route path="/product/:id">
          <ProductDetail />
        </Route>

        <Route path="/search/:params">
          <Search />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/favorite">
          <Favorite />
        </Route>

        <Route path="/admin" exact>
          <AdminSignIn />
        </Route>

        <AdminRoute path="/admin" component={Admin} exact={false} />
      </Switch>
    </Router>
  );
}

export default App;
