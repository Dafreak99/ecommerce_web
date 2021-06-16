import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Button,
  Image,
} from "@chakra-ui/react";
import React from "react";

import macbook from "../../images/image-removebg.png";

interface Props {}

const Hero: React.FC<Props> = () => {
  return (
    <Box h="calc(100vh - 80px)">
      <Grid
        className="container"
        gridTemplateColumns="repeat(12, 1fr)"
        h="100%"
      >
        <Flex gridColumn="span 6" flexDirection="column" justify="center">
          <Heading mb="2rem" fontSize="6xl">
            Start shopping now for surprise deals
          </Heading>
          <Text mb="4rem" fontSize="xl">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, qui
            aliquid inventore facilis, quibusdam quia cumque quam saepe vitae
            quaerat nam tempora, quisquam aperiam ut iste voluptate incidunt
            totam deleniti.
          </Text>
          <Button w="max-content" bg="primary" color="#fff">
            Browse Now
          </Button>
        </Flex>
        <Grid gridColumn="span 6" placeItems="center">
          <Image src={macbook} w="70%" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
