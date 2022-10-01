import { css } from "@emotion/react";
import { theme } from "./theme";

const reset = css`
  body {
    width: 100vw;
    height: calc(100vh - 8vh);
    margin: 0px;
    background: ${theme.colors.blue[300]};
    font-size: 16px;
    /* @media (max-width: ${theme.breakpoints.md}) {
      font-size: 8px;
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: 4px;
    } */
  }
`;

export default reset;