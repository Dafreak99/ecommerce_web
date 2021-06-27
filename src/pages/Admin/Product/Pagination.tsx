import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useAppDispatch } from "../../../app/hooks";
import { getProducts } from "../../../features/products/productSlice";

interface Props {
  prevPage: number | null;
  page: number;
  nextPage: number | null;
}

const Pagination: React.FC<Props> = ({ page, prevPage, nextPage }) => {
  const dispatch = useAppDispatch();

  const prev = () => {
    dispatch(getProducts(`?page=${prevPage}`));
  };
  const next = () => {
    dispatch(getProducts(`?page=${nextPage}`));
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
