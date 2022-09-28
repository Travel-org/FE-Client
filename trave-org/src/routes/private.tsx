import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import isLogin from "@utils/isLogin";
import React from "react";

interface Props {
  children: ReactElement;
}

const PrivateRoute = ({ children: Component }: Props) => {
  return isLogin() ? Component : <Navigate to="/signIn" />;
};
export default PrivateRoute;