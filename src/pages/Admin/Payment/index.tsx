import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "../../../app/hooks";

interface Props {}

const Payment: React.FC<Props> = () => {
  const history = useHistory();
  const buyers = useAppSelector((state) => state.buyers.allBuyers);

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Payments</Heading>
      </Flex>

      <Table variant="simple" bg="#fff" w="max-content">
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
          {buyers.map(({ address, email, name, phone, postcode, _id }, i) => (
            <CSSTransition key={_id} timeout={500} classNames="item">
              <Tr key={i}>
                <Td>{i + 1}</Td>
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
          ))}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Payment;
