import React, { useRef, useState } from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Icon,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { AiFillEdit, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FaTrash } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
      <Flex mb="1rem">
        <InputGroup w="20rem" mr="1rem" bg="#fff">
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={AiOutlineSearch} color="gray.300" />}
          />
          <Input placeholder="Search by title" />
        </InputGroup>
        <Select placeholder="Select category" bg="#fff" w="20rem">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
        <Select placeholder="Select status" bg="#fff" w="20rem">
          <option value="option1">Selling</option>
          <option value="option2">Pending</option>
          <option value="option3">Sells</option>
        </Select>
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
        <TransitionGroup component="tbody">
          {products.map(
            ({ title, price, images, status, quantity, is_active, _id }, i) => (
              <CSSTransition key={_id} timeout={500} classNames="item">
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{title} </Td>
                  <Td>
                    <Image
                      src={images[0]}
                      w="50px"
                      h="50px"
                      objectFit="cover"
                    />
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
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Product;
