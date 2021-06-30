import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Badge,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Table, Thead, Tr, Th, Td } from "@chakra-ui/react";
import { useAppSelector } from "../../../app/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { orderSelectors } from "../../../features/orders/orderSlice";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
interface Props {}

const Order: React.FC<Props> = () => {
  const history = useHistory();

  const orders = useAppSelector(orderSelectors.selectAll);
  const [data, setData] = useState([] as any[]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      setData(orders);
    }
  }, [orders]);

  const renderColorScheme = (status: string) => {
    if (status === "PENDING") {
      return "gray";
    } else if (status === "SUCCESS") {
      return "green";
    } else {
      return "red";
    }
  };
  const onHandleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;

    if (!value) {
      setData(orders);
    } else {
      const matchedOrders = orders.filter(
        (order) => order.status === value.toUpperCase()
      );
      setData(matchedOrders);
    }
  };

  const normalize = (amount: number) => {
    return amount.toString().slice(0, amount.toString().length - 2);
  };

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Orders</Heading>
      </Flex>

      <Select
        placeholder="Filter by status"
        w="20rem"
        bg="#fff"
        mb="1rem"
        onChange={onHandleChange}
      >
        <option value="pending">Pending</option>
        <option value="success">Success</option>
      </Select>

      <Table variant="simple" bg="#fff" w="max-content">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>NAME</Th>
            <Th>AMOUNT</Th>
            <Th>STATUS</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <TransitionGroup component="tbody">
          {data.map(({ status, createdAt, total_amount, _id }, i) => (
            <CSSTransition key={_id} timeout={500} classNames="item">
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{format(new Date(createdAt), "hh:mm | dd-MM-yyyy")}</Td>
                <Td>${normalize(total_amount)}</Td>
                <Td>
                  {" "}
                  <Badge colorScheme={renderColorScheme(status)}>
                    {status}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    variant="ghost"
                    onClick={() => history.push(`./order/${_id}`)}
                  >
                    View Detail
                  </Button>
                </Td>
              </Tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Order;
