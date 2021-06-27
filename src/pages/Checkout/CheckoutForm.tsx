import { Box, Button, Icon, Text } from "@chakra-ui/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaStripe } from "react-icons/fa";
import { useCart } from "../../contexts/cartContext";
import Axios from "../../helpers/axios";
import CardSection from "./CardSection";

interface Props {}

interface FormValues {
  name: string;
  email: string;
  phone: number;
  address: string;
  description: string;
}
const CheckoutForm: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { cart } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement) as StripeCardElement;

    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      stripeTokenHandler(
        result.token.id,
        data,
        result.token.card?.address_zip as string
      );
    }
  };

  const stripeTokenHandler = async (
    token: string,
    data: FormValues,
    postcode: string
  ) => {
    const body = {
      ...data,
      card_tok: token,
      postcode,
      products: cart.map((item) => {
        return {
          id: item._id,
          qty: item.cartQuantity,
        };
      }),
    };

    console.log(body);

    try {
      const res = await Axios.post(
        "/api/v2/public/order/checkout-stripe",
        body
      );
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Box gridColumn="span 4" borderLeft="2px solid #f3f3f3" p="5rem">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardSection register={register} errors={errors} />

        <Button type="submit" disabled={!stripe} mt="2rem">
          Confirm order
        </Button>
      </form>

      <Text mt="6rem">
        Empowered by <Icon as={FaStripe} boxSize="3rem" color="purple.500" />
      </Text>
    </Box>
  );
};

export default CheckoutForm;
