import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { CardElement } from "@stripe/react-stripe-js";
import React from "react";
import "./style.css";

interface Props {
  register: any;
  errors: any;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CardSection: React.FC<Props> = ({ register }) => (
  <>
    <FormControl>
      <FormLabel>Name</FormLabel>
      <Input type="text" {...register("name", { required: true })} />
    </FormControl>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type="email" {...register("email", { required: true })} />
    </FormControl>
    <FormControl>
      <FormLabel>Phone</FormLabel>
      <Input type="number" {...register("phone", { required: true })} />
    </FormControl>
    <FormControl>
      <FormLabel>Address</FormLabel>
      <Input type="text" {...register("address", { required: true })} />
    </FormControl>
    <FormControl>
      <FormLabel>Description</FormLabel>
      <Input type="text" {...register("description")} />
    </FormControl>
    <FormControl>
      <FormLabel>Card Details</FormLabel>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </FormControl>
  </>
);

export default CardSection;
