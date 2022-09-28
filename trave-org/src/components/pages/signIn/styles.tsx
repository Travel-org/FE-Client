import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";

const Container = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled(FlexDiv)`
  column-gap: 1rem;
  p {
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;

export { Container, LoginForm, Wrapper };