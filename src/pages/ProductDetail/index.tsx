import React from "react";
import { useEffect } from "react";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductBody from "./ProductBody";
interface Props {}

const ProductDetail: React.FC<Props> = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      <Navbar />
      <ProductBody />
      <Footer />
    </>
  );
};

export default ProductDetail;
