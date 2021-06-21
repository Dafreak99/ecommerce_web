import React from "react";
import { Box, Flex, Button, Heading, Badge } from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { orderSelectors } from "../../../features/orders/orderSlice";
import { useHistory } from "react-router-dom";
interface Props {}

const Order: React.FC<Props> = () => {
  const history = useHistory();

  const orders = useAppSelector(orderSelectors.selectAll);

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
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Orders</Heading>
      </Flex>
      <Table variant="simple" bg="#fff">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>NAME</Th>
            <Th>CREATED DATE</Th>
            <Th>AMOUNT</Th>
            <Th>STATUS</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <TransitionGroup component="tbody">
          {orders.map(
            (
              {
                status,
                createdAt,
                total_amount,
                user: { first_name, last_name },
                _id,
              },
              i
            ) => (
              <CSSTransition key={_id} timeout={500} classNames="item">
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{first_name + " " + last_name}</Td>
                  <Td>{createdAt}</Td>
                  <Td>${total_amount}</Td>
                  <Td>
                    {" "}
                    <Badge colorScheme={renderColorScheme(status)}>
                      {status}
                    </Badge>
                  </Td>
                  <Td>
                    <Button onClick={() => history.push(`./order/${_id}`)}>
                      View Detail
                    </Button>
                  </Td>
                </Tr>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Order;
