import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const NavigationStyle = styled.div`
  position: relative;
  width: 100%;
  z-index: 1001;
`;

const Logo = styled.img`
  padding: 0.4rem;
  box-sizing: border-box;
  width: 4rem;
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;

const Margin = styled.div`
  margin-top: 8vh;
  position: relative;
`;

export { NavigationStyle, Logo, Margin };