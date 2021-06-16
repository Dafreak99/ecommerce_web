import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Products from "../../features/products/Products";
interface Props {}

const Product: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <p>hello</p>
      <Products />
      <Footer />
    </>
  );
};

export default Product;
