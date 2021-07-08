import React from "react";
import cate1 from "../../images/categories/category-1.png";
import cate2 from "../../images/categories/category-2.png";
import cate3 from "../../images/categories/category-3.png";
import cate4 from "../../images/categories/category-4.png";
import styles from "./Category.module.css";

import { Grid, Box, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { categorySelectors } from "../../features/categories/categoriesSlice";

interface Props {}

const Category: React.FC<Props> = () => {
  const categories = useAppSelector(categorySelectors.selectAll);

  const data = [
    { src: cate4, name: "Tablet2" },
    { src: cate3, name: "TV" },
    { src: cate2, name: "Phone" },
    { src: cate1, name: "Computer" },
  ];

  return (
    <Box p="5rem 0">
      <Grid
        gridTemplateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gridGap={{ base: "1rem", md: "2rem", xl: "4rem" }}
      >
        {categories.reverse().map(({ name, _id }, i) => (
          <Link
            to={`/cat/${name.toLowerCase()}-${_id}`}
            className={styles.category}
          >
            <Image
              src={data[i].src}
              w={{ base: "50px", md: "100px" }}
              h={{ base: "50px", md: "100px" }}
              margin="auto"
              mb="1rem"
            />
            <Text fontWeight="semibold">{name}</Text>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
