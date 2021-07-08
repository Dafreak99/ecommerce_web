import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
  Image,
  Heading,
  Button,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Product from "../../components/Product";
import { useAuth } from "../../contexts/authContext";
import { favoriteSelector } from "../../features/favorites/favoriteSlice";

import login from "../../images/login.svg";

interface Props {}

const FavoriteBody: React.FC<Props> = () => {
  const history = useHistory();

  const { isLoggedIn } = useAuth();

  const favorites = useAppSelector(favoriteSelector.selectAll);

  return (
    <Box minH="calc(100vh - 80px)">
      <Box bg="gray.100">
        <Breadcrumb p="1rem 0" className="container">
          <BreadcrumbItem onClick={() => history.push("/")}>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink>Favorite</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>

      <Box p="5rem 0" className="container">
        {!isLoggedIn() ? (
          <Flex justify="center" alignItems="center" flexDirection="column">
            <Image src={login} h="20rem" />
            <Heading mt="2rem" fontSize="xl">
              Login to view your wishlist
            </Heading>
            <Text mt="10px">
              Look like you're interested in some of our items
            </Text>
            <Button
              bg="primary"
              color="#fff"
              mt="2rem"
              size="lg"
              onClick={() =>
                history.push({ pathname: "/login", state: "/favorite" })
              }
            >
              Go to Login
            </Button>
          </Flex>
        ) : favorites.length === 0 ? (
          <Flex justify="center" alignItems="center" flexDirection="column">
            <Image src={login} h="20rem" />
            <Heading mt="2rem" fontSize="xl">
              Your favorite list is currently empty
            </Heading>
            <Text mt="10px">
              Look like you haven't added any items to your favorite yet
            </Text>
            <Button
              bg="primary"
              color="#fff"
              mt="2rem"
              size="lg"
              onClick={() => history.push("/")}
            >
              Go to Product
            </Button>
          </Flex>
        ) : (
          <>
            <Heading fontSize="large" mb="2rem">
              Your wishlist
            </Heading>
            <Grid gridTemplateColumns="repeat(12,1fr)">
              {favorites.map((favorite) => (
                <Product product={favorite} isRenderAsFavorite />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FavoriteBody;
