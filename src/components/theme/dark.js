import { createTheme } from "@nextui-org/react";

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      link: "#CE5300",
      primary: "#CE5300",
      background: "#1D1F21",
    },
    fonts: {
      sans: "Cairo",
      mono: "Cairo",
    },
  },
});

export const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#CE5300",
      link: "#CE5300",
      background: "#fff",
    },
    fonts: {
      sans: "Cairo",
      mono: "Cairo",
    },
  },
});
