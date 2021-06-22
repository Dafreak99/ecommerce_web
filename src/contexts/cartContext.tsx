import React, { useState, useEffect, useContext, createContext } from "react";
import { Product } from "../types";

interface ContextProps {
  cart: Product[];
  addToCart: (product: Product, quantity: number) => void;
  emptyCart: () => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  updateQuantity: (id: string, quantity: number) => void;
  removeItemFromCart: (id: string) => void;
}

const cartContext = createContext<ContextProps>({} as ContextProps);

export const CartProvider: React.FC<{}> = ({ children }) => {
  const cart = useProvideCart();
  return <cartContext.Provider value={cart}>{children}</cartContext.Provider>;
};

export const useCart = () => {
  return useContext(cartContext);
};

const CART: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

const useProvideCart = () => {
  const [cart, setCart] = useState(CART);

  const addToCart = (product: Product, quantity: number) => {
    const newCart: Product[] = [...cart];
    const index = newCart.findIndex((item) => item._id === product._id);

    if (index !== -1) {
      newCart[index].cartQuantity += quantity;
    } else {
      newCart.push({ ...product, cartQuantity: quantity });
    }
    setCart(newCart);
  };

  const removeItemFromCart = (id: string) => {
    const newCart: Product[] = [...cart];

    const items = newCart.filter((cartItem) => cartItem._id !== id);

    setCart(items);
  };

  const emptyCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const getTotalQuantity = () => {
    return cart.reduce(
      (initial: number, item: Product) => initial + item.cartQuantity,
      0
    );
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (initial: number, item: Product) =>
        initial + item.cartQuantity * item.price,
      0
    );
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item._id === id);

    newCart[index].cartQuantity = quantity;
    setCart(newCart);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return {
    cart,
    addToCart,
    emptyCart,
    getTotalQuantity,
    getTotalPrice,
    updateQuantity,
    removeItemFromCart,
  };
};
