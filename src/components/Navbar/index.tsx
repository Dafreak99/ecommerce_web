import React from "react";
import { Box, Heading, Icon, Flex, Input, Image } from "@chakra-ui/react";
import { AiFillShop, AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo-sm.png";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const history = useHistory();

  return (
    <Box boxShadow="0 2px 20px rgb(0 0 0 / 10%)">
      <Flex
        className="container"
        alignItems="center"
        justify="space-between"
        height="80px"
      >
        <Flex alignItems="center">
          <Icon as={AiFillShop} boxSize="2rem" mr="0.5rem" color="primary" />
          {/* <Image src={logo} alt="logo" h="2rem" w="2rem" mr="0.5rem" /> */}
          <Heading fontSize="xl">Ecommerce</Heading>
        </Flex>
        <Flex alignItems="center">
          <Box>
            <Input
              placeholder="Search for item..."
              variant="filled"
              size="md"
            />
          </Box>
          <Box onClick={() => history.push("/cart")} cursor="pointer">
            <Icon as={AiOutlineShoppingCart} ml="2rem" boxSize="1.5rem" />
          </Box>
          <Box onClick={() => history.push("/admin")} cursor="pointer">
            <Icon as={FaRegUserCircle} ml="2rem" boxSize="1.5rem" />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
