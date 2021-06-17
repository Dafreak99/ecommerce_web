import React, { useRef, useState } from "react";
import { Box, Flex, Button, Heading, Icon, Badge } from "@chakra-ui/react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  deleteProduct,
  productSelectors,
} from "../../../features/products/productSlice";
interface Props {}

const Product: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onHandleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  console.log(products[0]);

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Products</Heading>
        <Button
          textTransform="uppercase"
          bg="primary"
          color="#fff"
          onClick={() => history.push("/admin/add-product")}
        >
          <Icon as={AiOutlinePlus} mr="0.5rem" /> Add product
        </Button>
      </Flex>
      <Table variant="simple" bg="#fff">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>NAME</Th>
            <Th>IMAGE</Th>
            <Th isNumeric>PRICE</Th>
            <Th isNumeric>QUANTITY</Th>
            <Th>STATUS</Th>
            <Th>ACTIVE</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(
            ({ title, price, images, status, quantity, is_active, _id }, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{title} </Td>
                <Td>
                  <Image src={images[0]} w="50px" h="50px" objectFit="cover" />
                </Td>
                <Td isNumeric>${price}</Td>
                <Td isNumeric>{quantity}</Td>
                <Td>
                  <Badge colorScheme="green">{status}</Badge>{" "}
                </Td>
                <Td>
                  <Badge colorScheme="purple">{is_active.toString()}</Badge>{" "}
                </Td>
                <Td>
                  <Icon
                    as={AiFillEdit}
                    cursor="pointer"
                    onClick={() => history.push(`/admin/edit-product/${_id}`)}
                  />
                </Td>
                <Td>
                  <Icon
                    as={FaTrash}
                    cursor="pointer"
                    onClick={() => onHandleDelete(_id)}
                  />
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Product;
