import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { CartProvider } from "./contexts/cartContext";
import { AuthProvider } from "./contexts/authContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
