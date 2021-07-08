import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Pagination from "../../../components/Pagination";
import { getBuyers } from "../../../features/buyers/buyersSlice";

interface Props {}

const Payment: React.FC<Props> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBuyers(history.location.search.split("?")[1]));
  }, [history.location]);

  const { allBuyers, page, nextPage, prevPage, totalPages, limit, status } =
    useAppSelector((state) => state.buyers);

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Payments</Heading>
      </Flex>

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
              <Th>ADDRESS</Th>
              <Th>PHONE</Th>
              <Th>POSTCODE</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <TransitionGroup component="tbody">
            {allBuyers.map(
              ({ address, email, name, phone, postcode, _id }, i) => (
                <CSSTransition key={_id} timeout={500} classNames="item">
                  <Tr key={i}>
                    <Td>{i + 1 + limit * (page - 1)}</Td>
                    <Td>{name}</Td>
                    <Td>{address}</Td>
                    <Td>{phone}</Td>
                    <Td>{postcode}</Td>
                    <Td>
                      <Button
                        variant="ghost"
                        onClick={() => history.push(`./payment/${_id}`)}
                      >
                        View Detail
                      </Button>
                    </Td>
                  </Tr>
                </CSSTransition>
              )
            )}
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

export default Payment;
