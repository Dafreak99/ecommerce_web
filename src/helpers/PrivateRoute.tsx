import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/signin" />
  );
};
export default PrivateRoute;
