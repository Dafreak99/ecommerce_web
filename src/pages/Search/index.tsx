import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getProducts } from "../../features/products/productSlice";
import SearchBody from "./SearchBody";
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
      <SearchBody />
      <Footer />
    </>
  );
};

export default ProductDetail;
