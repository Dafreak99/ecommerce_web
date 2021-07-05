import { Badge, Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { BsCalendar } from "react-icons/bs";
import { CheckoutedProduct, Order } from "../../types";

interface Props {
  order: Order;
}

const OrderListItem: React.FC<Props> = ({ order }) => {
  const normalize = (amount: number) => {
    return amount.toString().slice(0, amount.toString().length - 2);
  };

  const renderColorScheme = (status: string) => {
    if (status === "PENDING") {
      return "gray";
    } else if (status === "SUCCESS") {
      return "green";
    } else {
      return "red";
    }
  };

  return (
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
        Status{" "}
        <Badge colorScheme={renderColorScheme(order.status)}>
          {order.status}
        </Badge>
      </Text>

      {order.products.map((product: any) => (
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
  );
};

export default OrderListItem;
