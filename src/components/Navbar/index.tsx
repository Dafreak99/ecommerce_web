import React from "react";
import {
  Box,
  Heading,
  Icon,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineLogout,
  AiOutlineSafetyCertificate,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import { FaRegUserCircle } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCart } from "../../contexts/cartContext";
import { SiShopware } from "react-icons/si";
import { useAuth } from "../../contexts/authContext";
import { useAppSelector } from "../../app/hooks";
import { favoriteSelector } from "../../features/favorites/favoriteSlice";
import { FiPackage } from "react-icons/fi";

interface Props {}

interface FormValues {
  key: string;
}
const Navbar: React.FC<Props> = () => {
  const history = useHistory();

  const { getTotalQuantity } = useCart();

  const { isLoggedIn, isAdminLoggedIn, logout, adminLogout } = useAuth();

  const { register, handleSubmit } = useForm<FormValues>();

  const favorites = useAppSelector(favoriteSelector.selectAll);

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
          <Icon as={SiShopware} boxSize="2rem" mr="0.5rem" color="primary" />
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
            position="relative"
            cursor="pointer"
            onClick={() => history.push("/favorite")}
          >
            <Icon as={AiOutlineHeart} boxSize="1.5rem" />
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
              {isLoggedIn() ? favorites.length : 0}
            </Flex>
          </Box>

          <Box
            ml="2rem"
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

          <Menu>
            <MenuButton colorScheme="pink" ml="2rem">
              <Icon as={FaRegUserCircle} boxSize="1.5rem" />
            </MenuButton>

            <MenuList>
              {isLoggedIn() ? (
                <>
                  <MenuItem onClick={() => history.push("/order")}>
                    <Icon as={FiPackage} boxSize="1rem" mr="10px" /> View Orders
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <Icon as={AiOutlineLogout} boxSize="1rem" mr="10px" />
                    Logout
                  </MenuItem>{" "}
                </>
              ) : (
                <>
                  <MenuItem onClick={() => history.push("/signin")}>
                    <Icon
                      as={AiOutlineSafetyCertificate}
                      boxSize="1rem"
                      mr="10px"
                    />{" "}
                    Sign In
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton colorScheme="pink" ml="2rem">
              <Icon as={GrUserAdmin} boxSize="1.5rem" />
            </MenuButton>
            <MenuList>
              {isAdminLoggedIn() ? (
                <>
                  <MenuItem onClick={() => history.push("/admin")}>
                    <Icon
                      as={AiOutlineSafetyCertificate}
                      boxSize="1rem"
                      mr="10px"
                    />{" "}
                    Admin Dashboard
                  </MenuItem>
                  <MenuItem onClick={adminLogout}>
                    <Icon as={AiOutlineLogout} boxSize="1rem" mr="10px" />
                    Logout
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => history.push("/admin")}>
                    <Icon
                      as={AiOutlineSafetyCertificate}
                      boxSize="1rem"
                      mr="10px"
                    />{" "}
                    Sign In
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
