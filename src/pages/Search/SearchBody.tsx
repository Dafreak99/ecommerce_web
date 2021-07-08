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
    console.log(location.search);

    dispatch(getProducts({ condition: location.search.slice(1) }))
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
        minH="calc(100vh - 80px)"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <Box p="5rem 0" className="container" minH="calc(100vh - 80px)">
      <Text mb="2rem" fontSize="xl">
        Found {products.length} items
      </Text>
      <Grid gridTemplateColumns="repeat(12,1fr)" gridGap="4rem">
        {products.length > 0 ? (
          <>
            {products.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </>
        ) : (
          <Box gridColumn="span 3"> No item </Box>
        )}
      </Grid>
    </Box>
  );
};

export default SearchBody;
