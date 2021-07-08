import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SiShopware } from "react-icons/si";
import { Link, useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { categorySelectors } from "../../features/categories/categoriesSlice";

interface Props {}

const Footer: React.FC<Props> = () => {
  const history = useHistory();

  const categories = useAppSelector(categorySelectors.selectAll);

  return (
    <Box p="5rem 0" background="#06070a">
      <Box className="container">
        <Grid gridTemplateColumns="repeat(12,1fr)" gridGap="2rem">
          <Flex
            gridColumn="span 4"
            cursor="pointer"
            alignItems="center"
            onClick={() => history.push("/")}
          >
            <Icon as={SiShopware} boxSize="2rem" mr="0.5rem" color="primary" />
            <Heading
              fontSize="xl"
              display={{ base: "none", md: "block" }}
              color="gray.300"
            >
              Ecommerce
            </Heading>
          </Flex>
          <List spacing={4} color="gray.500">
            {categories.reverse().map(({ name, _id }, i) => (
              <ListItem key={i}>
                <Link to={`/cat/${name.toLowerCase()}-${_id}`}>
                  <Text fontWeight="semibold">{name}</Text>
                </Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
