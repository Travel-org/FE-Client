import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  height: 80%;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
`;

const SettlementElementContainer = styled.div`
  display: flex;
  padding: 0px 2rem;
  flex-direction: column;
  height: 70vh;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  * {
    margin: 0px;
  }
  div {
    display: flex;
    column-gap: 1rem;
  }
`;

const Footer = styled.div`
  display: flex;
  padding: 1rem 3rem;
  justify-content: space-between;
  button {
    cursor: pointer;
    border-radius: 10px;
    border: none;
    padding: 1rem;
    box-sizing: border-box;
    :hover {
      opacity: 50%;
    }
  }
`;

export { Container, SettlementElementContainer, Header, Footer };