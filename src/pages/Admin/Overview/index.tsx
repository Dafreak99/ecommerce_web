import { Box, Heading, Select } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import { Line } from "react-chartjs-2";
import { useAppSelector } from "../../../app/hooks";
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

  return (
    <Box>
      <Heading color="gray.600" mb="1rem">
        Overview
      </Heading>
      <Select w="200px" bg="#fff" onChange={(e) => setType(e.target.value)}>
        <option value="order">Orders</option>
        <option value="payment">Payments</option>
      </Select>
      <Line data={data} options={options} type="" />
    </Box>
  );
};

export default Overview;
