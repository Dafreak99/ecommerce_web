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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getOrdersFromCustomerSide,
  orderSelectors,
} from "../../features/orders/orderSlice";
import OrderListItem from "./OrderListItem";

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

  if (orderStatus === "loading") {
    return (
      <Flex
        minH="calc(100vh - 80px)"
        p="5rem 0"
        justify="center"
        alignItems="center"
        className="container"
      >
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <Heading mb="2rem" fontSize="lg">
        Your orders list
      </Heading>
      {orders.length > 0 ? (
        <>
          {orders.map((order, i) => (
            <OrderListItem order={order} />
          ))}
        </>
      ) : (
        <Text>Found no order</Text>
      )}
    </>
  );
};

export default OrderBody;
