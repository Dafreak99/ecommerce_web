import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import OrderBody from "./OrderBody";

interface Props {}

const Order: React.FC<Props> = () => {
  return (
    <>
      <Navbar />
      <OrderBody />
      <Footer />
    </>
  );
};

export default Order;
