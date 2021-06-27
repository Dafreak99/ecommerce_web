import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Stripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import AdminSignIn from "./pages/Admin/SignIn";
import AdminRoute from "./helpers/AdminRoute";
import {
  Home,
  Admin,
  Product,
  ProductDetail,
  Cart,
  Search,
  SignIn,
  Favorite,
  Checkout,
} from "./pages";

interface Props {
  stripe: Promise<Stripe | null>;
}

const App: React.FC<Props> = ({ stripe }) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/signin" exact>
          <SignIn />
        </Route>

        <Route path={["/tv", "/camera", "/phone", "/computer"]}>
          <Product />
        </Route>

        <Route path="/product/:id">
          <ProductDetail />
        </Route>

        <Route path="/search">
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

        <Route path="/checkout" exact>
          <Elements stripe={stripe}>
            <Checkout />
          </Elements>
        </Route>

        <Route exact component={() => <h3>hello</h3>} />
      </Switch>
    </Router>
  );
};

export default App;
