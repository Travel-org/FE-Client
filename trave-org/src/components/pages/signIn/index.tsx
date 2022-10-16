import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, ContentContainer, LoginForm, Wrapper } from "./styles";


import Button from "@atoms/button";
import KakaoBtn from "@atoms/button/kakao";
import SignInInput from "@organisms/loginInput";

import {
  SIGNIN_INPUT_DATA,
  ERROR_MESSAGE,
  KAKAO_AUTH_URL,
} from "@constants/index";
import { api } from "@src/app/api/api";
import { useEffect } from "react";

interface SignInFormInterface {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [tryLogin, { isLoading, isSuccess, error, data }] =
  api.useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInterface>({});

  const onSubmit = async (data: SignInFormInterface) => tryLogin(data);

  const inputProps = (type: "email" | "password") => {
    return {
      ...register(type, { required: ERROR_MESSAGE }),
      ...SIGNIN_INPUT_DATA[type],
      ...{ error: errors[type]?.message },
    };
  };

    useEffect(() => {
    if (!data) return;
    if (data.status === 400) alert(data.message);
    else navigate("/dashboard");
    }, [data]);

  return (
    <Container direction="row">
      <ContentContainer direction="column">
        <h1>로그인</h1>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <SignInInput {...inputProps("email")} />
          <SignInInput {...inputProps("password")} />
          <Wrapper direction="row" style={{ columnGap: "1rem" }}>
            <p onClick={() => navigate("/find")}>아이디/비밀번호 찾기</p>
            <p onClick={() => navigate("/signUp")}>회원가입</p>
          </Wrapper>
          <Wrapper direction="column" style={{ rowGap: "1rem" }}>
            <Button>버튼</Button>
            <KakaoBtn onClick={() => (window.location.href = KAKAO_AUTH_URL)} />
          </Wrapper>
        </LoginForm>
      </ContentContainer>
    </Container>
  );
};
export default SignIn;
