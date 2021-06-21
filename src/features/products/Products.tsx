import { Box, Heading, Grid } from "@chakra-ui/react";
import React from "react";

import { useAppSelector } from "../../app/hooks";
import { productSelectors } from "./productSlice";
import Product from "../../components/Product";

interface Props {}

const ProductPage: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);

  return (
    <Box p="5rem 0">
      <Heading fontSize="lg" color="blackAlpha.800" mb="2rem">
        PRODUCTS
      </Heading>

      <Grid
        gridTemplateColumns="repeat(12, 1fr)"
        gridGap={{ base: 0, md: "2rem", xl: "4rem" }}
      >
        {products.map((product, i) => (
          <Product key={i} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductPage;
