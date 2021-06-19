import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CartBody from "./CartBody";

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <CartBody />
      <Footer />
    </>
  );
};

export default Cart;
