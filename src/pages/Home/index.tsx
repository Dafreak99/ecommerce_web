/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/authContext";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getFavorite } from "../../features/favorites/favoriteSlice";
import Products from "../../features/products/Products";
import { getProducts } from "../../features/products/productSlice";

interface Props {}

const Home: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  const categoriesStatus = useAppSelector((state) => state.categories.status);

  useEffect(() => {
    if (categoriesStatus === "idle") dispatch(getCategories());

    dispatch(getProducts({ condition: "", limit: 8 }));
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
