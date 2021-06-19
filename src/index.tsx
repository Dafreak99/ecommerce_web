import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { CartProvider } from "./contexts/cartContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
