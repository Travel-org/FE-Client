import Portal from "@src/portal";
import { ReactChild, ReactChildren } from "react";
import { Background, Content } from "./styles";

const Modal = ({
  children,
}: {
  children: ReactChild |  boolean;
}) => {
  return (
    <Portal>
      <Background>{children}</Background>
    </Portal>
  );
};

export default Modal;