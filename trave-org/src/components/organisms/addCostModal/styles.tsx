import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";

const Container = styled(FlexDiv)`
  background: white;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
  border-radius: 10px;
  padding: 3rem;
  box-sizing: border-box;
  min-height: 50vh;
  box-sizing: border-box;
  justify-content: space-between;
  button {
    width: 20%;
  }
`;

const SubContainer = styled.div`
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
`;
const ChipWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FormWrapper = styled.div`
  min-height: 40vh;
  padding: 4vw;
  box-sizing: border-box;
`;

const Footer = styled(FlexDiv)`
  justify-content: center;
  column-gap: 2rem;
`;

export { Container, ChipWrapper, FormWrapper, SubContainer, Footer };