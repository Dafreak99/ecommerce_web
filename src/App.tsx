import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Product from "./pages/Product";
import { useAppDispatch } from "./app/hooks";
import {
  fetchComments,
  commentSelectors,
} from "./features/comments/commentSlice";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import { getProducts } from "./features/products/productSlice";

function App() {
  // const dispatch = useAppDispatch();
  // const total = useSelector(commentSelectors.selectTotal);
  // const allComments = useSelector(commentSelectors.selectAll);
  // const lastComment = useSelector((state: RootState) =>
  //   commentSelectors.selectById(state, 10)
  // );

  // useEffect(() => {
  //   dispatch(fetchComments());
  // }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
