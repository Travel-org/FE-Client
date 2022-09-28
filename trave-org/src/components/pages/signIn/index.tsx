import { useForm } from "react-hook-form";

import { Container, LoginForm, Wrapper } from "./styles";
import SignInInput from "@organisms/loginInput";
import { SIGNIN_INPUT_DATA, ERROR_MESSAGE } from "@constants/index";
import { useNavigate } from "react-router-dom";

interface SignInFormInterface {
  id: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInterface>({});

  const onSubmit = (dd: SignInFormInterface) => {
    console.log(dd);
  };

  const inputProps = (type: "id" | "password") => {
    return {
      ...register(type, { required: ERROR_MESSAGE }),
      ...SIGNIN_INPUT_DATA[type],
      ...{ error: errors[type]?.message },
    };
  };

  return (
    <Container direction="column">
      <h1>로그인</h1>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <SignInInput {...inputProps("id")} />
        <SignInInput {...inputProps("password")} />
        <Wrapper direction="row" style={{ columnGap: "1rem" }}>
          <p onClick={() => navigate("/find")}>아이디/비밀번호 찾기</p>
          <p onClick={() => navigate("/signUp")}>회원가입</p>
        </Wrapper>
        <button>버튼</button>
      </LoginForm>
    </Container>
  );
};
export default SignIn;