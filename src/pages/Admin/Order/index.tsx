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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { getOrders, orderSelectors } from "../../../features/orders/orderSlice";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { useState } from "react";
import Pagination from "../../../components/Pagination";
interface Props {}

const Order: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(orderSelectors.selectAll);
  const { page, nextPage, prevPage, totalPages, limit } = useAppSelector(
    (state) => state.orders
  );
  const [data, setData] = useState([] as any[]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (orders.length > 0) {
      setData(orders);
    }
  }, [orders]);

  useEffect(() => {
    dispatch(getOrders(history.location.search.split("?")[1]));
  }, [history.location]);

  const renderColorScheme = (status: string) => {
    if (status === "PENDING") {
      return "gray";
    } else if (status === "SUCCESS") {
      return "green";
    } else {
      return "red";
    }
  };
  const changeURL = (name: string, value: string) => {
    const params = new URLSearchParams(history.location.search);

    if (params.has("page")) {
      params.delete("page");
    }
    if (params.has(name)) {
      params.delete(name);
    }

    if (value) {
      params.append(name, value);
    } else {
      params.delete(name);
    }

    history.push(`${history.location.pathname}?${params.toString()}`);
  };

  const onHandleChange = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLSelectElement;
    changeURL("status", value);
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
      <Pagination
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
      />

      <Table variant="simple" bg="#fff">
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
                <Td>{i + 1 + limit * (page - 1)}</Td>
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
