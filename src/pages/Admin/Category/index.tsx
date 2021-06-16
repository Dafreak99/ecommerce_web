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
import { Table, Thead, Tbody, Tr, Th, Td, Image } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FaTrash } from "react-icons/fa";
import AddCategoryModal from "./AddCategoryModal";
import { deleteCategory } from "../../../features/categories/categoriesSlice";
interface Props {}

const Category: React.FC<Props> = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onHandleDelete = (id: string) => {
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
          // onClick={() => history.push("/admin/category-add")}
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
        <Tbody>
          {categories.map(({ name, createdAt, updatedAt, _id }, i) => (
            <Tr key={i}>
              <Td>{i + 1}</Td>
              <Td>{name} </Td>

              <Td>{createdAt}</Td>
              <Td>{updatedAt}</Td>
              <Td>
                <Icon as={AiFillEdit} cursor="pointer" />
              </Td>
              <Td>
                <Icon
                  as={FaTrash}
                  cursor="pointer"
                  onClick={() => onHandleDelete(_id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Category;
