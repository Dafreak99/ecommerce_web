import { Box, Flex, Grid, Heading, Icon, Select, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";

import { Line } from "react-chartjs-2";
import {
  AiOutlineLaptop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { orderSelectors } from "../../../features/orders/orderSlice";
import { getOverview } from "../../../features/overview/overviewSlice";
import { getProducts } from "../../../features/products/productSlice";
interface Props {}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Overview: React.FC<Props> = () => {
  const { ordersOverview, paymentsOverview } = useAppSelector(
    (state) => state.overview
  );

  const productsQuantity = useAppSelector((state) => state.products.totalDocs);
  const ordersQuantity = useAppSelector((state) => state.orders.totalDocs);
  const orders = useAppSelector(orderSelectors.selectAll);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts({ condition: "" }));
    dispatch(getOverview());
  }, []);

  const [type, setType] = useState("order");

  const data = {
    labels:
      type === "order"
        ? ordersOverview.map((order) => order.month)
        : paymentsOverview.map((payment) => payment.month),
    datasets: [
      {
        label: type === "order" ? "Number of Orders" : "Number of Payments",
        data:
          type === "order"
            ? ordersOverview.map((order) => order.total_orders)
            : paymentsOverview.map((payment) => payment.total_amount),
        fill: false,
        backgroundColor: "#347deb",
        borderColor: "#a7c9fc",
      },
    ],
  };

  const totalOrders = ordersOverview
    .reduce((initial, order) => initial + order.total_orders, 0)
    .toString();

  const totalIncome = paymentsOverview
    .reduce((initial, payment) => initial + payment.total_amount, 0)
    .toString();

  const boxes = [
    { name: "Product", value: productsQuantity, icon: AiOutlineLaptop },
    { name: "Daily Visits", value: 199, icon: AiOutlineUser },
    {
      name: "Total Income",
      value: "$" + totalIncome.slice(0, totalIncome.length - 2),
      icon: MdAttachMoney,
    },
    { name: "Orders", value: totalOrders, icon: AiOutlineShoppingCart },
  ];

  return (
    <Box>
      <Heading color="gray.600" mb="1rem">
        Overview
      </Heading>
      <Grid gridTemplateColumns="repeat(12,1fr)" gridGap="2rem">
        <Grid
          gridColumn="span 6"
          gridTemplateColumns="repeat(12,1fr)"
          gridGap="2rem"
        >
          {boxes.map(({ icon, name, value }) => (
            <Box
              gridColumn="span 6"
              p="2rem 3rem"
              bg="#fff"
              boxShadow="0 15px 30px rgb(158 205 255 / 5%)"
              borderRadius="20px"
            >
              <Flex justify="space-between" alignItems="center">
                <Icon as={icon} boxSize="3rem" />
                <Box>
                  <Text fontSize="3xl" fontWeight="bold">
                    {value}
                  </Text>
                  <Text>{name}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Grid>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          p="2rem 3rem"
          bg="#fff"
          boxShadow="0 15px 30px rgb(158 205 255 / 5%)"
          borderRadius="20px"
        >
          <Select w="200px" bg="#fff" onChange={(e) => setType(e.target.value)}>
            <option value="order">Orders</option>
            <option value="payment">Payments</option>
          </Select>
          <Line data={data} options={options} type="" />
        </Box>
      </Grid>
    </Box>
  );
};

export default Overview;
