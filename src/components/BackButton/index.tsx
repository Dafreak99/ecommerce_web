import React from "react";
import { Box, Flex, Grid, Heading, Icon } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import { useHistory } from "react-router-dom";

interface Props {
  heading: string;
}

const BackButton: React.FC<Props> = ({ heading }) => {
  const history = useHistory();

  return (
    <Flex alignItems="center">
      <Flex
        onClick={history.goBack}
        justify="center"
        alignItems="center"
        boxSize="50px"
        borderRadius="50%"
        bg="#b2fee23b"
        mr="1rem"
        cursor="pointer"
        transition="350ms all"
        _hover={{ boxShadow: "0 10px 30px rgb(76 234 191 / 16%)" }}
      >
        <Icon boxSize="2rem" as={BsArrowLeft} color="primary" />
      </Flex>
      <Heading color="gray.600">{heading}</Heading>
    </Flex>
  );
};

export default BackButton;
