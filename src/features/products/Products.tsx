import {
  Box,
  Heading,
  Grid,
  Image,
  Spinner,
  Tooltip,
  Text,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts, productSelectors } from "./productSlice";
import "./product.css";

interface Props {}

const Product: React.FC<Props> = () => {
  const products = useAppSelector(productSelectors.selectAll);

  return (
    <Box p="5rem 0">
      <Heading fontSize="lg" color="blackAlpha.800" mb="2rem">
        PRODUCTS
      </Heading>

      <Grid gridTemplateColumns="repeat(12,1fr)" gridGap="4rem">
        {products.map(({ _id, title, price, images }) => (
          <Link to={`/product/${_id}`} className="product">
            <Image
              src={images[0]}
              h="8rem"
              margin="0 auto"
              mb="1rem"
              objectFit="cover"
              objectPosition="center"
            />
            <Box>
              <Box className="product__utils">
                <Tooltip
                  label="Add to cart"
                  aria-label="A tooltip"
                  placement="right"
                >
                  <Box className="product__icon">
                    <Icon as={MdAddShoppingCart} boxSize="1.5rem" color="" />
                  </Box>
                </Tooltip>
                <Tooltip
                  label="Add to favorite"
                  aria-label="A tooltip"
                  placement="right"
                >
                  <Box className="product__icon">
                    <Icon as={MdFavoriteBorder} boxSize="1.5rem" />
                  </Box>
                </Tooltip>
                <Tooltip
                  label="Quick view"
                  aria-label="A tooltip"
                  placement="right"
                >
                  <Box className="product__icon">
                    <Icon as={AiOutlineEye} boxSize="1.5rem" />
                  </Box>
                </Tooltip>
              </Box>
              <Box>
                <Icon as={AiFillStar} size="24px" color="#ffd712" />
                <Icon as={AiFillStar} size="24px" color="#ffd712" />
                <Icon as={AiFillStar} size="24px" color="#ffd712" />
                <Icon as={AiFillStar} size="24px" color="#ffd712" />
                <Icon as={AiFillStar} size="24px" color="#ffd712" />
              </Box>
              <Text fontSize="lg" mb="5px">
                {title}
              </Text>
              <Text fontWeight="bold" mb="1rem" fontSize="lg" color="black.700">
                ${price}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Product;
