import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div``;

const ElementWrapper = styled.div`
  height: 40vh;
  padding-bottom: 1rem;
  overflow: auto;
`;

const ModalContainer = styled.div`
  width: 50vw;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background: ${theme.colors.white};
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  @media (max-width: ${theme.breakpoints.md}) {
    width: 70vw;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 90vw;
  }
  button {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid black;
`;
export { Container, ElementWrapper, ModalContainer, Input };