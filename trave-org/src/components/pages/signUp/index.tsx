import SignUpForm from "@organisms/signUpForm";
import { Container } from "./styles";

const SignUp = () => {
  return (
    <Container direction="column">
      <h2>회원가입</h2>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;