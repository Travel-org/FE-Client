import { ReactChildren, ReactChild } from "react";

import ReactDOM from "react-dom";

const Portal = ({
  children,
}: {
  children: ReactChild | boolean;
}) => {
  const element =
    typeof window !== "undefined" && document.getElementById("portal");
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;