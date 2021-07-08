/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getOrdersFromCustomerSide,
  orderSelectors,
} from "../../features/orders/orderSlice";
import OrderListItem from "./OrderListItem";

interface Props {}

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
            <OrderListItem key={i} order={order} />
          ))}
        </>
      ) : (
        <Text>Found no order</Text>
      )}
    </>
  );
};

export default OrderBody;
