import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    backgroundColor: {
      default: string;
      color1: string;
      color2: string;
    };
    fonts: {
      900: string;
      800: string;
      700: string;
      600: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
    };
  }
  // allow configuration using `createTheme`
  export interface ThemeOptions {
    backgroundColor: {
      default: string;
      color1: string;
      color2: string;
    };
    fonts: {
      900: string;
      800: string;
      700: string;
      600: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
    };
  }
}

export const theme = createTheme({
  typography: {
    caption: {
      fontSize: "60px",
    },
    h1: {
      fontSize: "35px",
    },
    h2: {
      fontSize: "32px",
    },
    h3: {
      fontSize: "22px",
    },
    button: {
      fontSize: "18px",
    },
    body1: {
      fontSize: "15px",
    },
    subtitle1: {
      fontSize: "12px",
    },
    fontFamily: "Inter",
  },
  palette: {
    primary: {
      "400": "#FFA7B4",
      "500": "#FF8294",
      "600": "#FF6D81",
      "700": "#EC4960",
      "800": "#D43148",
      "900": "#9E2531",
    },
    secondary: {
      main: "#FFB8B7",
      "300": "#FFD9D8",
      "400": "#FFB8B7",
      "500": "#FFA2A1",
      "600": "#FF8886",
      "700": "#FF7674",
      "800": "#FC5F5D",
      "900": "#F04E4C",
    },
    grey: {
      "300": "#F2F2F2",
      "400": "#E1E1E1",
      "500": "#DADADA",
      "600": "#BCBCBC",
      "700": "#8F8F8F",
      "800": "#626262",
      "900": "#545454",
    },
    success: {
      "300": "#D8FFDA",
      "400": "#C1FFC3",
      "500": "#80FF85",
      "600": "#57F35D",
      "700": "#34EA3B",
      "800": "#0FCB16",
      "900": "#06B70D",
    },
    info: {
      "300": "#D2EFFF",
      "400": "#89D5FF",
      "500": "#45A5FF",
      "600": "#188CFA",
      "700": "#1877F2",
      "800": "#2B44FF",
      "900": "#0035EF",
    },
    text: {
      primary: "#BC2B3E",
    },
    common: {
      black: "black",
      white: "white",
    },
  },
  backgroundColor: {
    default: "white",
    color1: "#101527",
    color2: "#070D1B",
  },
  fonts: {
    "100": "Inter100",
    "200": "Inter200",
    "300": "Inter300",
    "400": "Inter",
    "500": "Inter500",
    "600": "Inter600",
    "700": "Inter700",
    "800": "Inter800",
    "900": "Inter900",
  },
});
