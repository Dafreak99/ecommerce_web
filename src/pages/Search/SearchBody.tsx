import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Product from "../../components/Product";
import {
  getProducts,
  productSelectors,
} from "../../features/products/productSlice";

interface Props {}

const SearchBody: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);

  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts(location.search))
      .then(unwrapResult)
      .then((data) => setIsLoading(false));
  }, [location]);

  if (isLoading) {
    return (
      <Flex
        justify="center"
        alignItems="center"
        p="5rem 0"
        className="container"
        h="calc(100vh - 160px)"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box p="5rem 0" className="container" h="calc(100vh - 160px)">
      <Text mb="2rem" fontSize="xl">
        Found {products.length} items
      </Text>
      <Grid gridTemplateColumns="repeat(12,1fr)" gridGap="4rem">
        {products.length > 0 ? (
          <>
            {products.map((product) => (
              <Product product={product} />
            ))}
          </>
        ) : (
          <Box> No items </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SearchBody;
