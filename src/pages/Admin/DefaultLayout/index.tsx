import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// routes config
import routes from "../routes";

import { useEffect } from "react";
import { getProducts } from "../../../features/products/productSlice";
import { useAppDispatch } from "../../../app/hooks";
import { getCategories } from "../../../features/categories/categoriesSlice";

interface Props {}

const AdminLayout: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  return (
    <Flex>
      <Sidebar />
      <RightContent />
    </Flex>
  );
};

const RightContent = () => {
  // Path will be '/admin'
  let { path } = useRouteMatch();

  return (
    <Box
      w="85vw"
      minH="100vh"
      maxH="100vh"
      overflowX="scroll"
      background="#f3f3f3"
      p="5rem 4rem"
    >
      <Switch>
        {routes.map((route, i) => {
          return (
            route.component && (
              <Route
                key={i}
                path={path + route.path}
                exact={route.exact}
                render={(props) => (
                  <>
                    <route.component {...props} />
                  </>
                )}
              />
            )
          );
        })}
      </Switch>
    </Box>
  );
};

export default AdminLayout;
