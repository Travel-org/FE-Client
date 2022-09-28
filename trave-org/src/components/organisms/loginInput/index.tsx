import { forwardRef } from "react";
import { FlexDiv } from "@styles/index";
import { ErrorMessage } from "./styles";

interface InputProps {
  content: string;
  error: string | undefined;
  type: string;
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ content, error, type, placeholder, ...rest }, ref) => {
    return (
      <>
        <FlexDiv direction="row">
          <p>{content}</p>
          <input ref={ref} {...rest} type={type} placeholder={placeholder} />
        </FlexDiv>
        {error !== undefined && <ErrorMessage>{error}</ErrorMessage>}
      </>
    );
  }
);

export default Input;