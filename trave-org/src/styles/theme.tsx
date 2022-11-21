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
      green: {
        600: string;
        300: string;
      };
      grey: {
        600: string;
        500: string;
        300: string;
      };
      white: string;
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
      600: "#3DBBF5",
      300: "#a5defb",
    },
    green: {
      600: "#46cc59",
      300: "#c8ffc8",
    },
    grey: {
      600: "#a1a4a0",
      500: "#BDBDBD",
      300: "#edefed",
    },
    white: "#ffffff",
  },
  breakpoints: {
    lg: "1200px",
    md: "768px",
    sm: "480px",
  },
};