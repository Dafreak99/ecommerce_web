import React from "react";
import {
  Box,
  Image,
  Tooltip,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Product as ProductType } from "../../types";
import { MdAddShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { IoMdHeartDislike } from "react-icons/io";

import "./product.css";
import { useCart } from "../../contexts/cartContext";
import { useAuth } from "../../contexts/authContext";
import { useAppDispatch } from "../../app/hooks";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../features/favorites/favoriteSlice";
import QuickReview from "../QuickReview";

interface Props {
  product: ProductType;
  isRenderAsFavorite?: boolean;
}

const Product: React.FC<Props> = ({ product, isRenderAsFavorite = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();

  const onAddToCart = (product: ProductType) => {
    addToCart(product, 1);
  };

  const onAddToFavorite = (product: ProductType) => {
    if (!isLoggedIn()) {
      history.push("/login");
    }

    dispatch(addToFavorite(product));
  };

  const onRemoveFromFavorite = (id: string) => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <Box
      className="product"
      gridColumn={{ base: "span 12", sm: "span 6", xl: "span 3" }}
    >
      <Link to={`/product/${product._id}`} className="product__link">
        <Box className="product__utils" onClick={(e) => e.preventDefault()}>
          {isRenderAsFavorite ? (
            <>
              <Tooltip
                label="Remove from favorite"
                aria-label="A tooltip"
                placement="right"
              >
                <Box
                  className="product__icon"
                  onClick={() => onRemoveFromFavorite(product._id)}
                >
                  <Icon as={IoMdHeartDislike} boxSize="1.5rem" color="" />
                </Box>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip
                label="Add to cart"
                aria-label="A tooltip"
                placement="right"
              >
                <Box
                  className="product__icon"
                  onClick={() => onAddToCart(product)}
                >
                  <Icon as={MdAddShoppingCart} boxSize="1.5rem" color="" />
                </Box>
              </Tooltip>
              <Tooltip
                label="Add to favorite"
                aria-label="A tooltip"
                placement="right"
              >
                <Box
                  className="product__icon"
                  onClick={() => onAddToFavorite(product)}
                >
                  <Icon as={MdFavoriteBorder} boxSize="1.5rem" />
                </Box>
              </Tooltip>
              <Tooltip
                label="Quick view"
                aria-label="A tooltip"
                placement="right"
              >
                <Box className="product__icon" onClick={onOpen}>
                  <Icon as={AiOutlineEye} boxSize="1.5rem" />
                </Box>
              </Tooltip>
              <QuickReview
                isOpen={isOpen}
                onClose={onClose}
                product={product}
              />
            </>
          )}
        </Box>
        <Image
          src={product.images[0]}
          h="8rem"
          margin="0 auto"
          mb="1rem"
          objectFit="cover"
          objectPosition="center"
        />
        <Box>
          <Box>
            <Icon as={AiFillStar} size="24px" color="#ffd712" />
            <Icon as={AiFillStar} size="24px" color="#ffd712" />
            <Icon as={AiFillStar} size="24px" color="#ffd712" />
            <Icon as={AiFillStar} size="24px" color="#ffd712" />
            <Icon as={AiFillStar} size="24px" color="#ffd712" />
          </Box>
          <Text mb="5px" fontSize={{ base: "md", xl: "lg" }}>
            {product.title}
          </Text>
          <Text
            fontWeight="bold"
            mb="1rem"
            fontSize={{ base: "md", xl: "lg" }}
            color="black.700"
          >
            ${product.price}
          </Text>
        </Box>
      </Link>
    </Box>
  );
};

export default Product;
