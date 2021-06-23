import React from "react";
import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getProductsByCategory } from "../../features/products/productSlice";

interface Props {
  categoryId: string | undefined;
}

const RelatedProducts: React.FC<Props> = ({ categoryId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(getProductsByCategory(categoryId));
    }
  }, []);

  return <Grid gridTemplateColumns="repeat(12,1fr)"></Grid>;
};

export default RelatedProducts;
