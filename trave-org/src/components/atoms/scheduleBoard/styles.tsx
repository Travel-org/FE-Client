import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  padding: 1rem;
  box-sizing: border-box;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export { Container };