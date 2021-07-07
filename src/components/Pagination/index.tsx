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

  const prev = () => {
    // use decodeURI to avoid price[lte] getting ugly encoded
    history.push(decodeURI(`${pathname}?page=${prevPage}${searchCondition()}`));
  };
  const next = () => {
    history.push(decodeURI(`${pathname}?page=${nextPage}${searchCondition()}`));
  };

  const searchCondition = () => {
    const params = new URLSearchParams(search);

    // Since ?page is a fixture param, delete params to avoid ?page=1&page=2
    if (params.has("page")) params.delete("page");

    return params.toString() ? `&${params.toString()}` : "";
  };

  return (
    <Flex bg="#fff" p="1rem 2rem" alignItems="center">
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
