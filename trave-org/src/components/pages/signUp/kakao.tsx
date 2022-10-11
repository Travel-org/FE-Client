import SignUpForm from "@organisms/signUpForm/kakao";
import { useLocation } from "react-router-dom";
import { Container, ContentContainer } from "./styles";

const OauthSignUp = () => {
  const { kakaoId } = useLocation().state as any;
  return (
    <>
      <Container direction="row">
        <ContentContainer direction="column">
          <h1>회원가입</h1>
          <SignUpForm kakaoId={kakaoId} />
        </ContentContainer>
      </Container>
    </>
  );
};

export default OauthSignUp;