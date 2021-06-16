import React from "react";

import { Box } from "@chakra-ui/react";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Products from "../../features/products/Products";

interface Props {}

const Home: React.FC<Props> = () => {
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
