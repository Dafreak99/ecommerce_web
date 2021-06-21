import React from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Badge,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Image,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";

import { orderSelectors } from "../../../features/orders/orderSlice";
import { useHistory, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import { Product } from "../../../types";
interface Props {}

const OrderDetail: React.FC<Props> = () => {
  const history = useHistory();

  const params = useParams<{ id: string }>();

  const order = useAppSelector((state: RootState) =>
    orderSelectors.selectById(state, params.id)
  );

  console.log(order);

  const renderColorScheme = (status: string) => {
    if (status === "PENDING") {
      return "gray";
    } else if (status === "SUCCESS") {
      return "green";
    } else {
      return "red";
    }
  };

  if (!order) {
    return (
      <Box>
        <Flex justify="space-between" alignItems="center" mb="2rem">
          <Heading color="gray.600">Order Detail</Heading>
        </Flex>
        <Box
          p="2rem 3rem"
          bg="#fff"
          boxShadow="0 4px 10px rgba(0,0,0,.05)"
          borderRadius="5px"
        >
          Loading...
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Order Detail</Heading>
      </Flex>
      <Box
        p="2rem 3rem"
        bg="#fff"
        boxShadow="0 4px 10px rgba(0,0,0,.05)"
        borderRadius="5px"
      >
        <Grid gridTemplateColumns="repeat(2,1fr)">
          <Stack>
            <Text fontWeight="bold">
              Name:{" "}
              <Box as="span" fontWeight="normal">
                {order.buyer.name}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Phone:{" "}
              <Box as="span" fontWeight="normal">
                {order.buyer.phone}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Email:{" "}
              <Box as="span" fontWeight="normal">
                {order.buyer.email}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Address:{" "}
              <Box as="span" fontWeight="normal">
                {order.buyer.address}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Postcode:{" "}
              <Box as="span" fontWeight="normal">
                {order.buyer.postcode}
              </Box>
            </Text>
          </Stack>
          <Stack>
            <Text fontWeight="bold">
              Order date:{" "}
              <Box as="span" fontWeight="normal">
                {order.createdAt}
              </Box>
            </Text>

            <Text fontWeight="bold">
              Description:{" "}
              <Box as="span" fontWeight="normal">
                {order.description}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Total Amount:{" "}
              <Box as="span" fontWeight="normal">
                ${order.total_amount}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Order Status:{" "}
              <Badge colorScheme={renderColorScheme(order.status)}>
                {order.status}
              </Badge>
            </Text>
          </Stack>
        </Grid>

        <Heading fontSize="md" mt="3rem" mb="1rem">
          Order Items
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {order.products.map(
              (
                { title, price, quantity_order, images }: Product,
                i: number
              ) => (
                <Tr>
                  <Td>{i + 1}</Td>
                  <Td>{title}</Td>
                  <Td>
                    <Image src={images[0]} h="100px" />
                  </Td>

                  <Td isNumeric>{quantity_order}</Td>
                  <Td isNumeric>${price}</Td>
                  <Td isNumeric>${price * quantity_order}</Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default OrderDetail;
