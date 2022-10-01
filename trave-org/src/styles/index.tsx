import styled from "@emotion/styled";
import { theme } from "./theme";

export const FlexDiv = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
`;

export const Background = styled.div`
  width: 100vw;
  height: 92vh;
  background: ${theme.colors.blue[900]};
`;