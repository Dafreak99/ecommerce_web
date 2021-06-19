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

import styles from "./hero.module.css";
import hero from "../../images/hero.svg";

interface Props {}

const Hero: React.FC<Props> = () => {
  return (
    <Box h="100vh">
      <Grid
        className="container"
        gridTemplateColumns="repeat(12, 1fr)"
        h="100%"
      >
        <Flex
          gridColumn={{ base: "span 12", xl: "span 6" }}
          flexDirection="column"
          justify="center"
          textAlign={{ base: "center", xl: "left" }}
          p="4rem 0"
        >
          <Heading
            mb="2rem"
            fontSize={{ base: "3xl", md: "4xl", xl: "6xl" }}
            className={styles.heading}
          >
            Start shopping now for surprise deals
          </Heading>
          <Text
            mb="4rem"
            fontSize={{ base: "md", xl: "lg" }}
            fontWeight="normal"
            className={styles.text}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, qui
            aliquid inventore facilis, quibusdam quia cumque quam saepe vitae
            quaerat nam tempora, quisquam aperiam ut iste voluptate incidunt
            totam deleniti.
          </Text>
          <Button
            w="max-content"
            bg="primary"
            color="#fff"
            className={styles.button}
            margin={{ base: "0 auto", xl: 0 }}
          >
            Browse Now
          </Button>
        </Flex>
        <Grid
          display={{ base: "none", xl: "grid" }}
          gridColumn={{ base: "span 12", xl: "span 6" }}
          placeItems="center"
        >
          <Image
            src={hero}
            w="70%"
            h={{ base: "50%", xl: "auto" }}
            className={styles.img}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
