import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";
import { theme } from "@src/styles/theme";

const Container = styled(FlexDiv)`
  justify-content: center;
`;

const ContentContainer = styled(FlexDiv)`
  position: absolute;
  margin: 2vw;
  padding: 4vw;
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
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

export { Container, ContentContainer, LoginForm, Wrapper };