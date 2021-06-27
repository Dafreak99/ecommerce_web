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
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(
  "pk_test_51J4jVuAKmaLhXlhzGeYcInpRupzDBdzZSfa1xRqHoceOeX3l7IY8wPxiFTMTrSVzIJ5wh675FNf7SaBfA6bzjf6x00D2uemC2M"
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>
            <App stripe={stripe} />
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
