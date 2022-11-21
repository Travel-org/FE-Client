import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

interface IModalProp {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Modal: React.FC<IModalProp> = ({ children, onClick }) => {
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
      onClick={onClick}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal_root")!
  );
};

export default Modal;