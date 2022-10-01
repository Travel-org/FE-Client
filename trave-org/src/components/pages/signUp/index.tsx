import SignUpForm from "@organisms/signUpForm";
import { Container, ContentContainer } from "./styles";

const SignUp = () => {
  return (
    <>
      <Container direction="row">
        <ContentContainer direction="column">
          <h1>회원가입</h1>
          <SignUpForm />
        </ContentContainer>
      </Container>
    </>
  );
};

export default SignUp;