import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Box = styled.div<{ status: string }>`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-self: center;
  width: 2rem;
  height: 2rem;
  border: none;
  color: white;
  border-radius: 100vw;
  cursor: pointer;
  background: ${({ status }) =>
    status !== "none" ? theme.colors.blue[900] : theme.colors.blue[600]};
  p {
    margin: 0px;
  }
  :hover {
    opacity: 50%;
  }
`;

export { Box };