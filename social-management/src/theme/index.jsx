import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  breakpoints: {
    xs: "50px",
    sm: "375px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
    "2xl": "2560px",
  },
});

export default theme;
