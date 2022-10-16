import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@src/app/hooks";
import { isLoginSelector } from "@src/app/api/api";

interface Props {
  children: ReactElement;
  user: boolean;
}

function PrivateRoute({ user, children: Component }: Props) {
  const currentUser = useAppSelector(isLoginSelector);
  return currentUser ? Component : <Navigate to="/signIn" />;
}
export default PrivateRoute;