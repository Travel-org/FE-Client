import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Container = styled.div`
  display: flex;
  position: relative;
`;

const Empty = styled.div`
  width: 20vw;
  background: white;
`;
const CancelBtn = styled.div<{ url: string }>`
  position: absolute;
  background: white;
  border-radius: 0px 4px 4px 0px;
  right: -1rem;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  outline-offset: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  cursor: pointer;
  :hover {
    opacity: 70%;
  }
  background-size: cover;
  background-position: center;
  background-image: ${({ url }) => `url(${url})`};
`;

export { Container, CancelBtn, Empty };