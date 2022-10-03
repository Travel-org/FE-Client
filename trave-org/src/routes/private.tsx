import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import isLogin from "@utils/isLogin";
import React from "react";

interface Props {
  children: ReactElement;
  user: boolean;
}

const PrivateRoute = ({ user, children: Component }: Props) => {
  return Component;
};
export default PrivateRoute;