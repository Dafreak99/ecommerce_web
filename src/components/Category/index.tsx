import React from "react";
import cate1 from "../../images/categories/category-1.png";
import cate2 from "../../images/categories/category-2.png";
import cate3 from "../../images/categories/category-3.png";
import cate4 from "../../images/categories/category-4.png";
import styles from "./Category.module.css";

import { Grid, Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {}

const Category: React.FC<Props> = () => {
  const data = [
    { src: cate1, name: "Computer" },
    { src: cate2, name: "Phone" },
    { src: cate3, name: "TV" },
    { src: cate4, name: "Camera" },
  ];

  return (
    <Box p="5rem 0">
      <Grid gridTemplateColumns="repeat(4, 1fr)" gridGap="4rem">
        {data.map(({ name, src }) => (
          <Link to={`/${name}`} className={styles.category}>
            <Image src={src} w="100px" h="100px" margin="auto" mb="1rem" />
            <Text fontWeight="semibold">{name}</Text>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
