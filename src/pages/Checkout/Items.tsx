import {
  Box,
  Button,
  Heading,
  Icon,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";

interface Props {}

const Items: React.FC<Props> = () => {
  const { cart } = useCart();
  const history = useHistory();

  return (
    <Box
      gridColumn="span 8"
      bg="#fff"
      p="5rem"
      overflowY="scroll"
      className="checkout__items"
    >
      <Button
        mb="2rem"
        variant="unstyled"
        outline="none"
        onClick={() => history.push("/")}
      >
        <Icon as={BsArrowLeft} boxSize="2rem" mr="1rem" /> Return to Shopping
      </Button>

      <Heading mb="4rem">Your items</Heading>

      <Table variant="simple" mt="4rem">
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Quantity</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>Total</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map(
            ({ title, price, cartQuantity, quantity, images, _id }, i) => (
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{title}</Td>
                <Td>
                  <Image src={images[0]} h="100px" />
                </Td>
                <Td isNumeric>12</Td>
                <Td isNumeric>${price}</Td>
                <Td isNumeric>${price * cartQuantity}</Td>
                <Td></Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Items;
