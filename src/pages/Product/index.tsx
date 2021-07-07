import {
  Box,
  Grid,
  Text,
  Spinner,
  Flex,
  Select,
  Icon,
  Stack,
  Checkbox,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getProductsByCategory,
  productSelectors,
} from "../../features/products/productSlice";
import ProductComponent from "../../components/Product";
import { categorySelectors } from "../../features/categories/categoriesSlice";
import Pagination from "./Pagination";
import { AiTwotoneFilter } from "react-icons/ai";

interface Props {}

const Product: React.FC<Props> = () => {
  const params = useParams<{ slug: string }>();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const products = useAppSelector(productSelectors.selectAll);

  const { status, totalDocs, page, totalPages, nextPage, prevPage } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(
      getProductsByCategory({
        categoryId: params.slug.split("-")[1],
        condition: location.search.slice(1), // avoid "?" at the beginning
      })
    );
  }, [location]);

  const onFilter = (value: string) => {
    setValue(value);
    const { pathname, search } = location;

    const params = new URLSearchParams(search);

    if (params.has("price[gte]") && params.has("price[lte]")) {
      params.delete("price[gte]");
      params.delete("price[lte]");
    } else {
      params.delete("page");
    }

    history.push(
      decodeURI(
        `${
          pathname +
          "?" +
          params.toString() +
          (params.toString() && "&") +
          value
        }`
      )
    );
  };

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <Box
          className="container"
          minH="calc(100vh - 160px)"
          p="5rem 0"
          textAlign="center"
        >
          <Spinner />
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box className="container" minH="calc(100vh - 160px)" p="5rem 0">
        <Flex justify="space-between" alignItems="center" mb="2rem">
          <Text fontSize="large" fontWeight="400">
            {totalDocs > 0 ? `Found ${totalDocs} items` : "Found 0 item"}
          </Text>
          <Pagination
            page={page}
            nextPage={nextPage}
            prevPage={prevPage}
            totalPages={totalPages}
          />
        </Flex>
        <Flex mb="2rem">
          <Flex alignItems="center" mr="1rem">
            <Icon as={AiTwotoneFilter} color="gray.600" mr="10px" />
            <Text>Filter by price:</Text>
          </Flex>
          <RadioGroup onChange={onFilter} value={value}>
            <Stack spacing={10} direction="row">
              <Radio value="">None</Radio>
              <Radio value="price[gte]=0&price[lte]=100">$0 - $100</Radio>
              <Radio value="price[gte]=100&price[lte]=200">$100 - $200</Radio>
              <Radio value="price[gte]=200&price[lte]=300">$200 - $300</Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Grid
          gridTemplateColumns="repeat(12,1fr)"
          gridGap={{ base: 0, md: "2rem", xl: "4rem" }}
        >
          {products.map((product) => (
            <ProductComponent product={product} />
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Product;
