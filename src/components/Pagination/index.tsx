import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  prevPage: number | null;
  page: number;
  nextPage: number | null;
  totalPages: number;
}

const Pagination: React.FC<Props> = ({
  page,
  prevPage,
  nextPage,
  totalPages,
}) => {
  const history = useHistory();
  const { search, pathname } = useLocation();

  const prev = () => navigate(prevPage);

  const next = () => navigate(nextPage);

  const navigate = (page: number | null) => {
    const params = new URLSearchParams(search);

    page === 1
      ? params.delete("page")
      : params.set("page", page?.toString() as string);

    // use decodeURI to avoid price[lte] getting ugly encoded
    history.push(decodeURI(`${pathname}?${params.toString()}`));
  };

  return (
    <Flex bg="#fff" p="1rem 2rem" justify="flex-end" alignItems="center">
      <Text mr="1rem">{`${page} / ${totalPages}`}</Text>
      <Box>
        <Button mr="1rem" disabled={!prevPage} onClick={prev}>
          <Icon as={BiLeftArrow} />
        </Button>
        <Button disabled={!nextPage} onClick={next}>
          <Icon as={BiRightArrow} />
        </Button>
      </Box>
    </Flex>
  );
};

export default Pagination;
