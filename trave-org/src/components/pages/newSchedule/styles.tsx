import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";
const Container = styled(FlexDiv)`
  background: white;
  min-height: 92vh;
  padding: 4vw;
  box-sizing: border-box;
  justify-content: space-between;
  button {
    width: 100%;
  }
`;
const ChipWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const FormWrapper = styled.div`
  min-height: 60vh;
  padding: 4vw;
  box-sizing: border-box;
`;

export { Container, ChipWrapper, FormWrapper };