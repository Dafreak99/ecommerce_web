import React from "react";
import {
  Box,
  Flex,
  Button,
  Heading,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { Table, Thead, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FaTrash } from "react-icons/fa";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import AddCategoryModal from "./AddCategoryModal";
import {
  categorySelectors,
  deleteCategory,
} from "../../../features/categories/categoriesSlice";
import EditCategoryModal from "./EditCategoryModal";
interface Props {}

const Category: React.FC<Props> = () => {
  const categories = useAppSelector(categorySelectors.selectAll);

  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleDelete = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    dispatch(deleteCategory(id));
  };

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="2rem">
        <Heading color="gray.600">Categories</Heading>
        <Button
          textTransform="uppercase"
          bg="primary"
          color="#fff"
          onClick={onOpen}
        >
          <Icon as={AiOutlinePlus} mr="0.5rem" /> Add Category
          <AddCategoryModal isOpen={isOpen} onClose={onClose} />
        </Button>
      </Flex>
      <Table variant="simple" bg="#fff">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>NAME</Th>
            <Th>CREATED DATE</Th>
            <Th>UPDATED DATE</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <TransitionGroup component="tbody">
          {categories.map(({ name, createdAt, updatedAt, _id }, i) => (
            <CSSTransition key={_id} timeout={500} classNames="item">
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{name} </Td>

                <Td>{createdAt}</Td>

                <Td>{updatedAt}</Td>
                <Td>
                  <EditCategoryModal id={_id} />
                </Td>

                <Td>
                  <Icon
                    as={FaTrash}
                    cursor="pointer"
                    onClick={(e) => onHandleDelete(e, _id)}
                  />
                </Td>
              </Tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Table>
    </Box>
  );
};

export default Category;
