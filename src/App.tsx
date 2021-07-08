import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminRoute from "./helpers/AdminRoute";
import PrivateRoute from "./helpers/PrivateRoute";
import {
  Admin,
  Cart,
  Checkout,
  Favorite,
  Home,
  Login,
  Order,
  Product,
  ProductDetail,
  Search,
  SignUp,
} from "./pages";
import AdminLogin from "./pages/Admin/Login";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/cat/:slug" component={Product} />
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
