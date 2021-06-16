import React, { useState, useEffect } from "react";
import { Box, Heading, Icon, Flex, List, ListItem } from "@chakra-ui/react";
import { AiFillShop } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { AiOutlinePercentage } from "react-icons/ai";
import {
  BsCardChecklist,
  BsCardText,
  BsCreditCard,
  BsDisplay,
  BsListCheck,
} from "react-icons/bs";

import styles from "./Sidebar.module.css";

interface Props {}

const Sidebar: React.FC<Props> = () => {
  const history = useHistory();

  const [index, setIndex] = useState<number>(0);

  const routes: any = {
    undefined: 0,
    category: 1,
    order: 2,
    payment: 3,
    voucher: 4,
    promotion: 5,
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
    { title: "Product", icon: BsDisplay, path: "/admin" },
    { title: "Category", icon: BsListCheck, path: "/admin/category" },
    { title: "Order", icon: BsCardChecklist, path: "/admin/order" },
    { title: "Payment", icon: BsCreditCard, path: "/admin/payment" },
    { title: "Voucher", icon: BsCardText, path: "/admin/voucher" },
    { title: "Promotion", icon: AiOutlinePercentage, path: "/admin/promotion" },
  ];

  return (
    <Box w="15vw" h="100vh" p="2rem">
      <Flex
        alignItems="center"
        mb="4rem"
        cursor="pointer"
        flexDirection="column"
        onClick={() => history.push("/")}
      >
        <Icon as={AiFillShop} boxSize="4rem" mr="0.5rem" />
        <Heading color="gray.700" fontSize="3xl">
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
              >
                <Icon as={icon} className={styles.icon} />
                {title}
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
