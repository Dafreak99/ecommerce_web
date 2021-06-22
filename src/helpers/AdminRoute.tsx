import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const AdminRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isAdminLoggedIn } = useAuth();

  return isAdminLoggedIn() ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/admin" />
  );
};
export default AdminRoute;
