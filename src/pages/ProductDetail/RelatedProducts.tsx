import React from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { Product as ProductType } from "../../types";
import Axios from "../../helpers/axios";
import Product from "../../components/Product";

interface Props {
  categoryId: string | undefined;
}

const RelatedProducts: React.FC<Props> = ({ categoryId }) => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    if (categoryId) fetchData();
  }, [categoryId]);

  const fetchData = async () => {
    const { data } = await Axios(
      `/api/v1/products/list?category=${categoryId}`
    );

    setProducts(data.docs);
  };

  return (
    <Box className="container" p="5rem 0">
      <Heading mb="4rem" fontSize="large">
        Related Products
      </Heading>
      <Grid gridTemplateColumns="repeat(12,1fr)">
        {products.length > 0 &&
          products.map((product, i) => <Product key={i} product={product} />)}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
