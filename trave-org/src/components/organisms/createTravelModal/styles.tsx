import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";
const Container = styled(FlexDiv)`
  width: 50vw;
  z-index: 999;
  background: white;
  padding: 3rem;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
  min-height: 60vh;
  box-sizing: border-box;
  justify-content: space-between;
  button {
    width: 20%;
  }
`;

const SubContainer = styled.div`
  border-radius: 5px;
  width: 100%;
  padding: 2rem;
  box-shadow: 0px 0px 3px ${theme.colors.shadow};
`;

const ChipWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
  justify-content: space-evenly;
`;

const FormWrapper = styled.div`
  min-height: 60vh;
  width: 100%;
  padding: 2vw;
  box-sizing: border-box;
`;

const Footer = styled(FlexDiv)`
  justify-content: center;
  column-gap: 2rem;
`;

export { Container, ChipWrapper, FormWrapper, SubContainer, Footer };