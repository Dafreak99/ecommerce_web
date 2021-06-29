import {
  Box,
  Flex,
  Heading,
  Spinner,
  Text,
  Image,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { BsCalendar } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getOrdersFromCustomerSide,
  orderSelectors,
} from "../../features/orders/orderSlice";

interface Props {}

interface Product {
  amount: number;
  current_price: number;
  images: string[];
  qty: number;
  title: string;
  _id: string;
}

const OrderBody: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(orderSelectors.selectAll);
  const orderStatus = useAppSelector((state) => state.orders.status);

  useEffect(() => {
    dispatch(getOrdersFromCustomerSide());
  }, []);

  console.log(orders);

  if (orderStatus === "loading") {
    return (
      <Flex
        minH="calc(100vh - 160px)"
        p="5rem 0"
        justify="center"
        alignItems="center"
        className="container"
      >
        <Spinner />
      </Flex>
    );
  }

  const normalize = (amount: number) => {
    return amount.toString().slice(0, amount.toString().length - 2);
  };

  return (
    <Box minH="calc(100vh - 160px)" p="5rem 0" bg="#f3f3f3">
      <Box className="container">
        <Heading mb="2rem" fontSize="lg">
          Your orders list
        </Heading>
        {orders.length > 0 ? (
          <>
            {orders.map((order, i) => (
              <Box p="3rem 2rem" bg="#fff" mb="1rem">
                <Flex justify="space-between" alignItems="center">
                  <Text color="gray.800" fontWeight="semibold">
                    Total: ${normalize(order.total_amount)}
                  </Text>
                  <Text>
                    <Icon as={BsCalendar} />{" "}
                    {format(new Date(order.createdAt), "dd/MM/yyyy")}{" "}
                  </Text>
                </Flex>

                <Text mb="2rem">
                  Status <Badge>Pending</Badge>
                </Text>

                {order.products.map((product: Product) => (
                  <Flex>
                    <Image src={product.images[0]} h="100px" w="100px" />
                    <Box ml="2rem">
                      <Text>{product.title}</Text>
                      <Text mt="10px">X {product.qty ? product.qty : 1}</Text>
                    </Box>
                    <Text ml="auto" color="gray.600" fontWeight="semibold">
                      ${product.amount}
                    </Text>
                  </Flex>
                ))}
              </Box>
            ))}
          </>
        ) : (
          <Text>Found no order</Text>
        )}
      </Box>
    </Box>
  );
};

export default OrderBody;
