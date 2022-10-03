import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@src/app/hooks";
import { selectCurrentUser } from "@src/app/api";

interface Props {
  children: ReactElement;
  user: boolean;
}

function PrivateRoute({ user, children: Component }: Props) {
  const currentUser = useAppSelector(selectCurrentUser);
  return currentUser ? Component : <Navigate to="/signIn" />;
}
export default PrivateRoute;