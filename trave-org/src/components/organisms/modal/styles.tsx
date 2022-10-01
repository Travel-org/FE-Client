import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
`;

const Content = styled.div`
  margin-top: 70px;
  position: relative;
  overflow: scroll;
`;

export { Background, Content };