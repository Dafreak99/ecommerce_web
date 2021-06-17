import React from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductBody from "./ProductBody";
interface Props {}

const Product: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <ProductBody />
      <Footer />
    </>
  );
};

export default Product;
