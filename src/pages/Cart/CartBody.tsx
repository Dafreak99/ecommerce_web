import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import empty from "../../images/empty.svg";

interface Props {}

const CartBody: React.FC<Props> = () => {
  const history = useHistory();

  const { cart, updateQuantity, getTotalPrice } = useCart();

  const onChangeQuantity = (
    valueAsString: string,
    valueAsNumber: number,
    id: string
  ) => {
    if (!isNaN(valueAsNumber)) {
      updateQuantity(id, valueAsNumber);
    } else {
      updateQuantity(id, 0);
    }
  };

  return (
    <Box minH="calc(100vh - 160px)">
      <Box bg="gray.100">
        <Breadcrumb p="1rem 0" className="container">
          <BreadcrumbItem onClick={() => history.push("/")}>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Cart</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box p="5rem 0" className="container">
        {cart.length === 0 ? (
          <Flex justify="center" alignItems="center" flexDirection="column">
            <Image src={empty} h="20rem" />
            <Heading mt="2rem" fontSize="xl">
              Your cart is currently empty
            </Heading>
            <Text mt="10px">
              Look like you haven't added any items to your cart yet
            </Text>
            <Button
              bg="primary"
              color="#fff"
              mt="2rem"
              size="lg"
              onClick={() => history.push("/product")}
            >
              Go to Product
            </Button>
          </Flex>
        ) : (
          <Box>
            <Heading fontSize="lg" color="gray.600">
              Your items
            </Heading>
            <Box>
              <Table variant="simple" mt="4rem">
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>Name</Th>
                    <Th>Image</Th>
                    <Th>Quantity</Th>
                    <Th isNumeric>Price</Th>
                    <Th isNumeric>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map(
                    (
                      { title, price, cartQuantity, quantity, images, _id },
                      i
                    ) => (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{title}</Td>
                        <Td>
                          <Image src={images[0]} h="100px" />
                        </Td>

                        <Td isNumeric>
                          <NumberInput
                            size="md"
                            maxW={24}
                            defaultValue={cartQuantity}
                            max={quantity}
                            min={0}
                            onChange={(str, num) =>
                              onChangeQuantity(str, num, _id)
                            }
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td isNumeric>${price}</Td>
                        <Td isNumeric>${price * cartQuantity}</Td>
                      </Tr>
                    )
                  )}
                </Tbody>
                <Tfoot>
                  <Tr>
                    <Td>Total Price</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td isNumeric fontWeight="bold">
                      ${getTotalPrice()}
                    </Td>
                  </Tr>
                </Tfoot>
              </Table>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartBody;
