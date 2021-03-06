/* eslint-disable react-hooks/exhaustive-deps */
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
  Table,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillEdit, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Pagination from "../../../components/Pagination";
import {
  categorySelectors,
  getCategories,
} from "../../../features/categories/categoriesSlice";
import {
  deleteProduct,
  getProducts,
  productSelectors,
} from "../../../features/products/productSlice";

interface Props {}

interface FormValues {
  search: string;
}

const Product: React.FC<Props> = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const products = useAppSelector(productSelectors.selectAll);
  const categories = useAppSelector(categorySelectors.selectAll);

  const { page, prevPage, nextPage, totalPages, status, limit } =
    useAppSelector((state) => state.products);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    dispatch(
      getProducts({ condition: location.search.split("?")[1], limit: 4 })
    );
  }, [location]);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    changeURL(e.target.name, e.target.value);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    changeURL("search", data.search);
  };

  const changeURL = (name: string, value: string) => {
    const params = new URLSearchParams(location.search);

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

    history.push(`${location.pathname}?${params.toString()}`);
  };

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
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup w="20rem" mr="1rem" bg="#fff">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={AiOutlineSearch} color="gray.300" />}
            />
            <Input placeholder="Search by title" {...register("search")} />
          </InputGroup>
        </Box>
        <Select
          placeholder="Select category"
          bg="#fff"
          w="20rem"
          onChange={onChange}
          name="category"
        >
          {categories.map((category, i) => (
            <option value={category._id} key={i}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          onChange={onChange}
          placeholder="Select status"
          bg="#fff"
          w="20rem"
        >
          <option value="selling">Selling</option>
          <option value="pending">Pending</option>
          <option value="sales">Sales</option>
          <option value="empty">Empty</option>
        </Select>
      </Flex>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        page={page}
        totalPages={totalPages}
      />
      {status === "succeeded" ? (
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
              <Th>PROMOTION</Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <TransitionGroup component="tbody">
            {products.map(
              (
                {
                  title,
                  price,
                  images,
                  status,
                  quantity,
                  is_active,
                  promotion,
                  _id,
                },
                i
              ) => (
                <CSSTransition key={_id} timeout={500} classNames="item">
                  <Tr key={i}>
                    <Td>{i + 1 + limit * (page - 1)}</Td>
                    <Td>{title}</Td>
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
                    <Td>{promotion ? promotion.value + "%" : "No"}</Td>
                    <Td>
                      <Icon
                        as={AiFillEdit}
                        cursor="pointer"
                        onClick={() =>
                          history.push(`/admin/edit-product/${_id}`)
                        }
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
      ) : (
        <Flex h="400px" bg="#fff" justify="center" alignItems="center">
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default Product;
