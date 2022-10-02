import Portal from "@src/portal";
import { ReactNode } from "react";
import { Background, Content } from "./styles";

const Modal = ({ children }: { children: ReactNode | boolean }) => {
  return (
    <Portal>
      <Background>{children}</Background>
    </Portal>
  );
};

export default Modal;