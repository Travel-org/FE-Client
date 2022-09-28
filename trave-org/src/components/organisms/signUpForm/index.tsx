import { useForm } from "react-hook-form";
import SignUpInput from "@organisms/loginInput";
import { FlexDiv } from "@src/styles";
import { Container, SignFormStyle, ErrorMessage } from "./styles";
import { SIGNUP_INPUT_DATA, CHECK_SIGNUP_DATA } from "@constants/index";
import Button from "@atoms/button";

interface SignUpFormInterface {
  name: string;
  nickName: string;
  phoneNumber: string;
  gender: string;
  tendency: string;
  year: string;
  month: string;
  day: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInterface>({});

  const inputProps = (type: keyof SignUpFormInterface) => {
    return {
      ...register(type, CHECK_SIGNUP_DATA[type]),
      ...SIGNUP_INPUT_DATA[type],
      ...{ error: errors[type]?.message },
    };
  };

  const onSubmit = (data: SignUpFormInterface) => {
    const { year, month, day, ...rest } = data;
    console.log({ birth: `${year}-${month}-${day}`, ...rest });
  };

  const BirthInputForm = () => {
    const yearError = errors.year?.message;
    const monthError = errors.month?.message;
    const dayError = errors.day?.message;

    const getCurrentYear = () => {
      const today = new Date();
      return today.getFullYear();
    };

    const getYearOptions = Array.from(
      { length: getCurrentYear() - 1900 },
      (_, i) => getCurrentYear() - i
    );
    const getMonthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
    const getDayOptions = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
      <Container direction="column">
        <p>생년월일</p>
        <FlexDiv direction="row">
          <select {...register("year", CHECK_SIGNUP_DATA.year)}>
            <option value="">년도</option>
            {getYearOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select {...register("month", CHECK_SIGNUP_DATA.month)}>
            <option value="">월</option>
            {getMonthOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select {...register("day", CHECK_SIGNUP_DATA.day)}>
            <option value="">일</option>
            {getDayOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </FlexDiv>
        <ErrorMessage>{yearError}</ErrorMessage>
        <ErrorMessage>{monthError}</ErrorMessage>
        <ErrorMessage>{dayError}</ErrorMessage>
      </Container>
    );
  };

  return (
    <SignFormStyle onSubmit={handleSubmit(onSubmit)}>
      <SignUpInput {...inputProps("name")} />
      <SignUpInput {...inputProps("nickName")} />
      <SignUpInput {...inputProps("phoneNumber")} />
      <SignUpInput {...inputProps("gender")} />
      <SignUpInput {...inputProps("tendency")} />
      <BirthInputForm />
      <SignUpInput {...inputProps("email")} />
      <SignUpInput {...inputProps("password")} />
      <Button>제출</Button>
    </SignFormStyle>
  );
};

export default SignUpForm;