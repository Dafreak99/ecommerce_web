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
} from "./pages";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

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
          {/* TODO: Continue search page */}
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
