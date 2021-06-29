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
  Order,
} from "./pages";
import PrivateRoute from "./helpers/PrivateRoute";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route
          path={["/tv", "/camera", "/phone", "/computer"]}
          component={Product}
        />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/search" component={Search} />
        <Route path="/cart" component={Cart} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/admin" exact component={AdminSignIn} />
        <PrivateRoute path="/order" component={Order} exact={false} />
        <PrivateRoute path="/checkout" component={Checkout} exact={true} />
        <AdminRoute path="/admin" component={Admin} exact={false} />
      </Switch>
    </Router>
  );
};

export default App;
