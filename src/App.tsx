import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AdminLogin from "./pages/Admin/Login";
import AdminRoute from "./helpers/AdminRoute";

import {
  Home,
  Admin,
  Product,
  ProductDetail,
  Cart,
  Search,
  Login,
  Favorite,
  Checkout,
  Order,
  Register,
} from "./pages";
import PrivateRoute from "./helpers/PrivateRoute";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route
          path={["/tv", "/camera", "/phone", "/computer"]}
          component={Product}
        />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/search" component={Search} />
        <Route path="/cart" component={Cart} />
        <Route path="/favorite" component={Favorite} />
        <Route path="/admin" exact component={AdminLogin} />
        <PrivateRoute path="/order" component={Order} exact={true} />
        <PrivateRoute path="/checkout" component={Checkout} exact={true} />
        <AdminRoute path="/admin" component={Admin} exact={false} />
      </Switch>
    </Router>
  );
};

export default App;
