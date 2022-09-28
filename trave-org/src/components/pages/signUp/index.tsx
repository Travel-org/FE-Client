import SignUpForm from "@organisms/signUpForm";
import styled from "@emotion/styled";
import { FlexDiv } from "@src/styles";

const Container = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;
const SignUp = () => {
  return (
    <Container direction="column">
      <h2>회원가입</h2>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;

//이름 닉네임 전화번호 성별 성향 mbti 생년월일 이메일 비밀번호