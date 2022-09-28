import { useForm } from "react-hook-form";

import { Container, LoginForm } from "./styles";
import Input from "@organisms/loginInput";
import { INPUT_DATA } from "@constants/index";

interface SignInFormInterface {
  id: string;
  password: string;
}

const SignIn = () => {
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
      ...register(type, { required: type }),
      ...INPUT_DATA[type],
      ...{ error: errors[type]?.message },
    };
  };

  return (
    <Container direction="column">
      <h2>로그인</h2>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Input {...inputProps("id")} />
        <Input {...inputProps("password")} />
        <button>버튼</button>
      </LoginForm>
      <section>
        <div>소셜 로그인</div>
      </section>
    </Container>
  );
};
export default SignIn;