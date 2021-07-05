import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getProfile } from "../../features/profile/profileSlice";
import OrderList from "./OrderList";
import Profile from "./Profile";

interface Props {}

const Order: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  });

  return (
    <>
      <Navbar />
      <Box minH="calc(100vh - 160px)" p="5rem 0" bg="#f3f3f3">
        <Box className="container">
          <Profile />
          <OrderList />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Order;
