import { extendTheme } from "@chakra-ui/react";

const FONT =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
export const theme = extendTheme({
  fonts: {
    body: FONT,
    heading: FONT,
  },
  colors: {
    primary: "#17c6aa",
  },
});
