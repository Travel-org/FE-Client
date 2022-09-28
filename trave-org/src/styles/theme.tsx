import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      shadow: string;
      red: {
        900: string;
      };
      blue: {
        900: string;
        600: string;
        300: string;
      };
    };
    breakpoints: {
      lg: string;
      md: string;
      sm: string;
    };
  }
}

export const theme: Theme = {
  colors: {
    shadow: "#00000029",
    red: {
      900: "#FF0000",
    },
    blue: {
      900: "#064389",
      600: "#1396f1",
      300: "#a5defb",
    },
  },
  breakpoints: {
    lg: "1200px",
    md: "768px",
    sm: "480px",
  },
};