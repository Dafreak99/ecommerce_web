/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiTwotoneFilter } from "react-icons/ai";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import ProductComponent from "../../components/Product";
import {
  getProductsByCategory,
  productSelectors,
} from "../../features/products/productSlice";

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
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    const queryString = new URLSearchParams(location.search);

    if (queryString.has("price[gte]") && queryString.has("price[lte]")) {
      const gte = queryString.get("price[gte]");
      const lte = queryString.get("price[lte]");
      setValue(`price[gte]=${gte}&price[lte]=${lte}`);
    }

    dispatch(
      getProductsByCategory({
        categoryId: params.slug.split("-")[1],
        condition: location.search.slice(1), // avoid "?" at the beginning
      })
    );
  }, [location]);

  const filterOptions = [
    { label: "None", value: "" },
    { label: "< $100", value: "price[lte]=100" },
    { label: "< $200", value: "price[lte]=200" },
    { label: "< $300", value: "price[lte]=300" },
    { label: "> $100", value: "price[gte]=100" },
    { label: "> $200", value: "price[gte]=200" },
    { label: "> $300", value: "price[gte]=300" },
  ];

  const onFilter = (value: string) => {
    setValue(value);
    const { pathname, search } = location;

    const params = new URLSearchParams(search);

    if (params.has("price[gte]")) {
      params.delete("price[gte]");
    } else if (params.has("price[lte]")) {
      params.delete("price[lte]");
    }

    params.delete("page");

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
          minH="calc(100vh - 80px)"
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
      <Box className="container" minH="calc(100vh - 80px)" p="5rem 0">
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
              {filterOptions.map(({ value, label }) => (
                <Radio value={value} key={label}>
                  {label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Flex>

        <Grid
          gridTemplateColumns="repeat(12,1fr)"
          gridGap={{ base: 0, md: "2rem", xl: "4rem" }}
        >
          {products.map((product, i) => (
            <ProductComponent key={i} product={product} />
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Product;
