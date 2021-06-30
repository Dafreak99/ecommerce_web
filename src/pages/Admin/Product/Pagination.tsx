import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  prevPage: number | null;
  page: number;
  nextPage: number | null;
}

const Pagination: React.FC<Props> = ({ page, prevPage, nextPage }) => {
  const history = useHistory();
  const { search } = useLocation();

  const prev = () => {
    history.push(`/admin/product/?page=${prevPage}${searchCondition()}`);
  };
  const next = () => {
    history.push(`/admin/product/?page=${nextPage}${searchCondition()}`);
  };

  const searchCondition = () => {
    const params = new URLSearchParams(search);

    // Since ?page is a fixture param, delete params to avoid ?page=1&page=2
    if (params.has("page")) params.delete("page");

    return params.toString() ? `&${params.toString()}` : "";
  };

  return (
    <Box bg="#fff" p="1rem 2rem" textAlign="right">
      <Button mr="1rem" disabled={!prevPage} onClick={prev}>
        <Icon as={BiLeftArrow} />
      </Button>
      <Button disabled={!nextPage} onClick={next}>
        <Icon as={BiRightArrow} />
      </Button>
    </Box>
  );
};

export default Pagination;
