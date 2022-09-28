import { forwardRef } from "react";
import { Container, ErrorMessage } from "./styles";

interface InputProps {
  content?: string;
  error: string | undefined;
  type: string;
  placeholder: string;
}
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ content, error, type, placeholder, ...rest }, ref) => {
    return (
      <>
        <Container direction="column">
          <p>{content}</p>
          <input
            className={error !== undefined ? "error" : ""}
            ref={ref}
            {...rest}
            type={type}
            placeholder={placeholder}
          />
          {<ErrorMessage>{error}</ErrorMessage>}
        </Container>
      </>
    );
  }
);
export default Input;