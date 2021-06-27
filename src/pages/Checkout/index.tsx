import { Grid } from "@chakra-ui/react";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import Items from "./Items";

interface Props {}

const Checkout: React.FC<Props> = () => {
  return (
    <Grid h="100vh" w="100vw" gridTemplateColumns="repeat(12,1fr)">
      <Items />
      <CheckoutForm />
    </Grid>
  );
};

export default Checkout;
