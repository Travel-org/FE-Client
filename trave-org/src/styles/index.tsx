import styled from "@emotion/styled";

export const FlexDiv = styled.div<{ direction: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
`;