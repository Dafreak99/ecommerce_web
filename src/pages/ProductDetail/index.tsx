import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  getProducts,
  productSelectors,
} from "../../features/products/productSlice";
import Comment from "./Comment";
import ProductBody from "./ProductBody";
import RelatedProducts from "./RelatedProducts";
interface Props {}

const ProductDetail: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const productStatus = useAppSelector((state) => state.products.status);

  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (productStatus === "idle") dispatch(getProducts(""));
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return (
    <>
      <Navbar />
      <ProductBody />
      <Comment />
      <RelatedProducts categoryId={product?.category[0]._id} />
      <Footer />
    </>
  );
};

export default ProductDetail;
