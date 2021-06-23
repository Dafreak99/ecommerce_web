import React from "react";

import { Box } from "@chakra-ui/react";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Products from "../../features/products/Products";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProducts } from "../../features/products/productSlice";
import { getFavorite } from "../../features/favorites/favoriteSlice";
import { useAuth } from "../../contexts/authContext";
import { getCategories } from "../../features/categories/categoriesSlice";

interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  const categoriesStatus = useAppSelector((state) => state.categories.status);

  useEffect(() => {
    if (categoriesStatus === "idle") dispatch(getCategories());

    dispatch(getProducts(""));
    if (isLoggedIn()) {
      dispatch(getFavorite());
    }
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Box className="container">
        <Category />
        <Products />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
