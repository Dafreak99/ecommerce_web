import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  Heading,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Text,
  Thead,
  VStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../contexts/authContext";
import { useCart } from "../../contexts/cartContext";
import { addToFavorite } from "../../features/favorites/favoriteSlice";
import { productSelectors } from "../../features/products/productSlice";
import { Product } from "../../types";

interface Props {}

const ProductBody: React.FC<Props> = () => {
  const { addToCart } = useCart();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );

  const onHandleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const onAddToFavorite = (product: Product) => {
    if (!isLoggedIn()) {
      history.push({ pathname: "/login", state: history.location.pathname });
    }

    dispatch(addToFavorite(product));
  };

  return (
    <Box minH="calc(100vh - 160px)" borderBottom="1px solid #f3f3f3">
      <Box bg="gray.100">
        <Breadcrumb p="1rem 0" className="container">
          <BreadcrumbItem onClick={() => history.push("/")}>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem
            onClick={() => history.push(`/${product?.category[0].name}`)}
          >
            <BreadcrumbLink>{product?.category[0].name}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{product?.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      {product ? (
        <>
          <Grid
            className="container"
            gridTemplateColumns="repeat(12,1fr)"
            gridGap={{ base: 0, lg: "4rem" }}
            gridRowGap="4rem"
            p="4rem 0"
          >
            <Heading gridColumn="span 12" fontSize="xl">
              {product.title}
            </Heading>

            <Box gridColumn={{ base: "span 12", lg: "span 5" }}>
              <Image src={product.images[0]} w="60%" />
            </Box>
            <Box gridColumn={{ base: "span 12", lg: "span 7" }}>
              <Text fontSize="3xl" fontWeight="semibold" mb="1.5rem">
                ${product.price}
              </Text>
              <VStack alignItems="flex-start" spacing={5}>
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="gray.600">
                    Description
                  </Text>
                  <Text>{product.desciption}</Text>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="gray.600">
                    Category{" "}
                    <Badge
                      cursor="pointer"
                      size="large"
                      colorScheme="messenger"
                      onClick={() =>
                        history.push("/" + product.category[0].name)
                      }
                    >
                      {product.category[0].name}
                    </Badge>
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="gray.600">
                    Specifications
                  </Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th></Th>
                        <Th></Th>
                      </Tr>
                    </Thead>

                    <Tbody>
                      {Object.entries(product.specifications).map((spec) => (
                        <Tr>
                          <Td>{spec[0] as string}</Td>
                          <Td>{spec[1] as string}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
              <Box mt="2rem">
                <Button
                  leftIcon={<AiOutlineShoppingCart />}
                  onClick={() => onHandleAddToCart(product)}
                  mr="1rem"
                  bg="primary"
                  color="#fff"
                >
                  Add to cart
                </Button>
                <Button
                  leftIcon={<AiFillHeart />}
                  onClick={() => onAddToFavorite(product)}
                  bg="#f882b3"
                  color="#ffff"
                >
                  Add to favorite
                </Button>
              </Box>
            </Box>
          </Grid>
        </>
      ) : (
        <Flex
          className="container"
          justify="center"
          alignItems="center"
          p="5rem 0"
        >
          <Spinner />
        </Flex>
      )}
    </Box>
  );
};

export default ProductBody;
