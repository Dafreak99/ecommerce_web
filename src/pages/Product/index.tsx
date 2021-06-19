import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getProductsByCategory,
  productSelectors,
} from "../../features/products/productSlice";
import ProductComponent from "../../components/Product";

interface Props {}

const Product: React.FC<Props> = () => {
  const history = useHistory();

  const dispatch = useAppDispatch();

  const products = useAppSelector(productSelectors.selectAll);

  useEffect(() => {
    if (history.location.state) {
      dispatch(getProductsByCategory(history.location.state as string));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Box className="container" minH="calc(100vh - 160px)" p="5rem 0">
        <Text fontSize="large" mb="2rem" fontWeight="400">
          {products.length > 0
            ? `Found ${products.length} items`
            : "Found 0 item"}
        </Text>
        <Grid
          gridTemplateColumns="repeat(12,1fr)"
          gridGap={{ base: 0, md: "2rem", xl: "4rem" }}
        >
          {products.map((product) => (
            <ProductComponent product={product} />
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Product;
