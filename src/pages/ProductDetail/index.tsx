/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();

  const productStatus = useAppSelector((state) => state.products.status);

  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );

  useEffect(() => {
    if (productStatus === "idle")
      dispatch(getProducts({ condition: "", limit: 8 }));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, [location]);

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
