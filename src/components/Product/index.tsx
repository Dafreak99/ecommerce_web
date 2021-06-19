import React, { useState } from "react";
import { Box, Image, Tooltip, Icon, Text } from "@chakra-ui/react";
import { Product as ProductType } from "../../types";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useCart } from "../../contexts/cartContext";

interface Props {
  product: ProductType;
}

const Product: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();

  const onHandleAddToCart = (product: ProductType) => {
    addToCart(product, 1);
  };

  return (
    <Box
      className="product"
      gridColumn={{ base: "span 12", md: "span 6", xl: "span 3" }}
    >
      <Link to={`/product/${product._id}`} className="product__link">
        <Image
          src={product.images[0]}
          h="8rem"
          margin="0 auto"
          mb="1rem"
          objectFit="cover"
          objectPosition="center"
        />
        <Box>
          <Box className="product__utils" onClick={(e) => e.preventDefault()}>
            <Tooltip
              label="Add to cart"
              aria-label="A tooltip"
              placement="right"
            >
              <Box
                className="product__icon"
                onClick={() => onHandleAddToCart(product)}
              >
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
            {product.title}
          </Text>
          <Text fontWeight="bold" mb="1rem" fontSize="lg" color="black.700">
            ${product.price}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default Product;
