import { ReactNode } from "react";
import { ButtonStyle } from "./styles";

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: any;
}) => {
  return <ButtonStyle onClick={onClick}>{children}</ButtonStyle>;

export default Button;