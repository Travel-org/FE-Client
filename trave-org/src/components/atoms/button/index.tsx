import { ReactNode } from "react";
import { ButtonStyle } from "./styles";

const Button = ({ children }: { children: ReactNode }) => {
  return <ButtonStyle>{children}</ButtonStyle>;
};

export default Button;