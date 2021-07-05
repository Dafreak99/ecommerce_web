import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Icon,
  Flex,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineBarChart, AiOutlinePercentage } from "react-icons/ai";
import {
  BsCardChecklist,
  BsCardText,
  BsCreditCard,
  BsDisplay,
  BsListCheck,
} from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";

import styles from "./Sidebar.module.css";
import { useAuth } from "../../../contexts/authContext";
import { SiShopware } from "react-icons/si";
import { GrOverview } from "react-icons/gr";
interface Props {}

const Sidebar: React.FC<Props> = () => {
  const history = useHistory();
  const { adminLogout } = useAuth();

  const [index, setIndex] = useState<number>(0);

  const routes: any = {
    overview: 0,
    product: 1,
    category: 2,
    order: 3,
    payment: 4,
    voucher: 5,
    promotion: 6,
  };

  useEffect(() => {
    const { pathname } = history.location;

    const basePath = pathname.split("/")[2];

    setIndex(routes[basePath]);
  }, []);

  const renderClassName = (input: number) => {
    return index === input ? styles.listActive : styles.list;
  };

  const menu = [
    { title: "Overview", icon: AiOutlineBarChart, path: "/admin/overview" },
    { title: "Product", icon: BsDisplay, path: "/admin/product" },
    { title: "Category", icon: BsListCheck, path: "/admin/category" },
    { title: "Order", icon: BsCardChecklist, path: "/admin/order" },
    { title: "Payment", icon: BsCreditCard, path: "/admin/payment" },
    { title: "Voucher", icon: BsCardText, path: "/admin/voucher" },
    { title: "Promotion", icon: AiOutlinePercentage, path: "/admin/promotion" },
  ];

  return (
    <Box w="15vw" h="100vh" p="2rem 1.5rem">
      <Flex
        alignItems="center"
        mb="4rem"
        cursor="pointer"
        flexDirection="column"
        onClick={() => history.push("/")}
      >
        <Icon
          as={SiShopware}
          boxSize={{ base: "2rem", xl: "3rem" }}
          mb="0.5rem"
          color="primary"
        />
        <Heading color="gray.700" fontSize={{ base: "md", xl: "3xl" }}>
          Ecommerce
        </Heading>
      </Flex>
      <Box>
        <List spacing={6}>
          {menu.map(({ title, icon, path }, i) => (
            <Link to={path} className={styles.link} key={i}>
              <ListItem
                className={renderClassName(i)}
                onClick={() => setIndex(i)}
                display="flex"
                alignItems="center"
              >
                <Icon as={icon} className={styles.icon} />
                <Text display={{ base: "none", xl: "block" }}>{title}</Text>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
      <Flex
        mt="4rem"
        alignItems="center"
        justify="center"
        cursor="pointer"
        onClick={adminLogout}
      >
        <Icon as={FiLogOut} boxSize="2rem" mr="5px" />
        <Text fontWeight="semibold">Logout</Text>
      </Flex>
    </Box>
  );
};

export default Sidebar;
