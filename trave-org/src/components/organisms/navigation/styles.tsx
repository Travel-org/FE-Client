import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const NavigationStyle = styled.div`
  top: 0px;
  position: fixed;
  width: 100%;
  z-index: 1001;
`;
const Wrapper = styled.div`
  background: white;
  position: relative;
  padding: 0px 24px;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: inline-flex;
    column-gap: 1rem;
  }
  p {
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;
const Logo = styled.img`
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

export { NavigationStyle, Logo, Wrapper, Margin };