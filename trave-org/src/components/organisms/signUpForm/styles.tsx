import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";
import { FlexDiv } from "@styles/index";

const Container = styled(FlexDiv)`
  div {
    justify-content: space-between;
  }
  select {
    height: 2rem;
    min-width: 6rem;
  }
  p {
    font-size: 1rem;
    min-width: 4rem;
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.red[900]};
  min-width: 20vmin;
  margin: 0px;
  font-size: 1rem;
`;

const SignFormStyle = styled.form`
  align-items: center;
  width: 20rem;
  button {
    width: 20rem;
  }
`;

const Empty = styled.div`
  min-height: 2rem;
`;

export { Container, SignFormStyle, ErrorMessage, Empty };