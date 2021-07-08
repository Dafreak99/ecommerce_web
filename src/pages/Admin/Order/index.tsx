import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Pagination from "../../../components/Pagination";
import { getOrders, orderSelectors } from "../../../features/orders/orderSlice";

interface Props {}

const Order: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(orderSelectors.selectAll);
  const { page, nextPage, prevPage, totalPages, limit, status } =
    useAppSelector((state) => state.orders);
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    if (orders.length > 0) {
      setData(orders);
    }
  }, [orders]);

  useEffect(() => {
    dispatch(getOrders(history.location.search.split("?")[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {status === "succeeded" ? (
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
                <Tr>
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
      ) : (
        <Flex h="500px" bg="#fff" justify="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default Order;
