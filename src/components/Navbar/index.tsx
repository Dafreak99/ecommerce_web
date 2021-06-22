import React from "react";
import { Box, Heading, Icon, Flex, Input, Image } from "@chakra-ui/react";
import {
  AiFillShop,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "../../contexts/cartContext";

interface Props {}

interface FormValues {
  key: string;
}
const Navbar: React.FC<Props> = () => {
  const history = useHistory();

  const { getTotalQuantity } = useCart();

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    history.push(`/search/${data.key}`);
  };

  return (
    <Box
      boxShadow="0 2px 20px rgb(0 0 0 / 10%)"
      position={history.location.pathname === "/" ? "fixed" : "relative"}
      w="100%"
      zIndex="10"
      bg="#fff"
    >
      <Flex
        className="container"
        alignItems="center"
        justify="space-between"
        height="80px"
      >
        <Flex
          cursor="pointer"
          alignItems="center"
          onClick={() => history.push("/")}
        >
          <Icon as={AiFillShop} boxSize="2rem" mr="0.5rem" color="primary" />
          <Heading fontSize="xl">Ecommerce</Heading>
        </Flex>
        <Flex alignItems="center">
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Search for item..."
                variant="filled"
                size="md"
                {...register("key")}
              />
            </form>
          </Box>
          <Box
            ml="2rem"
            cursor="pointer"
            onClick={() => history.push("/favorite")}
          >
            <Icon as={AiOutlineHeart} boxSize="1.5rem" />
          </Box>

          <Box
            ml="1rem"
            position="relative"
            cursor="pointer"
            onClick={() => history.push("/cart")}
          >
            <Icon as={AiOutlineShoppingCart} boxSize="1.5rem" />
            <Flex
              w="24px"
              h="24px"
              borderRadius="50%"
              justify="center"
              alignItems="center"
              bg="primary"
              color="#fff"
              position="absolute"
              top="-5px"
              right="-18px"
            >
              {getTotalQuantity()}
            </Flex>
          </Box>

          <Box
            ml="3rem"
            cursor="pointer"
            onClick={() => history.push("/signin")}
          >
            <Icon as={FaRegUserCircle} boxSize="1.5rem" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
