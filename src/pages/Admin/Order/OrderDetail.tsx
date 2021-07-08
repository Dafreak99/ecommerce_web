import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { BsCheck } from "react-icons/bs";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import BackButton from "../../../components/BackButton";
import {
  checkOrderStatus,
  orderSelectors,
} from "../../../features/orders/orderSlice";
import { CheckoutedProduct } from "../../../types";

interface Props {}

const OrderDetail: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const toast = useToast();

  const order = useAppSelector((state) =>
    orderSelectors.selectById(state, params.id)
  );

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
          <BackButton heading="Order Detail" />
        </Flex>
        <Flex
          p="4rem 3rem"
          bg="#fff"
          boxShadow="0 4px 10px rgba(0,0,0,.05)"
          borderRadius="5px"
          justify="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      </Box>
    );
  }

  const normalize = (amount: number) => {
    return amount.toString().slice(0, amount.toString().length - 2);
  };

  const onApproveOrder = () => {
    dispatch(checkOrderStatus(params.id))
      .then(unwrapResult)
      .then((data) =>
        setTimeout(() => {
          toast({
            position: "top",
            duration: 3000,
            description: data.message,
            status: "success",
          });
          history.goBack();
        }, 1000)
      );
  };

  return (
    <Box>
      <>
        <Flex justify="space-between" alignItems="center" mb="2rem">
          <BackButton heading="Order Detail" />
          <Button
            bg="primary"
            color="#fff"
            leftIcon={<BsCheck />}
            onClick={onApproveOrder}
          >
            Approve
          </Button>
        </Flex>
        <Box
          p="4rem 3rem"
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
                  ${normalize(order.total_amount)}
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
                  { title, amount, qty, images }: CheckoutedProduct,
                  i: number
                ) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{title}</Td>
                    <Td>
                      <Image src={images[0]} h="100px" />
                    </Td>

                    <Td isNumeric>{qty}</Td>
                    <Td isNumeric>${amount}</Td>
                    <Td isNumeric>${qty * amount}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </Box>
      </>
    </Box>
  );
};

export default OrderDetail;
