import React from "react";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getFavorite } from "../../features/favorites/favoriteSlice";
import FavoriteBody from "./FavoriteBody";

interface Props {}

const Favorite: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavorite());
  }, []);

  return (
    <>
      <Navbar />
      <FavoriteBody />
      <Footer />
    </>
  );
};

export default Favorite;
