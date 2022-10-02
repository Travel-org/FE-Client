import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";

const Container = styled(FlexDiv)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 4vw;
  margin: 2vw;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    button {
      cursor: pointer;
      padding: 0.2rem 1rem;
      border: none;
      background: none;
      border-radius: 10px;
      box-shadow: 0px 0px 6px ${theme.colors.shadow};
      :hover {
        opacity: 50%;
      }
    }
  }
`;

export { Container };