import React from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Stack,
  Text,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import BackButton from "../../../components/BackButton";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getBuyerDetail } from "../../../features/buyers/buyersSlice";
import { format } from "date-fns";
interface Props {}

const PaymentDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const buyerDetail = useAppSelector((state) => state.buyers.buyerDetail);

  useEffect(() => {
    dispatch(getBuyerDetail(params.id));
  }, []);

  const renderColorScheme = (status: string) => {
    if (status === "PENDING") {
      return "gray";
    } else if (status === "SUCCESS") {
      return "green";
    } else {
      return "red";
    }
  };

  if (!buyerDetail) {
    return (
      <Box>
        <Flex justify="space-between" alignItems="center" mb="2rem">
          <BackButton heading="Payment Detail" />
        </Flex>
        <Flex
          p="4rem 3rem"
          bg="#fff"
          boxShadow="0 4px 10px rgba(0,0,0,.05)"
          borderRadius="5px"
          justify="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <>
        <Flex justify="space-between" alignItems="center" mb="2rem">
          <BackButton heading="Payment Detail" />
        </Flex>
        <Box
          p="4rem 3rem"
          bg="#fff"
          boxShadow="0 4px 10px rgba(0,0,0,.05)"
          borderRadius="5px"
        >
          <Stack>
            <Text fontWeight="bold">
              Name:{" "}
              <Box as="span" fontWeight="normal">
                {buyerDetail.name}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Phone:{" "}
              <Box as="span" fontWeight="normal">
                {buyerDetail.phone}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Email:{" "}
              <Box as="span" fontWeight="normal">
                {buyerDetail.email}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Address:{" "}
              <Box as="span" fontWeight="normal">
                {buyerDetail.address}
              </Box>
            </Text>
            <Text fontWeight="bold">
              Postcode:{" "}
              <Box as="span" fontWeight="normal">
                {buyerDetail.postcode}
              </Box>
            </Text>
          </Stack>

          <Heading fontSize="md" mt="3rem" mb="1rem">
            Order Items
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Description</Th>
                <Th isNumeric>Total</Th>
                <Th>Status</Th>
                <Th>Created At</Th>
              </Tr>
            </Thead>
            {/* <Tbody>
              {buyerDetail.orders.map(
                (
                  { total_amount, description, createdAt, status },
                  i: number
                ) => (
                  <Tr>
                    <Td>{i + 1}</Td>
                    <Td>{description}</Td>
                    <Td isNumeric>{total_amount}</Td>
                    <Td>
                      <Badge colorScheme={renderColorScheme(status)}>
                        {status.toString()}
                      </Badge>
                    </Td>
                    <Td>{format(new Date(createdAt), "hh:mm | dd-MM-yyyy")}</Td>
                  </Tr>
                )
              )}
            </Tbody> */}
          </Table>
        </Box>
      </>
    </Box>
  );
};

export default PaymentDetail;
