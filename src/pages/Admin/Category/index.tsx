import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  categorySelectors,
  deleteCategory,
  getCategories,
} from "../../../features/categories/categoriesSlice";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

interface Props {}

const Category: React.FC<Props> = () => {
  const categories = useAppSelector(categorySelectors.selectAll);

  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") dispatch(getCategories());
  });

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
