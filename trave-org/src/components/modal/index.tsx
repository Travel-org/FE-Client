import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

interface IModalProp {
  children: ReactNode;
}

const Modal: React.FC<IModalProp> = ({ children }) => {
  const navigate = useNavigate();

  return createPortal(
    <div
      css={css`
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      `}
    >
      {children}
    </div>,
    document.getElementById("modal_root")!
  );
};

export default Modal;