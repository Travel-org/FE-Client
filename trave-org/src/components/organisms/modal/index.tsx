import { ReactNode } from "react";

import { Background, Content } from "./styles";

import Portal from "@src/portal";
const Modal = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Portal>
      <Content>{children}</Content>
      <Background onClick={onClick} />
    </Portal>
  );
};

export default Modal;